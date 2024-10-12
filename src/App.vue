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
import { shallowReactive } from 'vue';
import { isSubApp } from 'micro-app-utils';
import { ElConfigProvider } from 'element-plus';

const dataLoginDialog = shallowReactive({
  show: false,
  open() {
    this.show = true;
  },
});
</script>

<style lang="scss" scoped>
.__app {
  width: 100vw;
  height: 100vh;
}
</style>
