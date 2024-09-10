## 延迟渲染组件

说明：对于一些一开始不显示的元素可以设置成不挂载，第一次显示即挂载，之后不会重新挂载
已注册为全局组件

## 注意，如果包裹的子元素是有动画的，并且子元素的显示到和 base-suspense 用同一个变量的，必须使用 v-model

### 使用

```vue
<template>
  <!-- 基本使用 -->
  <!-- 弹框和抽屉必须使用v-model -->
  <base-suspense v-model:visible="show">
    <el-dialog v-model="show"></el-dialog>
  </base-suspense>

  <!-- 立即挂载 -->
  <base-suspense
    v-model:visible="show"
    immediate
  >
    <el-dialog v-model="show"></el-dialog>
  </base-suspense>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const show = ref(false);
</script>
```
