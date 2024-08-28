<template>
  <el-button :type='type'> 测试{{ children }}{{ type }}</el-button>
</template>
<script lang='ts' setup>
// import { defineComponent } from 'vue';
import { ElButton } from 'element-plus/es/components/button/index';
import 'element-plus/es/components/button/style/index.mjs'

const { type, children } = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  children: {
    type: String,
    default: '测试'
  }
});

</script>

<script lang='ts'>
// export default defineComponent({
//   name: 'element-plus-button',
// })
</script>
