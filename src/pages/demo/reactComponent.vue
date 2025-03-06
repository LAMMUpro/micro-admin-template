<template>
  <div>
    <section class="-m-card">
      <span
        className="-m-title"
        @click="increaseDouble"
        >这是一个react原生组件(.tsx)</span
      >
      <span>鼠标在空白处移动，会有延迟特效</span>
      <ReactComponent
        :_is="reactCompDemo1"
        ref="reactCompDemo1Ref"
      ></ReactComponent>
    </section>

    <section class="-m-card">
      <span className="-m-title">渲染antd Tree组件</span>
      <ReactComponent
        :_is="reactCompDemo2"
        ref="reactCompDemo2Ref"
        :value="555"
      ></ReactComponent>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ReactComponent from 'micro-app-tools/vue3/ReactComponent.vue';
import reactCompDemo1 from './reactCompDemo1';
import reactCompDemo2 from './reactCompDemo2';
import { ref } from 'vue';

const reactCompDemo2Ref = ref<InstanceType<typeof ReactComponent>>();

/** 外部调用计数器+2 */
function increaseDouble() {
  // tsx组件用forwardRefWrap包一层
  reactCompDemo2Ref.value?.getReactRef()?.current?.increaseDouble();
}
</script>

<style lang="scss" scoped></style>
