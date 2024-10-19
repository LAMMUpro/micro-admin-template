/**
 * 此文件无法合并到global.d.ts，合并后会导致使用global.d.ts里面的类型需要手动导入才能使用
 */
import { MicroAppWindow, Window_microApp } from '.';

/** 提升一些全局ts */
declare global {
  interface Window extends Partial<MicroAppWindow> {
    /** 微前端应用挂载 */
    mount: () => void;
    /** 微前端应用卸载 */
    unmount: () => void;

    /** 微前端 */
    microApp?: Window_microApp;
  }
}
