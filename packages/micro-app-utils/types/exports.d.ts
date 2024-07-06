/**
 * 此文件无法合并到type.d.ts，合并后会导致使用type.d.ts里面的类型需要手动导入才能使用
 */
import { MicroAppWindow, Window_microApp } from '@/microapp/type';

/** 全局注册的组件需要配置ts，不然使用组件没有提示 */
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    /** 使用大写命名法，可以使大写和小写都生效 */
    // SvgIcon: typeof SvgIcon;
  }
}

/** 提升一些全局ts */
declare global {
  export interface Window extends Partial<MicroAppWindow> {
    /**
     * 当前版本，方便在控制台查看调试用
     * @description 引用的是`package.json`中的`version`
     */
    version: string;

    createObjectURL: Function;
    /** tinymce 对象 */
    tinymce: {
      init: Function;
      [key: string]: any;
    };
    /** 剪贴板 */
    clipboardData: any;

    mount: () => void;
    unmount: () => void;

    /** 微前端 */
    microApp?: Window_microApp;
  }
}
