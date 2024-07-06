<template>
  <slot v-if="isRenderChilren"></slot>
</template>

<script lang="ts">
/** 延时挂载组件 */
defineComponent({
  name: 'BaseSuspense',
});
</script>

<script lang="ts" setup>
import { computed, defineComponent, nextTick, ref, watch } from 'vue';

const props = defineProps({
  /** 立即挂载 */
  immediate: {
    type: Boolean,
    default: false,
  },
  /** 是否挂载 */
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>();

/** 标识是否挂载过了 */
const isMounted = ref(false);

watch(
  () => props.visible,
  (val) => {
    /** 如果挂载过了(isMounted为ture), 则不会再触发，用unwatch会不会更好？ */
    if (val && !isMounted.value) {
      /** 先使visible变为false, 再变为true，防止用户一开始visible为true */
      emit('update:visible', false);
      isMounted.value = true;
      /** 等组件渲染完成再打开，否则会没有动画？ */
      nextTick(() => {
        emit('update:visible', true);
      });
    }
  },
  { immediate: true }
);

/** 是否挂载传入的slot */
const isRenderChilren = computed(() => {
  /**
   * 如果是立即挂载或者visible变为true了
   * 如果传入了immediate，那和不用这个包裹有什么区别呢？？
   */
  if (props.immediate || isMounted.value) {
    return true;
  }
  return false;
});
</script>

<style scoped>
/** */
</style>
