<template>
  <base-dialog
    title="登录"
    width="600px"
    :modelValue="props.show"
    @update:modelValue="emit('update:show', $event)"
  >
    <LoginCard></LoginCard>
  </base-dialog>
</template>

<script lang="ts" setup>
import BaseDialog from '@/components/base-dialog/index.vue';
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
