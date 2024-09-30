<template>
  <div class="noMenu">
    <div class="svg-container">
      <img
        class="use-svg"
        src="@/assets/noRoleMenu.svg"
      />
    </div>
    <p class="tip">该账号没有配置角色或菜单，<strong>请联系管理员</strong></p>
    <button
      class="btn link"
      @click="handleNavigate2PC"
    >
      点击立即返回官网
    </button>
  </div>
</template>

<script lang="ts" setup>
import { handleNavigate2PC } from '@/router/helper';
import { ElMessage } from 'element-plus';
import { onMounted, onUnmounted } from 'vue';

let timer: NodeJS.Timeout;

onMounted(() => {
  ElMessage.warning({
    message: '该账号没有配置菜单，请联系管理员添加角色，5s后将自动跳转到首页',
    duration: 5000,
  });
  timer = setTimeout(() => {
    // handleNavigate2PC();
  }, 5000);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.noMenu {
  height: var(--sub-app-container-height);
  display: flex;
  flex-direction: column;
  padding: 180px 0;
  .svg-container {
    flex: 1;
    text-align: center;
    .use-svg {
      width: auto;
      height: 100%;
    }
  }
  .tip {
    font-size: 18px;
    text-align: center;
    margin-bottom: 30px;
    color: #6f6f6f;
  }
  .btn {
    margin-bottom: 50px;
    font-size: 15px;
    &.link {
      color: #358cff;
    }
  }
}
</style>
