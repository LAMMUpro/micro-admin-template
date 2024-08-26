<template>
  <section class="__route-info-bar">
    {{ currentRouteFullName }}
  </section>
</template>

<script lang="ts">
/** 当前路由全路径（中文） */
export const currentRouteFullName = ref('');
</script>

<script lang="ts" setup>
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
.__route-info-bar {
}
</style>
