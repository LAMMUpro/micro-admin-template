<template>
  <div>
    <section class="-m-card lightcoral">
      <span className="-m-title">这是一个react原生组件(.tsx)</span>
      <ReactComponent :_is="reactCompDemo"></ReactComponent>
    </section>

    <section class="-m-card lightcoral">
      <span className="-m-title">这是第三方react组件</span>
      <span>//TODO</span>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ReactComponent from 'micro-app-utils/vue3/ReactComponent.vue';
import reactCompDemo from './reactCompDemo';
</script>

<style lang="scss" scoped></style>
