import { subAppLocation } from 'micro-app-utils';

/** 不同环境url包含的字符串, 用于判断当前是测试环境还是正式环境, 要求不能相互匹配!!! */
const urlSubStringInfo = {
  test: 'test.micro-admin-template.lammu.cn',
  pre: 'pre.micro-admin-template.lammu.cn',
  master: 'micro-admin-template.lammu.cn',
};

/** 不同环境对应的origin */
const originMap = {
  test: 'https://test.micro-admin-template.lammu.cn',
  pre: 'https://pre.micro-admin-template.lammu.cn',
  master: 'https://micro-admin-template.lammu.cn',
};

export default class ModuleConfig {
  /** 是否本地开发环境 */
  readonly isLocalhost = import.meta.env.DEV;
  /** 是否测试环境 */
  readonly isTest = this.env === 'test';
  /** 是否预发环境 */
  readonly isPre = this.env === 'pre';
  /** 是否生产环境 */
  readonly isMaster = this.env === 'master';
  /** hostname */
  readonly hostname = subAppLocation?.hostname;
  /** 不同环境origin */
  readonly originMap = originMap;
  /** 后台返回文件地址组合前缀 */
  readonly uploadFilePrefix = '/api/comservice-server';
  /** token名称 */
  get tokenKey() {
    return '';
  }
  /** 运行环境 */
  get env(): 'localhost' | 'test' | 'pre' | 'master' {
    const hostname = subAppLocation.hostname;
    if (this.isLocalhost) {
      return 'localhost';
    } else if (hostname.includes(urlSubStringInfo['test'])) {
      return 'test';
    } else if (hostname.includes(urlSubStringInfo['pre'])) {
      return 'pre';
    } else if (hostname.includes(urlSubStringInfo['master'])) {
      return 'master';
    } else {
      console.error('判断不出当前代码运行环境,请检查配置!!!');
      return 'localhost';
    }
  }
}
