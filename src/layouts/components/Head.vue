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
          @click=""
        >
          <svg-icon
            name="arrow-bottom"
            size="24px"
          ></svg-icon>
          <span>回官网</span>
        </div>
      </div>

      <img
        class="__avatar"
        :src="Global.user.info.avatar"
        alt="avatar"
      />
      <el-dropdown>
        <div class="__nickname">
          <span>{{ Global.user.info.name }}</span>
          <svg-icon name="arrow-bottom" />
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
import Global from '@/Global';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import 'element-plus/es/components/dropdown/style/index';
import 'element-plus/es/components/dropdown-menu/style/index';
import 'element-plus/es/components/dropdown-item/style/index';

/** //TODO: 退出登录 */
function onLogout() {}

/** //TODO: 清除缓存 用户信息/菜单 */
function clearCache() {}

/** //TODO: 跳转用户中心页面 */
function toUserCenterPage() {}
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
      .svg-icon {
        margin-top: 2px;
      }
      &:hover .svg-icon {
        transition: all 0.2s;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
