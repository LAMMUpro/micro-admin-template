<template>
  <MicroAppCore
    v-bind="props"
    :key="componentKey"
    @_reloadApp="componentKey = Date.now()"
  >
    <!-- 处理插槽问题 -->
    <template
      v-for="(_, name) in $slots"
      v-slot:[name]
    >
      <slot :name="name"></slot>
    </template>
  </MicroAppCore>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MicroAppCore from './MicroAppCore.vue';
import { MicroAppPropsType } from 'types';

/** 处理props问题 */
const props = defineProps<MicroAppPropsType>();

const componentKey = ref(Date.now());
</script>
