<template>
  <div
    class="MicroComponent"
    :id="elementId"
    v-once
  ></div>
</template>

<script lang="ts" setup>
import {
  generateMicroComponentDomId,
  isSubApp,
  sendDataDown,
  sendDataUp,
  sendGlobalData,
} from '../index';
import { MicroComponentSlotMap } from '../data';
import { MicroComponents } from '../types';
import { PropType, onUnmounted, useAttrs, useSlots, watch } from 'vue';

/**
 * 注：vue3版的MicroComponent需要考虑主应用使用的情况
 */
const props = defineProps({
  /** 指定渲染组件名称 */
  _is: {
    type: String as PropType<MicroComponents>,
    required: true,
  },
  /** 子应用集合，子应用使用时候不需要传 */
  _subAppNameList: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
  /** 子应用使用时候不需要传 */
  _slotName: {
    type: String,
    default: '',
  },
  /** 子应用使用时候不需要传 */
  _parentElementId: {
    type: String,
    default: '',
  },
});

/** 剩余参数 */
const otherProps = useAttrs();

/** 插槽列表 */
const slots = useSlots();

/** 每次使用生成一个唯一的dom id */
const elementId = generateMicroComponentDomId();

watch(
  [() => props._is, () => JSON.stringify(otherProps)],
  () => {
    /** 子应用使用时必须传_is，主应用使用(插槽情况)不需要传_id */
    if (isSubApp && !props._is) return;
    /** 必须延迟，否则并列组件渲染只会发送的事件会被覆盖 */
    setTimeout(() => {
      if (isSubApp) {
        MicroComponentSlotMap[elementId] = slots;
        /**
         * 如果是子应用，则向主应用发送派发组件请求
         */
        sendDataUp({
          emitName: 'micro_component_request',
          parameters: [
            {
              subAppNameList: [window.__MICRO_APP_NAME__!],
              componentName: props._is,
              elementId,
              props: otherProps,
              slotNameList: Object.keys(slots),
            },
          ],
        });
      } else {
        /**
         * 如果是主应用，则是插槽情况需要向子应用发送渲染插槽请求
         */
        const nextSubAppName = props._subAppNameList.slice(-1)[0];
        sendDataDown(nextSubAppName, {
          emitName: 'micro_component_slot',
          parameters: [
            {
              subAppNameList: props._subAppNameList.slice(0, -1),
              slotName: props._slotName,
              elementId,
              parentElementId: props._parentElementId,
              props: otherProps,
            },
          ],
        });
      }
    });
  },
  { immediate: true }
);

onUnmounted(() => {
  /** 清除插槽缓存 */
  if (isSubApp && MicroComponentSlotMap[elementId]) {
    delete MicroComponentSlotMap[elementId];
  }

  setTimeout(() => {
    sendGlobalData({
      emitName: 'micro_component_destroy',
      parameters: [elementId],
    });
  });
});
</script>

<style lang="scss" scoped>
.MicroComponent {
  display: contents;
}
</style>
