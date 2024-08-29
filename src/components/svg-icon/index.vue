<template>
  <svg
    :class="svgClass"
    :style="{ color: color, fontSize: size }"
    v-bind="$attrs"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SvgIcon',
});
</script>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '1em',
  },
});

/** svg ID */
const iconName = computed(() => `#icon-${props.name}`);

/** 类名 */
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`;
  return 'svg-icon';
});
</script>

<style lang="scss">
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  overflow: hidden;
  vertical-align: middle;
  fill: currentColor;
  stroke: currentColor;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>
