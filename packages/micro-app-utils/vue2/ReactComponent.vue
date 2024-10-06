<template>
  <div ref="renderDom"><!-- 渲染节点 --></div>
</template>

<script>
import {
  reactComponentMountCallback,
  reactComponentUnMountCallback,
  reactComponentUpdateCallback,
} from '../vue3/utils';

/** 当前组件唯一key */
const key = Symbol();

export default {
  name: 'ReactComponent',
  props: {
    /** 指定渲染的react组件 */
    _is: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    propsJSON() {
      return JSON.stringify(this.$attrs);
    },
  },
  watch: {
    propsJSON: {
      handler(newValue, oldValue) {
        reactComponentUpdateCallback(key, this._is, {
          props: JSON.parse(newValue),
        });
      },
    },
  },
  /**
   * 组件初始化
   */
  mounted() {
    if (this.$refs.renderDom) {
      reactComponentMountCallback(this.$refs.renderDom, key, this._is, {
        props: { ...this.$attrs },
      });
    }
  },
  /**
   * 组件销毁
   */
  unmounted() {
    reactComponentUnMountCallback(key);
  },
};
</script>
