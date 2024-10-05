<template>
  <div>
    <section class="-m-card lightcoral">
      <span className="-m-title">这是一个react原生组件(.tsx)</span>
      <UseReactComponent :_is="reactCompDemo"></UseReactComponent>
    </section>

    <section class="-m-card lightcoral">
      <span className="-m-title">这是第三方react组件</span>
      <span>//TODO</span>
    </section>
  </div>
</template>

<script lang="ts" setup>
import UseReactComponent from '@/components/use-react-component/index.vue';
import reactCompDemo from './reactCompDemo';
</script>

<style lang="scss" scoped></style>
