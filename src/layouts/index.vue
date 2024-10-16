<template>
  <div class="__layout">
    <Head class="__head"></Head>
    <div class="menu-content">
      <Menu class="__menu"></Menu>
      <!-- 右边容器，包括面包屑 -->
      <div class="__right-container">
        <RouteInfoBar class="__route-info-bar"></RouteInfoBar>
        <el-scrollbar
          class="__sub-app-container"
          ref="subAppScrollRef"
        >
          <div class="__inner-container">
            <router-view></router-view>
          </div>
        </el-scrollbar>
        <div class="__footer">
          <span>
            <span class="__copyright">2024 © MicroAdmin By Lammu</span>
            <a
              href="https://beian.miit.gov.cn"
              target="_blank"
              >桂ICP备2022010908号-1</a
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/** 子应用滚动容器ref */
export const subAppScrollRef = ref<InstanceType<typeof ElScrollbar>>();
</script>

<script lang="ts" setup>
import Menu from './components/Menu.vue';
import Head from './components/Head.vue';
import RouteInfoBar from './components/RouteInfoBar.vue';
import { ElScrollbar } from 'element-plus';
import 'element-plus/es/components/scrollbar/style/index';
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
.__layout {
  --sub-app-container-height: calc(100vh - 20px - 24px - 25px - 50px);
  height: 100%;
  display: flex;
  flex-direction: column;
  .__head {
    flex-shrink: 0;
  }

  .menu-content {
    flex: 1;
    .__menu {
      height: calc(100vh - 50px);
      float: left;
      width: 180px;
      background-color: white;
    }
    .__right-container {
      height: calc(100vh - 50px);
      float: left;
      width: calc(100% - 180px);
      display: flex;
      flex-direction: column;
      .__route-info-bar {
        flex-shrink: 0;
        height: 25px;
        background-color: white;
        font-size: 15px;
        color: gray;
        display: flex;
        align-items: center;
        padding-left: 6px;
      }

      .__sub-app-container {
        flex: 1;
        background-color: #f5f5f5;
        .__inner-container {
          padding: 10px;
        }
      }
      .__footer {
        flex-shrink: 0;
        height: 24px;
        font-size: 12px;
        color: gray;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        .__copyright {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
