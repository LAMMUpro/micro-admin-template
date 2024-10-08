<template>
  <div class="index">
    <Vue3Lottie :animation-link="getLottieJsonLink('close')" />

    <Vue3Lottie :animation-link="getLottieJsonLink('car')" />
  </div>
</template>

<script lang="ts" setup>
import { getLottieJsonLink } from '@/utils';
import { Vue3Lottie } from 'vue3-lottie';
</script>

<style lang="scss" scoped></style>
