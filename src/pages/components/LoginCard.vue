<template>
  <div class="Login">
    <div>
      <span>账号:</span>
      <input type="text" />
    </div>
    <div>
      <span>密码:</span>
      <input type="text" />
    </div>
    <button @click="submit">登录</button>
  </div>
</template>

<script lang="ts" setup>
function submit() {}
</script>

<style lang="scss" scoped>
/** */
.Login {
  border-radius: 4px;
  z-index: 1;
  padding: 20px 40px;
  background-color: rgba(173, 215, 230, 0.8);
}
</style>
