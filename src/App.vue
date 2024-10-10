<template>
  <el-config-provider namespace="main-el">
    <div class="__app">
      <router-view></router-view>

      <div
        v-if="isSubApp"
        @click="dataLoginDialog.open()"
      >
        测试打开弹窗
      </div>

      <!-- 登录弹窗, 只在菜单模式下使用 -->
      <template v-if="isSubApp">
        <UseSuspense v-model:visible="dataLoginDialog.show">
          <LoginDialog v-model:show="dataLoginDialog.show"></LoginDialog>
        </UseSuspense>
      </template>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import UseSuspense from '@/components/use-suspense/index.vue';
import LoginDialog from '@/pages/components/LoginDialog.vue';
import { ref, shallowReactive } from 'vue';
import { isSubApp } from 'micro-app-utils';
import { ElConfigProvider, ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import CONSTS from './utils/CONSTS';
import Config from './utils/Config';

const dataLoginDialog = shallowReactive({
  show: false,
  open() {
    this.show = true;
  },
});

/** 应用入口html */
const indexHtml = ref('');

/**
 * 获取应用入口html
 */
async function getIndexHtml() {
  const res = await fetch(
    `https://micro-admin-template.lammu.cn/${CONSTS.PREFIX_URL}/index.html`
  );
  return await res.text();
}

/**
 * 版本更新检测
 */
async function versionUpdateCheck() {
  indexHtml.value = await getIndexHtml();
  // TODO 改为worker, 多标签页只打开一个worker
  setInterval(async () => {
    if ((await getIndexHtml()) !== indexHtml.value) {
      // ElMessage.warning('版本变更了');
      // TODO 用户确认弹窗
      location.reload();
    } else {
      console.log('版本没有发生变化');
    }
  }, 2000);
}

onMounted(() => {
  if (!Config.isLocalhost) {
    versionUpdateCheck();
  }
});
</script>

<style lang="scss" scoped>
.__app {
  width: 100vw;
  height: 100vh;
}
</style>
