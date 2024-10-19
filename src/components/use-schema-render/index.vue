<template>
  <ReactComponent
    :_is="SchemaRender"
    v-bind="otherProps"
  ></ReactComponent>
</template>
<script lang="ts" setup>
import ReactComponent from 'micro-app-tools/vue3/ReactComponent.vue';
import SchemaRender from './index';
import { useAttrs } from 'vue';

const otherProps = useAttrs();
</script>
