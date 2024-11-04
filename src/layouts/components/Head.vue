<template>
  <div
    class="__head h-12.5 bg-white w-full z-2 flex items-center justify-between p-r-5 shadow-[0_1px_4px_rgb(169_169_169/50%)]"
  >
    <div class="m-l-2 flex justify-center items-center">
      <img
        class="w-10 h-10"
        src="/favicon.ico"
        alt="logo"
      />
      <span class="m-l-1.5 font-size-4.75 font-600">MicroAdmin</span>
    </div>
    <div class="__right flex items-center">
      <div
        class="action-list flex m-r-7.5 lt-md:(hidden)"
        :ref="(ref: any) => tourStepsRefs[0] = ref"
      >
        <div
          class="action-item"
          @click="toIntroducePage()"
        >
          <use-svg
            class="m-t-.5"
            name="docs-question"
            size="18px"
          ></use-svg>
          <span>介绍页</span>
        </div>
        <div
          class="action-item"
          @click="openDocsLink()"
        >
          <use-svg
            class="m-t-.5"
            name="docs-question"
            size="18px"
          ></use-svg>
          <span>项目文档</span>
        </div>
        <div
          class="action-item"
          @click="openGithubLink()"
        >
          <use-svg
            class="m-t-.5"
            name="Github"
            size="18px"
          ></use-svg>
          <span>源码</span>
        </div>
      </div>
      <img
        class="w-7.5 h-7.5 m-r-2.5 b-rd-1/2"
        :src="globalStore.userInfo.avatar"
        alt="avatar"
      />
      <el-dropdown>
        <div class="__nickname cursor-pointer flex items-center font-size-3.5">
          <span>{{ globalStore.userInfo.name }}</span>
          <use-svg name="arrow-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="clearCache()">清除缓存</el-dropdown-item>
            <el-dropdown-item @click.native="toUserCenterPage()"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item @click.native="onLogout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import 'element-plus/es/components/dropdown/style/index';
import 'element-plus/es/components/dropdown-menu/style/index';
import 'element-plus/es/components/dropdown-item/style/index';
import useGlobalStore from '@/store';
import { tourStepsRefs } from '@/layouts/hook';
import router from '@/router';

const globalStore = useGlobalStore();

/** //TODO: 退出登录 */
function onLogout() {}

/** //TODO: 清除缓存 用户信息/菜单 */
function clearCache() {
  localStorage.clear();
}

/** //TODO: 跳转用户中心页面 */
function toUserCenterPage() {}

/** 跳到介绍页 */
function toIntroducePage() {
  router.push('/introduce');
}

/** 打开项目文档 */
function openDocsLink() {
  window.open('https://micro-admin-docs.lammu.cn/');
}

/** 打开项目源码 */
function openGithubLink() {
  window.open('https://github.com/LAMMUpro/micro-admin-template');
}
</script>

<style lang="scss" scoped>
.__head {
  .__right {
    .action-list {
      .action-item {
        --uno: p-t-1 font-size-2.5 m-x-1.5 cursor-pointer flex flex-col items-center
          c-gray;

        &:hover {
          --uno: font-800 c-#2b87ff scale-112;
        }
      }
    }
    .__nickname {
      &:hover .use-svg {
        transition: all 0.2s;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
