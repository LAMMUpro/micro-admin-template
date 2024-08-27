<template>
  <section class="__route-info-bar">
    <el-breadcrumb
      separator="/"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        v-for="(name, index) in nameList"
        :key="index"
        >{{ name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </section>
</template>

<script lang="ts">
/** 当前路由全路径（中文） */
export const currentRouteFullName = ref('');
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElBreadcrumb } from 'element-plus';
import { ElBreadcrumbItem } from 'element-plus';
import 'element-plus/es/components/breadcrumb/style/index';
import 'element-plus/es/components/breadcrumb-item/style/index';
import { computed } from 'vue';

/** 路径名称 */
const nameList = computed(() => {
  return currentRouteFullName.value.slice(1).split('/');
});
</script>

<style lang="scss" scoped>
.__route-info-bar {
}
</style>
