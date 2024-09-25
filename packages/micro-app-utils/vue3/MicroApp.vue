<template>
  <div class="__micro-app-container __content">
    <!-- micro-app子应用 -->
    <component
      class="__micro-app"
      :is="MicroAppConfig.tagName"
      v-if="subAppSettting"
      :default-page="defaultPage"
      :keep-alive="props._keepAlive"
      :name="nameWithPrefix"
      :iframe="subAppSettting?.iframe"
      :url="subAppSettting?.urlMap[props._env || MicroAppConfig.env]"
      :inline="MicroAppConfig.env === 'localhost'"
      :destroy="props._destroy"
      :clearData="props._clearData"
      :router-mode="props._routerMode || isSubApp ? 'pure' : 'search'"
      :disable-scopecss="props._disableScopecss"
      @mounted="microAppMounted"
      @unmount="microAppUnmount"
      @error="microAppError"
    ></component>
    <!-- 子应用环境下使用才显示状态，顶层应用有额外的状态UI -->
    <template v-if="isSubApp">
      <!-- 应用未配置样式 -->
      <div
        v-if="!subAppSettting"
        class="__content"
      >
        <slot name="config"></slot>
        <div
          v-if="!slots.config"
          class="__tip-msg __config"
        >
          未配置模块
        </div>
      </div>
      <!-- 加载失败样式 -->
      <div
        class="__content"
        v-else-if="subAppStatus === 'error'"
      >
        <slot name="error"></slot>
        <div
          v-if="!slots.error"
          class="__tip-msg __error"
        >
          模块加载失败
        </div>
      </div>
      <!-- 加载中样式 -->
      <div
        class="__content"
        v-else-if="subAppStatus === 'loading'"
      >
        <slot name="loading"></slot>
        <div
          v-if="!slots.loading"
          class="__tip-msg __loading"
        >
          模块加载中...
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import microApp from '@micro-zoe/micro-app';
import { PropType, onBeforeUnmount, ref, useSlots } from 'vue';
import { watch } from 'vue';
import { computed, useAttrs } from 'vue';
import { getSubAppPrefixFromRouteUrl, isSubApp, sendDataDown } from '../index';
import { MicroAppConfig, dataListener } from '../data';

/**
 * micro-app对应的属性
 * 推导属性不用传：url, inline
 */
const props = defineProps({
  /** 指定应用环境 */
  _env: {
    type: String,
    default: '',
  },
  /** 子应用名称前缀, name不能重复，所以需要加前缀，可根据根据业务名称区分 */
  _prefix: {
    type: String,
    default: '',
  },
  /** 子应用名称 */
  _name: {
    type: String,
    required: true,
  },
  /**
   * 要跳转的路径, 一般不要带查询参数
   * @example /#/ExportComponent/contract/ContractDetailByUUID
   */
  _path: {
    type: String,
    required: true,
  },
  /** 默认路由，一般用`前缀/#/empty`做中转路由（hash模式），对应子应用需要添加这个路由 */
  _defaultPage: {
    type: String,
    default: '',
  },
  /** 是否keep-alive，需要对应子应用也开启keep-alive，一般不用 */
  _keepAlive: {
    type: Boolean,
    default: false,
  },
  /** 卸载时是否强制删除缓存资源 */
  _destroy: {
    type: Boolean,
    default: false,
  },
  /** 卸载时清空数据通讯中的缓存数据, 默认false */
  _clearData: {
    type: Boolean,
    default: false,
  },
  /** 虚拟路由系统分为四种模式search、native、native-scope、pure (顶级应用默认search，子应用默认pure) */
  _routerMode: {
    type: String as PropType<'search' | 'native' | 'native-scope' | 'pure'>,
    default: '',
  },
  /** 是否关闭样式隔离，在某些极端情况下会使用，例如子应用独立运行时，主应用跨应用渲染需要关闭样式隔离确保样式导入生效 */
  _disableScopecss: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: '_mounted'): void;
  (e: '_unmount'): void;
}>();

/** 剩余参数当做传给组件的props */
const otherProps = useAttrs();

/** 插槽列表，可以自定义加载中(loading)样式 / 失败(error)样式 / 无配置(config)样式 */
const slots = useSlots();

/** 子应用真实name（连前缀） */
const nameWithPrefix = computed(() => {
  return props._prefix + props._name;
});

/** 子应用真实name（旧的），用于判断当前跳转是否跨子应用跳转 */
const nameWithPrefix_old = ref('');

/** 定时器 */
let timer: NodeJS.Timeout;

/** 记录应用开始加载时间点 */
let appStartTimeStamp = Date.now();

/** 子应用配置 */
const subAppSettting = computed(() => {
  return MicroAppConfig.subAppSettingList.find((item) => item.name === props._name);
});

/** 默认页面（中转页） */
const defaultPage = computed(
  () =>
    props._defaultPage ||
    (subAppSettting.value?.prefix
      ? `/${subAppSettting.value?.prefix}/#/empty`
      : '/#/empty')
);

/** 实际的path */
const activePath = ref(defaultPage.value);

/**
 * 子应用状态
 */
const subAppStatus = ref<'unMounted' | 'loading' | 'mounted' | 'error'>(
  props._name ? 'loading' : 'unMounted'
);

/**
 * 子应用渲染完成钩子（需要延迟执行！）
 * 1. 更新渲染完成标识
 * 2. 跳到目标页
 * 3. 抛出事件
 * ps: 如果是非pure模式，会导致子应用的url发生改变，会导致路由重新跳转(例如应用未加载前路由还没加载，应用加载完成前动态路由加载了，search模式会自动刷新页面，但pure模式不会，所以要以兼容pure模式为准：跳转到不存在页面先暂存，动态添加路由后跳转到暂存页面)
 */
function microAppMounted() {
  if (dataListener) microApp.addDataListener(nameWithPrefix.value, dataListener);
  timer = setTimeout(() => {
    const subAppName = `${props._prefix}${props._name}`;
    /** 确保子应用真的渲染成功了 */
    if (microApp.getAllApps().includes(subAppName)) {
      const durationMS = Date.now() - appStartTimeStamp;
      function callback() {
        subAppStatus.value = 'mounted';
        /** 这里需要手动跳转一次，watch时的跳转可能不会生效，因为应用还没挂载完成 */
        toSubAppPathSafe();
        emit('_mounted');
      }
      if (durationMS < 300) {
        setTimeout(() => callback(), 300 - durationMS);
      } else {
        callback();
      }
    } else {
      subAppStatus.value = 'error';
    }
  }, 4);
}

/**
 * 子应用卸载钩子
 * 1. 更新渲染完成标识
 * 2. 清空数据
 */
function microAppUnmount() {
  if (dataListener) microApp.removeDataListener(nameWithPrefix.value, dataListener);
  microApp.clearDataListener(nameWithPrefix.value);
  subAppStatus.value = props._name ? 'loading' : 'unMounted';
  appStartTimeStamp = Date.now();
  /** 需要子应用每次window.mount的时候重建router 或 window.unmount的时候重定向路由至默认路由 */
  activePath.value = defaultPage.value;
  microApp.clearData(nameWithPrefix.value);
  emit('_unmount');
}

/**
 * 子应用渲染报错
 */
function microAppError() {
  subAppStatus.value = 'error';
}

/**
 * 子应用name / prefix / path / 剩余参数发生变化，重新跳转页面
 */
watch(
  [() => props._path, () => nameWithPrefix.value, () => JSON.stringify(otherProps)],
  (_, oldValueList) => {
    nameWithPrefix_old.value = oldValueList[1] || '';
    /**
     * 当主应用子应用切换时，路由结束后(即nameWithPrefix.value变化了)子应用的卸载钩子还没有执行，此时subAppStatus状态还没有得到更新，所以需要setTimeout一下
     */
    setTimeout(() => {
      if (subAppSettting.value && props._path && subAppStatus.value === 'mounted') {
        toSubAppPathSafe();
      }
    });
  },
  { immediate: true }
);

/**
 * 跳转到目标页面
 * 会处理是否在目标页的情况
 */
function toSubAppPathSafe() {
  /**
   * _name为空时不允许跳转
   * 前缀不匹配时时不允许跳转
   */
  if (
    !props._name ||
    subAppSettting.value?.prefix !== getSubAppPrefixFromRouteUrl(props._path)
  )
    return;
  if (activePath.value === defaultPage.value) {
    /** 如果当前是中转路由，直接替换 */
    timer = setTimeout(() => {
      toSubAppPath({ mode: 'replace' });
    }, 4);
  } else if (activePath.value !== props._path) {
    /** 如果当前其它路由，直接跳转，如果是同一应用页面跳转用push，如果是跨应用跳转，用replace */
    timer = setTimeout(() => {
      toSubAppPath({
        mode: nameWithPrefix_old.value === nameWithPrefix.value ? 'push' : 'replace',
      });
    }, 4);
  } else {
    /**
     * 目标路径和当前路径一致，先跳中转再跳目标
     * 可能的场景：子应用嵌套，路径不变，参数变化
     */
    timer = setTimeout(() => {
      toDefaultPage();
      toSubAppPath({ mode: 'replace' });
    }, 4);
  }
}

/**
 * 跳转到目标页，该方法不会校验是否在当前页
 * 1. 清除传递的参数
 * 2. 传递组件参数
 * 3. 控制子应用路由跳转
 */
function toSubAppPath(options: { mode: 'replace' | 'push' }) {
  const { mode } = {
    ...options,
  };

  microApp.router[mode]({
    name: nameWithPrefix.value,
    /**
     * 不要对props._path进行处理（比如添加参数），原样跳转就行
     * ps：props._path有可能是编码 或 半编码的，解析很可能报错
     */
    path: props._path,
  });

  sendDataDown(nameWithPrefix.value, {
    eventType: 'component',
    props: otherProps,
    subAppPath: props._path,
  });

  activePath.value = props._path;
}

/** 跳到默认页面 */
function toDefaultPage() {
  microApp.router.push({
    name: nameWithPrefix.value,
    path: defaultPage.value,
  });
  activePath.value = defaultPage.value;
}

onBeforeUnmount(() => {
  /** 不清除，会导致子应用重新挂载时监听到2次数值变化 */
  microApp.clearData(nameWithPrefix.value);
  clearTimeout(timer);
});
</script>

<style lang="scss">
// 样式写在全局文件@/style/index.scss
</style>
