<template>
  <el-dialog
    class="__el-dialog"
    append-to-body
  >
    <el-scrollbar
      class="main-el-dialog__scrollbar"
      :max-height="props.maxHeight"
    >
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
  padding-right: 0;
  padding-bottom: 12px;
  .main-el-dialog__scrollbar {
    padding-right: 16px;
  }
  .main-el-dialog__body {
    color: black;
  }
  .main-el-dialog__footer {
    padding-top: 10px;
    padding-right: 16px;
  }
}
</style>
