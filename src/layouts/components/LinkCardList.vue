<template>
  <div
    class="action-list flex m-r-7.5"
    :ref="(ref: any) => tourStepsRefs[0] = ref"
  >
    <div
      class="action-item"
      v-show="isShowIntroduceLink"
      @click="toIntroducePage()"
    >
      <use-svg
        class="m-t-.5"
        name="docs-question"
        size="18px"
      ></use-svg>
      <span>介绍页</span>
    </div>
    <div
      class="action-item"
      @click="openDocsLink()"
    >
      <use-svg
        class="m-t-.5"
        name="docs-question"
        size="18px"
      ></use-svg>
      <span>项目文档</span>
    </div>
    <div
      class="action-item"
      @click="openGithubLink()"
    >
      <use-svg
        class="m-t-.5"
        name="Github"
        size="18px"
      ></use-svg>
      <span>源码</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isPhone } from '@/hook';
import { tourStepsRefs } from '@/layouts/hook';
import router from '@/router';
import { isShowMenu } from '../index.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

/** 是否显示跳转介绍页链接 */
const isShowIntroduceLink = computed(() => {
  return useRoute().name !== 'introduce';
});

/** 跳到介绍页 */
function toIntroducePage() {
  if (isPhone) isShowMenu.value = false;
  router.push('/introduce');
}

/** 打开项目文档 */
function openDocsLink() {
  window.open('https://micro-admin-docs.lammu.cn/');
}

/** 打开项目源码 */
function openGithubLink() {
  window.open('https://github.com/LAMMUpro/micro-admin-template');
}
</script>

<style lang="scss" scoped>
.action-list {
  .action-item {
    --uno: p-t-1 font-size-2.5 m-x-1.5 cursor-pointer flex flex-col items-center c-gray lt-md:(flex-row font-size-4 m-x-2);
    &:hover {
      --uno: font-800 c-#2b87ff scale-112;
    }
  }
}
</style>
