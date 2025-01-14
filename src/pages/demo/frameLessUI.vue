<template>
  <div class="">
    <section class="-m-card">
      <h2 class="-m-title">input for vue3</h2>
      <fl-input-v3
        v-model="inputValue"
        clearable
      >
      </fl-input-v3>
    </section>

    <section class="-m-card">
      <h2 class="-m-title">paging-select for vue3</h2>
      <fl-paging-select-v3
        v-model:value="info.id"
        v-model:label="info.name"
        :api="api"
        immediate
        :optionSetting="{ label: 'name', id: 'id' }"
        style="width: 300px"
      >
      </fl-paging-select-v3>
      <div class="mt-3">{{ info }}</div>
    </section>

    <section class="-m-card">
      <h2 class="-m-title">button for vue3</h2>
      <fl-button-v3 type="primary">普通按钮</fl-button-v3>
      <fl-button-v3
        class="ml-1"
        type="success"
        >成功按钮</fl-button-v3
      >
      <fl-button-v3
        class="ml-1"
        type="warning"
        >警告按钮</fl-button-v3
      >
      <fl-button-v3
        class="ml-1"
        type="danger"
        >危险按钮</fl-button-v3
      >
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import FlPagingSelectV3 from 'frame-less-ui/vue3/paging-select';
import FlInputV3 from 'frame-less-ui/vue3/input';
import FlButtonV3 from 'frame-less-ui/vue3/button';

const inputValue = ref('');

const info = reactive({
  id: '4',
  name: '上海华耀公司有限公司',
});

function api() {
  function generateId() {
    return 1 + Date.now().toString().slice(5) + Math.random().toString(36).substring(2);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          pageSize: 10,
          currentPage: 1,
          totalCount: 100,
          list: [
            {
              id: generateId(),
              name: '上海外服（集团）有限公司国际人才分公司超长溢出测试',
            },
            { id: generateId(), name: '上海电气集团股份有限公司' },
            { id: generateId(), name: '上海外服（集团）有限公司' },
            { id: generateId(), name: '上海华耀公司有限公司' },
            { id: generateId(), name: '上海北泰实业股份有限公司' },
            { id: generateId(), name: '上海国际集团有限公司' },
            { id: generateId(), name: '上海明国实业有限公司' },
            { id: generateId(), name: '上海曼珩鼎实业有限公司' },
            { id: generateId(), name: '上海闻岱商业管理有限公司' },
            { id: generateId(), name: '上海叁零财务管理咨询有限公司' },
          ],
        },
        success: true,
      });
    }, 2000);
  });
}
</script>

<style lang="scss" scoped></style>
