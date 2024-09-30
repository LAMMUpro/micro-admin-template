<template>
  <textarea :id="domId">{{ props.modelValue }}</textarea>
</template>

<script lang="ts">
let count = 0;
</script>

<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

/** 节点id */
const domId = `mainTinymceDom-${count++}`;

/** 获取富文本值 */
function getContent() {
  return (window as any).tinymce.get(domId).getContent();
}

onMounted(() => {
  /** 初始化 */
  (window as any).tinymce?.init({
    selector: '#' + domId,
    /** 初始化完成回调函数 */
    init_instance_callback(editor: any) {
      /** 失去焦点 */
      editor.on('Blur', () => {
        emit('update:modelValue', getContent());
      });
    },
  });
});
</script>
