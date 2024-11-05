<template>
  <el-dialog
    :append-to-body="false"
    class="__el-dialog"
    :width="props.width"
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
import { isPhone } from '@/hooks';

const props = defineProps({
  maxHeight: {
    type: String,
    default: 'calc(var(--screen-height) - 180px)', // 兼容移动端(不能用vh)
  },
  width: {
    type: String,
    default: () => (isPhone ? '88%' : '60%'), // 兼容移动端(两边留白更少一些)
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
