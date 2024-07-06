<template>
  <el-scrollbar class="__menu">
    <el-menu @select="handleMenuChange">
      <MenuItem
        v-for="(menuInfo, index) in Global.menu.info.menus"
        :key="menuInfo.id"
        :menuInfo="menuInfo"
        :level="'' + index"
      ></MenuItem>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ElScrollbar, ElMenu } from 'element-plus';
import 'element-plus/es/components/scrollbar/style/index';
import 'element-plus/es/components/menu/style/index';
import Global from '@/Global';
import MenuItem from './MenuItem.vue';
import { MenuItemType } from '@/types/common';
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * 菜单切换
 * @param key 菜单唯一标识, 例如: 0-2-1
 */
function handleMenuChange(key: string) {
  let menuInfo: MenuItemType | undefined;
  key.split('-').forEach((index) => {
    if (menuInfo) {
      menuInfo = menuInfo.children?.[+index] || ({} as MenuItemType);
    } else {
      menuInfo = Global.menu.info.menus[+index];
    }
  });
  if (menuInfo?.path) {
    router.push(menuInfo.path);
  }
}
</script>

<style lang="scss" scoped>
.__menu {
  border-right: 1px solid rgb(240, 240, 240);
}
</style>
