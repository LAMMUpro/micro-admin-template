/// <reference types="vite/client" />

/** 基础对象 */
interface BaseObj<T = string | number> {
  [key: string]: T;
}

/**
 * `JavaScript`类型
 * - 这里只枚举一些常见类型，后续根据使用场景自行添加即可
 */
type JavaScriptTypes =
  | 'string'
  | 'number'
  | 'array'
  | 'object'
  | 'boolean'
  | 'function'
  | 'null'
  | 'undefined'
  | 'regexp'
  | 'promise'
  | 'formdata';
