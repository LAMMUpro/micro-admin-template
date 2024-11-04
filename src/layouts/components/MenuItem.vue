<template>
  <el-sub-menu
    v-if="props.menuInfo.children?.length"
    :index="props.level"
  >
    <template #title>
      <!-- 图标 -->
      <template v-if="menuInfo.icon">
        <!-- 外链 -->
        <img
          v-if="isExternal(menuInfo.icon) || menuInfo.icon.startsWith('/')"
          class="w-4 h-4 m-r-1.25"
          :src="menuInfo.icon"
          alt="icon"
        />
        <!-- svg图标 -->
        <use-svg
          v-else
          class="w-4 h-4 m-r-1.25"
          :name="menuInfo.icon"
        />
      </template>

      <span class="-m-ellipsis">{{ menuInfo.name }}</span>
    </template>
    <MenuItem
      v-for="(item, index) in props.menuInfo.children.filter((menu: any) => !menu.hidden)"
      :key="item.id"
      :menuInfo="item"
      :level="`${props.level}-${index}`"
    ></MenuItem>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="props.level"
  >
    <!-- //TODO 链接转换为主应用下的 -->
    <a
      style="color: #303133"
      :href="props.menuInfo.path"
      @click="(e) => e.preventDefault()"
      >{{ props.menuInfo.name }}
    </a>
  </el-menu-item>
</template>

<script lang="ts">
/** 菜单项 */
export default defineComponent({
  name: 'MenuItem',
});
</script>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { ElMenuItem, ElSubMenu } from 'element-plus';
import 'element-plus/es/components/menu-item/style/index';
import 'element-plus/es/components/sub-menu/style/index';
import { isExternal } from '@/utils';

const props = defineProps({
  menuInfo: {
    type: Object,
    required: true,
  },
  /** 唯一标识 */
  level: {
    type: String,
    required: true,
  },
});
</script>
