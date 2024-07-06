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
import { computed, ComputedRef, defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
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
  },
  setup(props) {
    const iconName: ComputedRef<string> = computed(() => `#icon-${props.name}`);
    const svgClass: ComputedRef<string> = computed(() => {
      if (props.name) return `svg-icon icon-${props.name}`;
      return 'svg-icon';
    });
    return {
      iconName,
      svgClass,
    };
  },
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
