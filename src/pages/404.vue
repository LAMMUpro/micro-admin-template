<template>
  <div class="page-404">
    <div class="center-box">
      <span class="font-404">404</span>
      <p class="tip">
        当前访问的页面不存在！请检查访问的链接是否正确，如有疑问，请<b class="underline"
          >联系管理员</b
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.page-404 {
  height: var(--sub-app-container-height);
  display: flex;
  justify-content: center;
  align-items: center;
  .center-box {
    text-align: center;
    .font-404 {
      font-size: 250px;
      font-style: oblique;
      font-weight: bold;
      color: #ffcc99;
      text-align: center;
      text-shadow: 0 0 10px #ffcc99, 0 0 20px #ffcc99, 0 0 30px #f7a833, 0 0 40px #f7a833;
    }
    .tip {
      font-size: 16px;
      color: #555555;
      .underline {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
