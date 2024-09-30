<template>
  <div class="__head">
    <div class="__logo-div">
      <img
        class="__logo"
        src="https://pro.spicyboy.cn/assets/svg/logo-CqE24J1b.svg"
        alt="logo"
      />
      <span class="__name">MicroAdmin</span>
    </div>
    <div class="__right">
      <div class="action-list">
        <div
          class="action-item"
          @click="openDocsLink()"
        >
          <use-svg
            name="docs-question"
            size="24px"
          ></use-svg>
          <span>项目文档</span>
        </div>
        <div
          class="action-item"
          @click="openGithubLink()"
        >
          <use-svg
            name="Github"
            size="24px"
          ></use-svg>
          <span>源码</span>
        </div>
      </div>
      <img
        class="__avatar"
        :src="globalStore.userInfo.avatar"
        alt="avatar"
      />
      <el-dropdown>
        <div class="__nickname">
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

const globalStore = useGlobalStore();

/** //TODO: 退出登录 */
function onLogout() {}

/** //TODO: 清除缓存 用户信息/菜单 */
function clearCache() {
  localStorage.clear();
}

/** //TODO: 跳转用户中心页面 */
function toUserCenterPage() {}

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
  height: 50px;
  background-color: white;
  width: 100%;
  box-shadow: 0 1px 4px rgb(169 169 169 / 50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  .__logo-div {
    width: 180px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .__logo {
      width: 40px;
      height: 40px;
    }
    .__name {
      margin-left: 6px;
      font-size: 19px;
      font-weight: 600;
    }
  }
  .__right {
    display: flex;
    align-items: center;
    .action-list {
      display: flex;
      margin-right: 30px;
      .action-item {
        font-size: 10px;
        margin-left: 12px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: gray;

        &:hover {
          transform: scale(1.12);
          font-weight: bold;
          color: #2b87ff;
        }
      }
    }
    .__avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .__nickname {
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      .use-svg {
        margin-top: 2px;
      }
      &:hover .use-svg {
        transition: all 0.2s;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
