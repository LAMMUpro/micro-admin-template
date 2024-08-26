<template>
  <el-scrollbar class="__menu">
    <el-menu
      :default-active="menuActiveIndex"
      @select="handleMenuChange"
    >
      <MenuItem
        v-for="(menuInfo, index) in Global.menu.info.menus"
        :key="menuInfo.id"
        :menuInfo="menuInfo"
        :level="'' + index"
      ></MenuItem>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
/**
 * 当前激活的菜单下标, -分隔, 例：0-1-0
 * 设置这个值可以回显激活菜单(第一次加载页面回显激活菜单)
 */
export const menuActiveIndex = ref('');
</script>

<script lang="ts" setup>
import { ref } from 'vue';
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
import CONSTS from '@/utils/CONSTS';

const route = useRoute();
const router = useRouter();

/**
 * 菜单切换，路由跳转
 * @param key 菜单唯一标识, 例如: 0-2-1
 */
function handleMenuChange(key: string) {
  menuActiveIndex.value = key;
  /**
   * 提取菜单信息
   */
  let menuInfo: MenuItemType | undefined;
  key.split('-').forEach((index) => {
    if (menuInfo) {
      menuInfo = menuInfo.children?.[+index];
    } else {
      menuInfo = Global.menu.info.menus[+index];
    }
  });

  if (!menuInfo) return;

  if (menuInfo.targetType === 0) {
    router.push({
      path: menuInfo?.path,
    });
  } else if (menuInfo.targetType === 1) {
    /** 子应用前缀(目标) */
    const subAppPrefix_target = getSubAppPrefixFromRouteUrl(menuInfo.path);

    /** 子应用名称(目标) */
    const subAppName_target = MicroAppConfig.subAppSettingList.find(
      (item) => item.prefix === subAppPrefix_target
    )?.name;

    if (!subAppName_target) return console.error(`未配置${subAppPrefix_target}`);

    /** 子应用名称(当前), 从route.path取不准确(兜底路由情况)需要从route.name取 */
    const subAppName_current = route.name
      ?.toString()
      .startsWith(CONSTS.subAppRouteNamePrefix)
      ? route.name?.toString().replace(CONSTS.subAppRouteNamePrefix, '')
      : '';

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
  } else if (menuInfo.targetType === 2) {
    if (menuInfo.openMode == 0) {
      // 本窗口打开外链
    } else if (menuInfo.openMode == 1) {
      // 新窗口打开外链
    }
  }
}
</script>

<style lang="scss" scoped>
.__menu {
  border-right: 1px solid rgb(240, 240, 240);
}
</style>
