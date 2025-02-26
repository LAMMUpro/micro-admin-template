<template>
  <div
    :class="['action-list', props.direction, props.size, 'flex m-r-4']"
    :ref="(ref: any) => props.direction==='column' && (tourStepsRefs[0] = ref)"
  >
    <div
      class="action-item"
      v-show="isShowIntroduceLink"
      @click="toIntroducePage()"
    >
      <use-svg name="docs-question"></use-svg>
      <span>介绍页</span>
    </div>
    <div
      class="action-item"
      @click="openDocsLink()"
    >
      <use-svg name="docs-question"></use-svg>
      <span>项目文档</span>
    </div>
    <div
      class="action-item"
      @click="openGithubLink()"
    >
      <use-svg name="Github"></use-svg>
      <span>源码</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isPhone } from '@/hooks';
import { tourStepsRefs } from '@/layouts/hook';
import router from '@/router';
import { isShowMenu } from '../index.vue';
import { useRoute } from 'vue-router';
import { PropType, computed } from 'vue';

const props = defineProps({
  /** 每一项item的布局方式 */
  direction: {
    type: String as PropType<'column' | 'row'>,
    default: 'column',
  },
  /** 尺寸 */
  size: {
    type: String as PropType<'small' | 'large'>,
    default: 'small',
  },
});

/** 是否显示跳转介绍页链接 */
const isShowIntroduceLink = computed(() => {
  return useRoute()?.name !== 'introduce';
});

/** 跳到介绍页 */
function toIntroducePage() {
  if (isPhone) isShowMenu.value = false;
  router.push('/introduce');
}

/** 打开项目文档 */
function openDocsLink() {
  window.open('https://micro-admin-template.lammu.cn/docs/');
}

/** 打开项目源码 */
function openGithubLink() {
  window.open('https://github.com/LAMMUpro/micro-admin-template');
}
</script>

<style lang="scss" scoped>
.action-list {
  .action-item {
    --uno: p-t-1 font-size-2.5 m-x-1.5 cursor-pointer flex shrink-0 items-center c-gray lt-md:(font-size-4 m-x-2);
    &:hover {
      --uno: font-800 c-#2b87ff scale-112;
    }
    .use-svg {
      --uno: m-t-.5;
    }
  }
}

.action-list.column {
  .action-item {
    --uno: flex-col;
  }
}
.action-list.row {
  --uno: flex-wrap;
  .action-item {
    --uno: flex-row;
  }
}

.action-list.small {
  .action-item {
    .use-svg {
      --uno: w-4.5 h-4.5;
    }
    span {
      --uno: font-size-2.5;
    }
  }
}
.action-list.large {
  .action-item {
    .use-svg {
      --uno: w-6 h-6;
    }
    span {
      --uno: font-size-4.6;
    }
  }
}
</style>
