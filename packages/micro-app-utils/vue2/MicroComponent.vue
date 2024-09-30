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
  sendDataUp,
  sendDataDown,
} from '../index';
import { MicroComponentSlotMap } from '../data';

/**
 * 处理vue2和vue3 v-model差异
 * value => modelValue
 * input => update:modelValue
 */
function processVModel(props) {
  if ('value' in props && 'onInput' in props) {
    props['modelValue'] = props.value;
    props['update:modelValue'] = props.onInput;
    delete props.value;
    delete props.onInput;
  }
  return props;
}

export default {
  /**
   * vue2使用MicroComponent 默认插槽时, 外层必须用<template #default><template>包裹, 否则响应式会丢失(原因未知)
   */
  name: 'MicroComponent',
  props: {
    /** 指定渲染组件名称 */
    _is: {
      type: String,
      required: true,
    },
    /** 子应用集合，子应用使用时候不需要传 */
    _subAppNameList: {
      type: Array,
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
      return this._is + '|' + JSON.stringify(this.$attrs);
    },
  },
  watch: {
    /** 组件名 / 剩余参数发生变化，更新数据 */
    componentName_props: {
      handler(newValue, oldValue) {
        /** 子应用使用时必须传_is，主应用使用(插槽情况)不需要传_id */
        if (isSubApp && !this._is) return;

        /**
         * 如果_is变化了(且旧值不为undefined)，清空props/slot缓存，之后会重新渲染组件
         * vue2版本不用考虑主应用环境情况下调用
         */
        const _is_old = oldValue?.slice(0, newValue?.indexOf('|'));
        if (isSubApp && _is_old !== undefined && this._is !== _is_old) {
          /** 子应用环境下通知主应用删缓存 */
          sendDataUp({
            emitName: 'micro_component_clear_props_slots',
            parameters: [this.elementId],
          });
        }

        /** 必须延迟，否则并列组件渲染只会发送的事件会被覆盖 */
        setTimeout(() => {
          /**
           * 如果是子应用，则向主应用发送派发组件请求
           */
          if (isSubApp) {
            /**
             * 更新props时不用重新保存slots
             * vue2要用$scopedSlots而不是$slots
             */
            if (!MicroComponentSlotMap[this.elementId])
              MicroComponentSlotMap[this.elementId] = this.$scopedSlots;
            /**
             * vue2的props和event是分开的
             * 事件前缀不带on
             * vue2的v-model === value + input（vue3的非input组件v-model === modelValue + update:modelValue）
             */
            const otherProps = this.$attrs;

            /**
             * vue3格式的props, 事件, 原生属性也在里面
             */
            const vue3Props = processVModel({
              ...otherProps,
              /**
               * 处理原生属性
               */
              class: this.$vnode.data.staticClass,
              style: this.$vnode.data.staticStyle,
              /** 处理事件 */
              ...Object.keys(this.$listeners).reduce((result, eventKey) => {
                result[`on${eventKey[0].toUpperCase()}${eventKey.slice(1)}`] =
                  this.$listeners[eventKey];
                /** 单独处理v-model的更新事件 */
                if (eventKey === 'input')
                  result['onUpdate:modelValue'] = this.$listeners[eventKey];
                return result;
              }, {}),
            });

            sendDataUp({
              emitName: 'micro_component_request',
              parameters: [
                {
                  subAppNameList: [window.__MICRO_APP_NAME__],
                  componentName: this._is,
                  elementId: this.elementId,
                  props: vue3Props,
                  slotNameList: Object.keys(this.$scopedSlots),
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
      sendDataUp({
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
