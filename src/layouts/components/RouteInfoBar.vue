<template>
  <section class="lt-md:(m-l-16)">
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

<script lang="ts" setup>
import { ElBreadcrumb } from 'element-plus';
import { ElBreadcrumbItem } from 'element-plus';
import 'element-plus/es/components/breadcrumb/style/index';
import 'element-plus/es/components/breadcrumb-item/style/index';
import { computed } from 'vue';
import { currentRouteInfo } from '@/router';

/** 页面全路径名称集合（从当前菜单路由信息中提取） */
const nameList = computed(() => {
  if (!currentRouteInfo.value) return '';
  return `${currentRouteInfo.value.prefixName}/${currentRouteInfo.value.name}`
    .slice(1)
    .split('/');
});
</script>
