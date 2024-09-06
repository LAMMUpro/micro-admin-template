<template>
  <div class="onlinePreview">
    <el-form
      label-width="100px"
      :ref="(ref: any) => dataForm.ref = ref"
      :model="dataForm.subAppSetting"
      :rules="dataForm.rules"
    >
      <el-form-item
        label="网址："
        prop="url"
      >
        <el-input
          v-model="dataForm.subAppSetting.url"
          placeholder="请输入网站地址, 网址需要支持跨域"
          :disabled="dataForm.inPreview"
          clearable
        ></el-input>
        <div>
          <span style="color: #606266">快捷输入：</span>
          <el-tag
            v-for="(item, index) in dataForm.subAppList"
            :key="index"
            class="pointer"
            style="margin-right: 6px"
            size="small"
            effect="dark"
            :type="(item.tagType as any)"
            @click="dataForm.subAppChange(item)"
            >{{ item.label }}</el-tag
          >
        </div>
      </el-form-item>
      <el-form-item
        label="打包器："
        prop="builder"
      >
        <el-radio-group
          v-model="dataForm.subAppSetting.builder"
          :disabled="dataForm.inPreview"
        >
          <el-radio value="webpack"> webpack </el-radio>
          <el-radio value="vite"> vite </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div style="margin-left: 100px">
      <el-button
        type="primary"
        size="small"
        :disabled="dataForm.inPreview"
        @click="dataForm.submit()"
        >点击预览</el-button
      >
      <el-button
        type="warning"
        size="small"
        @click="dataForm.clearSubApp()"
        >重置</el-button
      >
    </div>

    <div
      class="web-component"
      style="position: relative"
    >
      <micro-app-admin
        v-if="dataForm.inPreview"
        name="onlineSubApp"
        destroy
        clearData
        :url="dataForm.subAppSetting.url"
        :iframe="dataForm.subAppSetting.builder === 'vite'"
      ></micro-app-admin>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import {
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElForm,
  ElFormItem,
  ElButton,
  FormInstance,
  ElMessage,
  ElTag,
} from 'element-plus';
import 'element-plus/es/components/input/style/index';
import 'element-plus/es/components/radio/style/index';
import 'element-plus/es/components/radio-group/style/index';
import 'element-plus/es/components/form/style/index';
import 'element-plus/es/components/form-item/style/index';
import 'element-plus/es/components/button/style/index';
import 'element-plus/es/components/tag/style/index';
import { modifyData } from '@/utils';
import { shallowReactive } from 'vue';

function getDefaultFormInfo() {
  return {
    url: '',
    builder: '',
  };
}

const dataForm = shallowReactive({
  ref: undefined as FormInstance | undefined,
  /** 子应用配置 */
  subAppSetting: reactive(getDefaultFormInfo()),
  /** demo子应用列表 */
  subAppList: [
    {
      label: 'element官网',
      url: 'https://element-plus.org/zh-CN/component/overview.html',
      builder: 'vite',
      tagType: 'warning',
    },
    {
      label: 'webpack官网',
      url: 'https://webpack.js.org/',
      builder: 'webpack',
      tagType: 'primary',
    },
    {
      label: 'vuetify官网',
      url: 'https://vuetifyjs.com/en/',
      builder: 'vite',
      tagType: 'success',
    },
    {
      label: 'wujie官网',
      url: 'https://wujie-micro.github.io/doc/guide/',
      builder: 'vite',
      tagType: 'danger',
    },
  ],
  /** demo子应用选中/切换 */
  subAppChange(setting: any) {
    if (this.inPreview) return ElMessage.warning('请先重置！');
    setTimeout(() => {
      modifyData(dataForm.subAppSetting, setting);
    });
  },
  rules: {
    url: [{ required: true, message: '请输入网址', trigger: 'change' }],
    builder: [{ required: true, message: '请选择打包器类型', trigger: 'change' }],
  },
  /** 是否正在预览 */
  inPreview: false,
  submit() {
    dataForm.ref?.validate((valid) => {
      if (!valid) return;
      try {
        new URL(dataForm.subAppSetting.url);
        this.inPreview = true;
      } catch {
        ElMessage.warning(`输入的URL不合法，请重新输入`);
      }
    });
  },
  /** 清除子应用 */
  clearSubApp() {
    this.inPreview = false;
  },
});
</script>

<style lang="scss" scoped>
.onlinePreview {
  .web-component {
    /** 样式兼容处理 */
    :deep(micro-app-body) {
      /** vuetify子应用 */
      div.v-application__wrap {
        header {
          display: none !important;
        }
        nav {
          display: none !important;
        }
      }
      /** element子应用 */
      .el-scrollbar.sidebar {
        position: absolute;
      }
      /** webpack子应用 */
      div.site__header {
        position: sticky;
        top: 0;
      }
      /** wujie子应用 */
      header.VPNav {
        display: none;
      }
      aside.VPSidebar {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
.pointer {
  cursor: pointer;
}
</style>
