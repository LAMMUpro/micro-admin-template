<template>
  <div class="index">
    <Vue3Lottie
      ref="lottieRef"
      style="cursor: pointer"
      :height="200"
      :width="200"
      :animation-link="animationLink"
      :loop="false"
      :auto-play="false"
      @click="transformStatus"
      @on-complete="animationEnd"
    />

    <Vue3Lottie :animation-link="getLottieJsonLink('car')" />
  </div>
</template>

<script lang="ts" setup>
import { getLottieJsonLink } from '@/utils';
import { computed } from 'vue';
import { ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

const lottieRef = ref<InstanceType<typeof Vue3Lottie>>();

const iconName = ref<'heart' | 'heart-fill'>('heart');

const animationLink = computed(() => {
  return getLottieJsonLink(iconName.value);
});

function transformStatus() {
  lottieRef.value?.goToAndPlay(0);
}

function animationEnd() {
  iconName.value = iconName.value === 'heart' ? 'heart-fill' : 'heart';
}
</script>

<style lang="scss" scoped></style>
