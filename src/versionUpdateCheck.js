import CONSTS from '@/utils/CONSTS';

/** 定时器 */
let timer;

/** 取消定时器 */
let timer_clear;

/** 所有标签页连接 */
const portList = [];

/** 应用入口html */
let indexHtml = '';

/**
 * 获取应用入口html
 */
async function getIndexHtml() {
  const res = await fetch(`/${CONSTS.PREFIX_URL}/index.html`);
  return await res.text();
}

/**
 * 连接成功事件
 */
self.onconnect = async function (event) {
  /** 首次进入先获取一次 */
  if (!portList.length) indexHtml = await getIndexHtml();

  const port = event.ports[0];

  /** 暂存连接 */
  portList.push(port);

  /**
   * 接收到页面请求
   */
  port.onmessage = function (event) {
    /**
     * 事件类型：
     * 'page-hidden' - 页面隐藏
     * 'page-visible' - 页面显示
     */
    const eventType = event.data.type;
    if (eventType === 'page-hidden') {
      /**
       * 页面隐藏，取消轮询（延迟1s，如果再1s内重新切换回同源的标签页，可以取消这个定时器）
       */
      timer_clear = setTimeout(() => {
        clearInterval(timer);
        timer = undefined;
      }, 1000);
    } else if (eventType === 'page-visible') {
      /**
       * 页面显示
       */
      if (timer_clear) {
        clearTimeout(timer_clear);
        timer_clear = undefined;
      }
      if (!timer) {
        timer = setInterval(async () => {
          /** 版本改变了，清空定时器，给所有标签页发送事件 */
          if ((await getIndexHtml()) !== indexHtml) {
            clearInterval(timer);
            timer = undefined;
            portList.forEach((port) => port.postMessage({ type: 'version-change' }));
            /** 清空列表 */
            portList.splice(0, portList.length);
          }
          // portList.forEach((port) =>
          //   port.postMessage({ type: 'console', msg: `连接数：${portList.length}` })
          // );
        }, 2000);
      }
    } else if (eventType === 'page-unload') {
      /** 应用卸载，清空port缓存 */
      const index = portList.indexOf(port);
      if (index > -1) portList.splice(index, 1);
    }
  };
};
