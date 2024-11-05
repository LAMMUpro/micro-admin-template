import { computed, ref } from 'vue';

/** 记录弹窗的zIndex，每次会加一 */
const zIndex = ref(2000);

/**
 * 获取组件最高定位层级
 * ps: 该方法调用一次之后，就会累加一次层级
 */
export function usezIndex() {
  return zIndex.value++;
}

/** 是否移动端尺寸(小于等于768px) */
export const isPhone = ref(false);

/** 是否桌面端尺寸(大于768px) */
export const isDesktop = computed(() => !isPhone.value);
