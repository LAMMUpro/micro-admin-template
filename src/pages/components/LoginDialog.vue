<template>
  <el-dialog
    title="登录"
    width="600px"
    :modelValue="props.show"
    @update:modelValue="emit('update:show', $event)"
  >
    <LoginCard></LoginCard>
  </el-dialog>
</template>

<script lang="ts" setup>
import ElDialog from '@/components/el-dialog/index.vue';
import LoginCard from './LoginCard.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void;
}>();
</script>

<style lang="scss" scoped>
/** */
</style>
