<template>
  <div>
    <section>
      <ReactComponent
        :_is="UseSchemaRender"
        :nodeId="2"
      ></ReactComponent>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ReactComponent from 'micro-app-tools/vue3/ReactComponent.vue';
import UseSchemaRender from '@/components/use-schema-render';
</script>

<style lang="scss" scoped></style>
