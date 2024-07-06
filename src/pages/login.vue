<template>
  <div class="login">
    <KchLoginCardAsync
      class="login-card"
      @success="loginSuccess"
    ></KchLoginCardAsync>
    <div class="placehoder">
      <img
        class="image"
        src="@/assets/images/admin.png"
      />
      <span class="title">开箱即用的中后台管理系统</span>
      <span class="sub-title">集成微前端 / 低代码 等多种技术栈.</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routerTo } from '@/router';
import { useRouter } from 'vue-router';
import microApp from '@micro-zoe/micro-app';
import { defineAsyncComponent } from 'vue';

const KchLoginCardAsync = defineAsyncComponent(
  () => import('./components/LoginCard.vue')
);

const router = useRouter();

function loginSuccess() {
  microApp.unmountAllApps();
  /**
   * 路由跳转
   * 1. 原路由
   * 2. 默认路由（工作台） // TODO
   * 3. 第一个有效路由 // TODO
   */
  if (routerTo.path) {
    router.replace(routerTo);
  } else {
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -34%;
    background-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='6395'%20height='1079'%20viewBox='0%200%206395%201079'%3e%3cdefs%3e%3cclipPath%20id='clip-path'%3e%3crect%20width='6395'%20height='1079'%20transform='translate(-5391)'%20fill='%23fff'/%3e%3c/clipPath%3e%3clinearGradient%20id='linear-gradient'%20x1='0.747'%20y1='0.222'%20x2='0.973'%20y2='0.807'%20gradientUnits='objectBoundingBox'%3e%3cstop%20offset='0'%20stop-color='%232c41b4'/%3e%3cstop%20offset='1'%20stop-color='%231b4fab'/%3e%3c/linearGradient%3e%3c/defs%3e%3cg%20id='Mask_Group_1'%20data-name='Mask%20Group%201'%20transform='translate(5391)'%20clip-path='url(%23clip-path)'%3e%3cg%20id='Group_118'%20data-name='Group%20118'%20transform='translate(-419.333%20-1.126)'%3e%3cpath%20id='Path_142'%20data-name='Path%20142'%20d='M6271.734-6.176s-222.478,187.809-55.349,583.254c44.957,106.375,81.514,205.964,84.521,277,8.164,192.764-156.046,268.564-156.046,268.564l-653.53-26.8L5475.065-21.625Z'%20transform='translate(-4876.383%200)'%20fill='%23f1f5f8'/%3e%3cpath%20id='Union_6'%20data-name='Union%206'%20d='M-2631.1,1081.8v-1.6H-8230.9V.022H-2631.1V0H-1871.4s-187.845,197.448-91.626,488.844c49.167,148.9,96.309,256.289,104.683,362.118,7.979,100.852-57.98,201.711-168.644,254.286-65.858,31.29-144.552,42.382-223.028,42.383C-2441.2,1147.632-2631.1,1081.8-2631.1,1081.8Z'%20transform='translate(3259.524%200.803)'%20fill='url(%23linear-gradient)'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
  }
  .login-card {
    width: 400px;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.06),
      0 5px 12px 4px rgba(0, 0, 0, 0.04);
  }
  .placehoder {
    position: absolute;
    left: 8%;
    top: 20%;
    .image {
      height: 300px;
    }
    .title {
      margin-top: 30px;
      color: white;
      display: block;
      font-size: 40px;
    }
    .sub-title {
      margin-top: 10px;
      color: white;
      display: block;
      font-size: 24px;
    }
  }
}
</style>
