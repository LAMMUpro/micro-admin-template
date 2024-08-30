<template>
  <div
    class="MicroComponent"
    :id="elementId"
    v-once
  ></div>
</template>

<script>
import {
  generateMicroComponentDomId,
  isSubApp,
  sendDataDown,
  sendGlobalData,
} from '../index';
import { MicroComponentSlotMap } from '../data';

export default {
  name: 'MicroComponent',
  props: {
    /** 指定渲染组件名称 */
    _is: {
      type: String,
      required: true,
    },
    /** 子应用使用时候不需要传 */
    _subAppName: {
      type: String,
      default: '',
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
  },
  data() {
    return {
      /** 每次使用生成一个唯一的dom id */
      elementId: generateMicroComponentDomId(),
    };
  },
  computed: {
    /** 组件名和属性值拼接的字符串 */
    componentName_props() {
      return this._is + JSON.stringify(this.$attrs);
    },
  },
  watch: {
    /** 组件名 / 剩余参数发生变化，更新数据 */
    componentName_props: {
      handler(newValue, oldValue) {
        /** 子应用使用时必须传_is，主应用使用(插槽情况)不需要传_id */
        if (isSubApp && !this._is) return;
        /** 必须延迟，否则并列组件渲染只会发送的事件会被覆盖 */
        setTimeout(() => {
          /**
           * 如果是子应用，则向主应用发送派发组件请求
           */
          if (isSubApp) {
            /** vue2要用$scopedSlots而不是$slots */
            MicroComponentSlotMap[this.elementId] = this.$scopedSlots;
            /**
             * vue2的props和event是分开的，且事件前缀不带on
             */
            const otherProps = this.$attrs;
            Object.keys(this.$listeners).forEach((eventKey) => {
              otherProps[`on${eventKey[0].toUpperCase()}${eventKey.slice(1)}`] =
                this.$listeners[eventKey];
            });
            sendGlobalData({
              emitName: 'micro_component',
              parameters: [
                {
                  subAppName: window.__MICRO_APP_NAME__,
                  componentName: this._is,
                  elementId: this.elementId,
                  props: {
                    ...otherProps,
                    class: this.$vnode.data.staticClass,
                    style: this.$vnode.data.staticStyle,
                  },
                  slotNameList: Object.keys(this.$scopedSlots),
                },
              ],
            });
          } else {
            /**
             * 如果是主应用，则是插槽情况需要向子应用发送渲染插槽请求
             */
            sendDataDown(props._subAppName, {
              emitName: 'micro_component',
              parameters: [
                {
                  slotName: this._slotName,
                  elementId: this.elementId,
                  parentElementId: this._parentElementId,
                  props: this.$attrs,
                },
              ],
            });
          }
        });
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    /** 清除插槽缓存 */
    if (isSubApp && MicroComponentSlotMap[this.elementId]) {
      delete MicroComponentSlotMap[this.elementId];
    }
    setTimeout(() => {
      sendGlobalData({
        emitName: 'micro_component_destroy',
        parameters: [this.elementId],
      });
    });
  },
};
</script>

<style scoped>
.MicroComponent {
  display: contents;
}
</style>
