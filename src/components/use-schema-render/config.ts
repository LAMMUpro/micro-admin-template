import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';

let _env: 'test' | 'dev' | 'master' | 'localhost' = 'localhost';

if (location.hostname.includes('test.lammu.cn')) {
  _env = 'test';
} else if (location.hostname.includes('dev.lammu.cn')) {
  _env = 'dev';
} else if (location.hostname.includes('lammu.cn')) {
  _env = 'master';
}

/** 当前环境 */
export const env = _env;

/** 服务器域名 */
export const host = {
  localhost: 'http://localhost:9000',
  test: 'https://todo.cn',
  dev: 'https://todo.cn',
  master: 'https://todo.cn',
}[env];

/** ReactRenderer的appHelper配置 */
export const appHelper = {
  requestHandlersMap: {
    /** fetch请求对应处理函数, 必须配! */
    fetch: createFetchHandler(),
  },
  utils: {
    /** 增删改API方法集合 */
    remoteHandles: {},
    /** 快捷全局提示 */
    message: {
      info: (msg: string) => {
        console.log(msg);
      },
      error: (msg: string) => {
        console.log(msg);
      },
      warning: (msg: string) => {
        console.log(msg);
      },
      success: (msg: string) => {
        console.log(msg);
      },
    },
    /** 响应code=-1处理函数, 不是给用户用的 */
    __handleResCodeError: function (
      this: any,
      jsonData: { code: -1; status: Number; msg?: String }
    ) {
      if (!Number.isInteger(jsonData?.status)) return;
      switch (jsonData.status) {
        case 1001:
          //TODO
          jsonData.msg && this.utils.message.error(jsonData.msg);
          return;
        case 1002:
          //TODO
          jsonData.msg && this.utils.message.error(jsonData.msg);
          return;
      }
    },
    /** 分页函数 */
    getDefaultPageInfo() {
      return {
        pageSize: 10,
        current: 1,
        total: 0,
      };
    },
  },
  constants: {
    host,
  },
};
