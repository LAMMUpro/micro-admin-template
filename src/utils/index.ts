import CONSTS from './CONSTS';

/** 检查是否移动端 */
export let isMobile = () => {
  const pattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i;
  const result = pattern.test(navigator.userAgent);
  isMobile = () => result;
  return result;
};

/**
 * 检测类型
 * @param target 检测的目标
 */
export function checkType(target: any) {
  const value: string = Object.prototype.toString.call(target);
  const result = (value.match(/\[object (\S*)\]/) as RegExpMatchArray)[1];
  return result.toLocaleLowerCase() as JavaScriptTypes;
}

/**
 * 判断任意值的类型，作用与`checkType`一致，外加一个辅助功能：当函数返回值为`true`时，可以传入泛型来确定`target`的类型（类型收窄）
 * @param target 判断目标
 * @param type 判断的类型
 */
export function isType<T>(target: any, type: JavaScriptTypes): target is T {
  return checkType(target) === type;
}

/**
 * 平替JSON.parse
 * @params target 字符串
 * @params defaultValue 默认值，解析失败后使用
 */
export function safeJsonParse(target: any, defaultValue: any = {}) {
  let result = defaultValue;
  if (isType<string>(target, 'string')) {
    try {
      result = JSON.parse(target);
    } catch (error) {
      console.warn('格式化对象错误：', error);
    }
  }
  return result;
}

/**
 * 修改对象属性值-只改动之前存在的值
 */
export function modifyData<T>(
  /** 修改的目标 */
  target: T,
  /** 修改的内容 */
  _value: Partial<T> & BaseObj<any>,
  options: {
    /** 是否过滤掉为undefined的值，默认false */
    filterUndefined?: boolean;
    /** 属性是对象是否直接覆盖, 默认true */
    overWriteObjValue?: boolean;
    /** 是否对修改内容进行深拷贝，默认false */
    deepCopy?: boolean;
    /** 深拷贝方法, 默认JSON.parse(JSON.stringify(...)) */
    deepCopyFun?: (data: BaseObj<any>) => BaseObj<any>;
  } = {}
) {
  const { filterUndefined, overWriteObjValue, deepCopy, deepCopyFun } = {
    filterUndefined: false,
    overWriteObjValue: true,
    deepCopy: false,
    deepCopyFun: (data: BaseObj<any>) => JSON.parse(JSON.stringify(data)),
    ...options,
  };

  const value: Partial<T> & BaseObj<any> = deepCopy ? deepCopyFun(_value) : _value; // 是否深拷贝
  for (const _key in value) {
    const key = _key as keyof T;
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      if (!overWriteObjValue && isType(target[key], 'object')) {
        // 深层逐个赋值
        modifyData(target[key], value[key]!);
      } else {
        // 其它类型直接赋值
        if (filterUndefined === false || value[key] !== undefined) {
          // 是否过滤掉undefined的值
          target[key] = value[key]!;
        }
      }
    }
  }
}

/**
 * 判断是否外部链接
 * @param path 路径
 */
export function isExternal(path: string) {
  return /^(https|http?:|mailto:|tel:)/.test(path);
}

/**
 * 获取lottie文件链接
 */
export function getLottieJsonLink(
  /**  lottie文件名称，不用带.json后缀 */
  name: string
) {
  return `/${CONSTS.PREFIX_URL}/lottie/${name}.json`;
}

/**
 * 点击复制
 * @param text 复制的内容
 * @param success 成功回调
 * @param fail 出错回调
 */
export function copyText(
  text: string,
  success?: () => void,
  fail?: (res: string) => void
) {
  text = text.replace(/(^\s*)|(\s*$)/g, '');
  if (!text) {
    fail && fail('复制的内容不能为空！');
    return;
  }
  const id = 'the-clipboard';
  let clipboard = document.getElementById(id) as HTMLTextAreaElement;
  if (!clipboard) {
    clipboard = document.createElement('textarea');
    clipboard.id = id;
    clipboard.readOnly = true;
    clipboard.style.cssText =
      'font-size: 15px; position: fixed; top: -1000%; left: -1000%;';
    document.body.appendChild(clipboard);
  }
  clipboard.value = text;
  clipboard.select();
  clipboard.setSelectionRange(0, clipboard.value.length);
  const state = document.execCommand('copy');
  if (state) {
    success && success();
  } else {
    fail && fail('复制失败');
  }
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延时（ms）
 * @returns 防抖后的函数
 */
export function debounce(fn: Function, delay: number = 500) {
  let timer: number | undefined;
  return function (this: any, ...args: Array<any>) {
    const context = this;
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      fn.apply(context, args);
      timer = undefined;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 执行函数
 * @param delay 延时（ms）
 */
export function throttle(fn: Function, delay: number = 500) {
  let currentTime = Date.now();
  return function (this: any, ...args: Array<any>) {
    const context = this;
    const nowTime = Date.now();
    if (nowTime - currentTime > delay) {
      fn.apply(context, args);
      currentTime = Date.now();
    }
  };
}

/**
 * 添加window.resize监听事件
 */
export function addResizeEventListener(
  /** 回调函数，内部自动做了防抖 */
  cb: (event: Event) => void,
  options?: {
    /** 防抖间隔 */
    delay: number;
  }
) {
  const { delay } = { ...options, delay: 300 };
  const func = debounce(cb, delay);
  window.addEventListener('resize', func);

  return () => {
    window.removeEventListener('resize', func);
  };
}
