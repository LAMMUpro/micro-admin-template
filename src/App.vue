<template>
  <el-config-provider
    namespace="main-el"
    :locale="zhCn"
  >
    <div class="w-100vw h-[var(--screen-height)]">
      <router-view></router-view>

      <!-- 登录弹窗, 只在菜单模式下使用 -->
      <template v-if="isSubApp">
        <div @click="dataLoginDialog.open()">测试打开弹窗</div>
        <UseSuspense v-model:visible="dataLoginDialog.show">
          <LoginDialog v-model:show="dataLoginDialog.show"></LoginDialog>
        </UseSuspense>
      </template>
    </div>

    <!-- 引导页 -->
    <template v-if="!isMobile()">
      <el-tour
        v-model="dataTour.show"
        @finish="dataTour.finish()"
        @close="dataTour.close()"
      >
        <el-tour-step
          :target="tourStepsRefs[0]?.$el || tourStepsRefs[0]"
          title="引导页1/4"
        >
          <div style="font-size: 18px">点击可以查看<b>说明文档</b>及<b>仓库源码</b>.</div>
        </el-tour-step>
        <el-tour-step
          :target="tourStepsRefs[1]?.$el || tourStepsRefs[1]"
          title="引导页2/4"
        >
          <div style="font-size: 18px"><b>主应用</b>相关页面.</div>
        </el-tour-step>
        <el-tour-step
          :target="tourStepsRefs[2]?.$el || tourStepsRefs[2]"
          title="引导页3/4"
          description="react子应用页面"
        >
          <div style="font-size: 18px"><b>react子应用</b>相关页面.</div>
        </el-tour-step>
        <el-tour-step
          :target="tourStepsRefs[3]?.$el || tourStepsRefs[3]"
          title="引导页4/4"
          description="vue3子应用页面"
        >
          <div style="font-size: 18px"><b>vue3子应用</b>页面.</div>
        </el-tour-step>
      </el-tour>
    </template>
  </el-config-provider>
</template>

<script lang="ts" setup>
import UseSuspense from '@/components/use-suspense/index.vue';
import LoginDialog from '@/pages/components/LoginDialog.vue';
import { shallowReactive, onMounted } from 'vue';
import { isSubApp } from 'micro-app-tools';
import { ElConfigProvider, ElTour, ElTourStep } from 'element-plus';
import 'element-plus/es/components/tour/style/index';
import 'element-plus/es/components/tour-step/style/index';
import { isMobile } from '@/utils';
import { tourStepsRefs } from '@/layouts/hook';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

/////////////////////// 登录弹窗 ///////////////////////
const dataLoginDialog = shallowReactive({
  show: false,
  open() {
    this.show = true;
  },
});

/////////////////////// 新用户引导页 ///////////////////////
const dataTour = shallowReactive({
  show: false,
  finish() {
    this.setTourFinishTag('finish');
  },
  close() {
    this.setTourFinishTag('close');
  },
  setTourFinishTag(str: string = 'finish') {
    localStorage.setItem('TourFinish', str);
  },
  getTourFinishTag() {
    return localStorage.getItem('TourFinish');
  },
});

onMounted(() => {
  /** 延时防止窗口抖动 */
  setTimeout(() => {
    /** 如果关闭过或完成过引导则不在显示 */
    dataTour.show = !dataTour.getTourFinishTag();
  }, 400);
});
</script>
