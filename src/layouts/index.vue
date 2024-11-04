<template>
  <div class="__layout h-full flex flex-col">
    <Head class="shrink-0"></Head>
    <div class="flex-1">
      <Menu
        class="w-180px h-[calc(100vh-50px)] float-left bg-white lt-md:(hidden)"
      ></Menu>
      <!-- 右边容器，包括面包屑 -->
      <div
        class="h-[calc(100vh-50px)] float-left flex flex-col w-[calc(100%-180px)] lt-md:(w-full)"
      >
        <RouteInfoBar
          class="shrink-0 h-6.25 bg-white font-size-3.75 c-gray flex items-center p-l-1.5"
        ></RouteInfoBar>
        <el-scrollbar
          class="flex-1 bg-#f5f5f5"
          ref="subAppScrollRef"
        >
          <div class="h-full p-2.5">
            <router-view></router-view>
          </div>
        </el-scrollbar>
        <div
          class="h-6 font-size-3 shrink-0 c-gray bg-white flex items-center justify-center"
        >
          <span class="-m-ellipsis">
            <span class="m-r-2.5">2024 © MicroAdmin By Lammu</span>
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
}
</style>
