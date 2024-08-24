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
import { useRoute, useRouter } from 'vue-router';
import { getSubAppPrefixFromRouteUrl } from '@/router/helper';
import { MicroAppConfig } from 'micro-app-utils/data';
import { subAppPath } from '@/pages/SubMicroApp.vue';

const route = useRoute();
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
  if (!menuInfo?.path) return;

  /** 子应用前缀(目标) */
  const subAppPrefix_target = getSubAppPrefixFromRouteUrl(menuInfo.path);

  /** 子应用名称(目标) */
  const subAppName_target = MicroAppConfig.subAppSettingList.find(
    (item) => item.prefix === subAppPrefix_target
  )?.name;

  if (!subAppName_target) return console.error(`未配置${subAppPrefix_target}`);

  /** 子应用名称(当前) */
  const subAppName_current = getSubAppPrefixFromRouteUrl(`${route.path}/`);

  if (subAppName_target === subAppName_current) {
    /**
     * 当前子应用路由切换,只需要改subAppPath
     */
    subAppPath.value = menuInfo.path;
  } else {
    /**
     * 目标路由是其他子应用
     */
    router.push({
      path: `/${subAppName_target}`,
      query: {
        [subAppName_target]: menuInfo.path,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.__menu {
  border-right: 1px solid rgb(240, 240, 240);
}
</style>
