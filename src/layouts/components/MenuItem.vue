<template>
  <el-sub-menu
    v-if="props.menuInfo.children?.length"
    :index="props.level"
  >
    <template #title>
      <img
        v-if="menuInfo.icon"
        class="__menu-icon"
        :src="menuInfo.icon"
        alt="icon"
      />
      <span class="-m-ellipsis">{{ menuInfo.name }}</span>
    </template>
    <MenuItem
      v-for="(item, index) in props.menuInfo.children"
      :key="item.id"
      :menuInfo="item"
      :level="`${props.level}-${index}`"
    ></MenuItem>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="props.level"
    >{{ props.menuInfo.name }}</el-menu-item
  >
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

<style lang="scss" scoped>
.__menu-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>
