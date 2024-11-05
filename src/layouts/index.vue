<template>
  <div class="__layout h-full flex flex-col">
    <Head class="shrink-0"></Head>
    <div class="flex-1 relative">
      <!-- 显示菜单按钮(移动端可见) -->
      <div
        class="hidden lt-md:(block flex) shadow-[0_1px_4px_rgb(169_169_169/50%)] z-2 absolute m-6 py-1 px-2 bg-#eee b-rd-6px cursor-pointer flex-col items-center"
        @click="isShowMenu = !isShowMenu"
      >
        <use-svg
          name="menu"
          size="30px"
        ></use-svg>
        <span class="font-size-2.6 m-t--1.6">展开菜单</span>
      </div>
      <!-- 侧边栏菜单 -->
      <div
        class="w-180px h-[calc(var(--screen-height)-50px)] float-left bg-white lt-md:(hidden w-full h-full fixed top-0 z-3 bg-#0009)"
        :style="`${isShowMenu ? 'display: block' : ''}`"
        @click="isShowMenu = !isShowMenu"
      >
        <Menu
          class="w-full h-full lt-md:(bg-white w-[calc(100%-70px)])"
          @click.stop
        ></Menu>
      </div>
      <!-- 右边容器，包括面包屑 -->
      <div
        class="h-[calc(var(--screen-height)-3.125rem)] float-left flex flex-col w-[calc(100%-180px)] lt-md:(w-full)"
      >
        <RouteInfoBar
          class="shrink-0 h-7 bg-white font-size-3.75 c-gray flex items-center p-l-1.5 b-b-#ededed b-b-1 b-b-solid"
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
          class="h-6 font-size-3 shrink-0 c-gray bg-white flex items-center justify-center b-t-#ededed b-t-1 b-t-solid"
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
/** 是否显示侧边菜单，移动端用 */
export const isShowMenu = ref(false);
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
