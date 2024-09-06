<template>
  <el-dialog
    class="__el-dialog"
    append-to-body
  >
    <el-scrollbar :max-height="props.maxHeight">
      <template #default>
        <slot></slot>
      </template>
    </el-scrollbar>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElDialog } from 'element-plus';
import 'element-plus/es/components/dialog/style/index';
import { ElScrollbar } from 'element-plus';
import 'element-plus/es/components/scrollbar/style/index';

const props = defineProps({
  maxHeight: {
    type: String,
    default: '80vh',
  },
});

defineExpose({});
</script>

<style lang="scss">
.__el-dialog {
  margin: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
}
</style>
