<template>
  <MicroAppCore
    v-bind="$attrs"
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

<script>
import MicroAppCore from './MicroAppCore.vue';

export default {
  components: { MicroAppCore },
  data() {
    return {
      componentKey: Date.now(),
    };
  },
};
</script>
