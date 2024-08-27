<template>
  <el-scrollbar class="__menu">
    <div
      style="
        position: relative;
        padding: 6px 8px;
        box-shadow: 0 10px 20px #9d9d9d1f;
        z-index: 1;
      "
    >
      <el-input
        clearable
        v-model="menuKeyWord"
        placeholder="请输入菜单关键词"
        size="small"
      ></el-input>
    </div>
    <el-menu
      :default-active="menuActiveIndex"
      @select="handleMenuChange"
    >
      <MenuItem
        v-for="(menuInfo, index) in menus"
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
import { ref, watch, computed } from 'vue';
import { ElScrollbar, ElMenu, ElInput, ElMessage } from 'element-plus';
import 'element-plus/es/components/scrollbar/style/index';
import 'element-plus/es/components/menu/style/index';
import 'element-plus/es/components/input/style/index';
import Global from '@/Global';
import MenuItem from './MenuItem.vue';
import { MenuItemType } from '@/types/common';
import { useRoute, useRouter } from 'vue-router';
import { getSubAppPrefixFromRouteUrl } from '@/router/helper';
import { MicroAppConfig } from 'micro-app-utils/data';
import { subAppPath } from '@/pages/SubMicroApp.vue';
import CONSTS from '@/utils/CONSTS';
import { currentRouteFullName } from './RouteInfoBar.vue';

const route = useRoute();
const router = useRouter();

/** 菜单关键词 */
const menuKeyWord = ref('');

watch(
  () => menuKeyWord.value,
  () => {
    // TODO菜单过滤
    console.log(menuKeyWord.value);
    if (menuKeyWord.value) {
      ElMessage({
        type: 'success',
        message: '菜单已过滤',
        grouping: true,
      });
    }
  }
);

/**
 * 菜单
 */
const menus = computed(() => {
  if (menuKeyWord.value) {
    return filterMenuByKeyWord(Global.menu.info.menus);
  } else {
    return Global.menu.info.menus;
  }
});

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

  if ([0, 1].includes(menuInfo.targetType))
    currentRouteFullName.value = `${menuInfo.prefixName}/${menuInfo.name}`;
}

/**
 * 通过关键词过滤菜单
 */
function filterMenuByKeyWord(menuList: Array<MenuItemType>): Array<MenuItemType> {
  // 递归过滤菜单项，返回是否匹配
  function filterMenu(menuList: Array<MenuItemType>): Array<MenuItemType> {
    return menuList
      .map((menu) => {
        // 递归过滤子菜单
        const filteredChildren = menu.children ? filterMenu(menu.children) : [];

        // 如果当前菜单或其子菜单匹配，则返回当前菜单（包括其所有子菜单）
        if (menu.name.toLowerCase().includes(menuKeyWord.value)) {
          return menu;
        } else if (filteredChildren.length > 0) {
          return {
            ...menu,
            children: filteredChildren,
          };
        }
      })
      .filter(Boolean) as Array<MenuItemType>;
  }
  return filterMenu(menuList);
}
</script>

<style lang="scss" scoped>
.__menu {
  border-right: 1px solid rgb(240, 240, 240);
}
</style>
