import pluginJs from "@eslint/js";
import pluginTs from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  /** .js */
  pluginJs.configs.recommended,
  /** .ts */
  ...pluginTs.configs.recommended,
  /** .vue */
  ...pluginVue.configs["flat/essential"],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    rules: {
      "vue/multi-word-component-names": "off",
    }
  }
];