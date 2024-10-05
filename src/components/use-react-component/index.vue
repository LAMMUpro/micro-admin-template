<template>
  <div ref="renderDom"><!-- 渲染节点 --></div>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted, ref, useAttrs, watchEffect } from 'vue';
import {
  reactComponentMountCallback,
  reactComponentUnMountCallback,
  reactComponentUpdateCallback,
} from './utils.tsx';

const props = defineProps({
  _is: {
    type: Object as PropType<any>,
    required: true,
  },
});

/**
 * 剩余参数(包括事件)
 */
const otherProps = useAttrs();

/** 当前组件唯一key */
const key = Symbol();

/** 渲染节点 */
const renderDom = ref<HTMLElement | undefined>(undefined);

/**
 * 剩余参数变化, 重新渲染
 */
watchEffect(() => {
  reactComponentUpdateCallback(key, props._is, {
    props: JSON.parse(JSON.stringify(otherProps)),
  });
});

/**
 * 组件初始化
 */
onMounted(() => {
  if (renderDom.value) {
    reactComponentMountCallback(renderDom.value, key, props._is, {
      props: { ...otherProps },
    });
  }
});

/**
 * 组件销毁
 */
onUnmounted(() => {
  reactComponentUnMountCallback(key);
});
</script>
