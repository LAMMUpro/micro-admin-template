<template>
  <div class="__head-layout">
    <Head></Head>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import Head from './components/Head.vue';
</script>

<style lang="scss" scoped>
.__head-layout {
  --sub-app-container-height: calc(100vh - 25px);
}
</style>
