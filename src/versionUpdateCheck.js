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

// 监听来自连接的消息
self.onconnect = async function (e) {
  /** 首次进入先获取一次 */
  if (!portList.length) indexHtml = await getIndexHtml();

  const port = e.ports[0];
  portList.push(port);

  /** 接收到页面请求 */
  port.onmessage = function (event) {
    if (event.data.type === 'page-hidden') {
      port.postMessage('页面隐藏');
      timer_clear = setTimeout(() => {
        clearInterval(timer);
        timer = undefined;
        port.postMessage('已取消定时器');
      }, 1000);
    } else if (event.data.type === 'page-visible') {
      port.postMessage('页面显示');
      if (timer_clear) {
        port.postMessage('已取消取消定时器');
        clearTimeout(timer_clear);
        timer_clear = undefined;
      }
      if (!timer) {
        port.postMessage('启动定时器');
        timer = setInterval(async () => {
          if ((await getIndexHtml()) !== indexHtml) {
            portList.forEach((port) => port.postMessage('版本变化了'));
            clearInterval(timer);
            timer = undefined;
          } else {
            portList.forEach((port) => port.postMessage('版本没有发生变化'));
          }
        }, 2000);
      }
    }
  };

  /** 断开连接列表清空 */
  port.onclose = function () {
    portList.splice(port, 1);
  };
};
