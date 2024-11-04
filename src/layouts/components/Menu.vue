<template>
  <div class="__menu b-r-#dcdfe6 b-r-1 b-r-solid">
    <div class="hidden lt-md:(block p-x-6 p-t-4 p-b-1)">
      <LinkCardList direction="row"></LinkCardList>
    </div>
    <div
      class="sticky top-0 bg-white p-y-1.5 p-x-2 z-1 shadow-[0_10px_20px_#9d9d9d1f] lt-md:(flex p-x-6 p-y-4)"
    >
      <el-input
        clearable
        v-model="menuKeyWord"
        placeholder="请输入菜单关键词"
        size="small"
      ></el-input>
      <el-button
        class="hidden lt-md:(flex m-l-2)"
        type="primary"
        size="small"
        @click=""
        >搜索</el-button
      >
    </div>
    <el-scrollbar>
      <el-menu
        :default-active="menuActiveIndex"
        :default-openeds="defaultOpenMenuList"
        @select="handleMenuChange"
      >
        <MenuItem
          v-for="(menuInfo, index) in menus.filter((menu) => !menu.hidden)"
          :key="menuInfo.id"
          :menuInfo="menuInfo"
          :level="'' + index"
          :ref="(ref: any) => tourStepsRefs[index + 1] = ref"
        ></MenuItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
/**
 * 当前激活的菜单下标, -分隔, 例：0-1-0
 * 设置这个值可以回显激活菜单(第一次加载页面回显激活菜单)
 */
export const menuActiveIndex = ref('');
</script>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { ElScrollbar, ElMenu, ElInput, ElMessage, ElButton } from 'element-plus';
import 'element-plus/es/components/scrollbar/style/index';
import 'element-plus/es/components/menu/style/index';
import 'element-plus/es/components/input/style/index';
import 'element-plus/es/components/loading/style/index';
import 'element-plus/es/components/button/style/index';
import MenuItem from './MenuItem.vue';
import { MenuItemType } from '@/types/common';
import { useRoute, useRouter } from 'vue-router';
import { getSubAppPrefixFromRouteUrl } from '@/router/helper';
import { MicroAppConfig } from 'micro-app-tools/data';
import { subAppPath } from '@/pages/SubMicroApp.vue';
import CONSTS from '@/utils/CONSTS';
import { currentRouteFullName } from './RouteInfoBar.vue';
import useGlobalStore from '@/store';
import { tourStepsRefs } from '@/layouts/hook';
import { ElLoading } from 'element-plus';
import { nextTick } from 'vue';
import LinkCardList from './LinkCardList.vue';

const globalStore = useGlobalStore();
const route = useRoute();
const router = useRouter();

/** 菜单关键词 */
const menuKeyWord = ref('');

/** 默认展开的父级菜单 */
const defaultOpenMenuList = ref(['0', '2']);

/** loading实例, v-loading没生效，不知道怎么手动注册 */
let loadingInstance: ReturnType<typeof ElLoading.service> | undefined;

watch(
  () => globalStore.menusLoading,
  () => {
    if (globalStore.menusLoading) {
      nextTick(() => {
        /** 不加nextTick对应的dom还没渲染 */
        loadingInstance = ElLoading.service({
          target: '.__menu',
        });
      });
    } else {
      loadingInstance?.close();
    }
  },
  { immediate: true }
);

watch(
  () => menuKeyWord.value,
  () => {
    // TODO菜单过滤
    console.log(menuKeyWord.value);
    if (menuKeyWord.value) {
      ElMessage({
        type: 'success',
        message: '菜单已过滤',
        grouping: true,
      });
    }
  }
);

/**
 * 菜单
 */
const menus = computed(() => {
  if (menuKeyWord.value) {
    return filterMenuByKeyWord(globalStore.menus);
  } else {
    return globalStore.menus;
  }
});

/**
 * 菜单切换，路由跳转
 * @param key 菜单唯一标识, 例如: 0-2-1
 */
function handleMenuChange(key: string) {
  menuActiveIndex.value = key;
  /**
   * 提取菜单信息
   */
  let menuInfo: MenuItemType | undefined;
  key.split('-').forEach((index) => {
    if (menuInfo) {
      menuInfo = menuInfo.children?.[+index];
    } else {
      menuInfo = globalStore.menus[+index];
    }
  });

  if (!menuInfo) return;

  if (menuInfo.targetType === 0) {
    router.push({
      path: menuInfo?.path,
    });
  } else if (menuInfo.targetType === 1) {
    /** 子应用前缀(目标) */
    const subAppPrefix_target = getSubAppPrefixFromRouteUrl(menuInfo.path);

    /** 子应用名称(目标) */
    const subAppName_target = MicroAppConfig.subAppSettingList.find(
      (item) => item.prefix === subAppPrefix_target
    )?.name;

    if (!subAppName_target) return console.error(`未配置${subAppPrefix_target}`);

    /** 子应用名称(当前), 从route.path取不准确(兜底路由情况)需要从route.name取 */
    const subAppName_current = route.name
      ?.toString()
      .startsWith(CONSTS.subAppRouteNamePrefix)
      ? route.name?.toString().replace(CONSTS.subAppRouteNamePrefix, '')
      : '';

    if (subAppName_target === subAppName_current) {
      /**
       * 当前子应用路由切换,只需要改subAppPath
       */
      subAppPath.value = menuInfo.path;
    } else {
      /**
       * 目标路由是其他子应用
       */
      router.push({
        path: `/${subAppName_target}`,
        query: {
          [subAppName_target]: menuInfo.path,
        },
      });
    }
  } else if (menuInfo.targetType === 2) {
    if (menuInfo.openMode == 0) {
      // 本窗口打开外链
    } else if (menuInfo.openMode == 1) {
      // 新窗口打开外链
    }
  }

  // TODO触发时机改为路由跳转后，兼容首次进入及代码跳转情况
  if ([0, 1].includes(menuInfo.targetType))
    currentRouteFullName.value = `${menuInfo.prefixName}/${menuInfo.name}`;
}

/**
 * 通过关键词过滤菜单
 */
function filterMenuByKeyWord(menuList: Array<MenuItemType>): Array<MenuItemType> {
  // 递归过滤菜单项，返回是否匹配
  function filterMenu(menuList: Array<MenuItemType>): Array<MenuItemType> {
    return menuList
      .map((menu) => {
        // 递归过滤子菜单
        const filteredChildren = menu.children ? filterMenu(menu.children) : [];

        // 如果当前菜单或其子菜单匹配，则返回当前菜单（包括其所有子菜单）
        if (menu.name.toLowerCase().includes(menuKeyWord.value)) {
          return menu;
        } else if (filteredChildren.length > 0) {
          return {
            ...menu,
            children: filteredChildren,
          };
        }
      })
      .filter(Boolean) as Array<MenuItemType>;
  }
  return filterMenu(menuList);
}
</script>

<style lang="scss" scoped>
.__menu {
  :deep(.main-el-menu) {
    border-right: none;
  }
}
</style>
