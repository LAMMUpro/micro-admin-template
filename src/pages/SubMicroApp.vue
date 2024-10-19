<template>
  <section class="SubMicroApp">
    <MicroApp
      :_name="subAppName"
      :_path="subAppPath"
      _prefix=""
      _default-page="/#/empty"
    ></MicroApp>
  </section>
</template>

<script lang="ts">
/** 子应用的path */
export const subAppPath = ref('');
</script>

<script lang="ts" setup>
import MicroApp from 'micro-app-tools/vue3/MicroApp.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

/** 路径第一级就是子应用名称 */
const subAppName = computed(() => {
  return route.path.slice(1);
});
</script>

<style lang="scss" scoped>
/** */
</style>
