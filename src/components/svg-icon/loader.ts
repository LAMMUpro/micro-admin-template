import { readFileSync, readdirSync } from 'fs';

// svg-sprite-loader 这个貌似在 vite 中用不了
// 该文件只能作为`vite.config.ts`导入使用
// 其他地方导入会报错，因为浏览器环境不支持`fs`模块

/** `id`前缀 */
let idPerfix = '';

const svgTitle = /<svg([^>+].*?)>/;

const clearHeightWidth = /(width|height)="([^>+].*?)"/g;

const hasViewBox = /(viewBox="[^>+].*?")/g;

const clearReturn = /(\r)|(\n)/g;

/**
 * 查找`svg`文件
 * @param dir 文件目录
 */
function findSvgFile(dir: string): Array<string> {
  const svgRes: Array<string> = [];
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  });
  dirents.forEach(function (dirent) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + '/'));
    } else {
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, '')
        .replace(svgTitle, function (_, group) {
          let width = 0;
          let height = 0;
          let content = group.replace(
            clearHeightWidth,
            function (val1: string, val2: string, val3: number) {
              if (val2 === 'width') {
                width = val3;
              } else if (val2 === 'height') {
                height = val3;
              }
              return '';
            }
          );
          if (!hasViewBox.test(group)) {
            content += ` viewBox="0 0 ${width} ${height}"`;
          }
          return `<symbol id="${idPerfix}-${dirent.name.replace('.svg', '')}" ${content}>`;
        })
        .replace('</svg>', '</symbol>');
      svgRes.push(svg);
    }
  });
  return svgRes;
}

/**
 * `svg`打包器
 * 会将svg合并插入到index.html的<body>内
 * @param path 资源路径
 * @param perfix 后缀名（标签`id`前缀）
 */
export function svgBuilder(path: string, perfix = 'icon') {
  if (path.trim() === '') return;
  idPerfix = perfix;
  let svgStrList = findSvgFile(path);
  svgStrList = svgStrList.map((svgStr) => {
    const symbolIndex = svgStr.indexOf('<symbol');
    if (symbolIndex > -1) return svgStr.substring(symbolIndex); // <symbol前面的内容忽略，兼容vite直接启动
    return svgStr;
  });

  return {
    name: 'svg-transform',
    transformIndexHtml(html: string) {
      return html.replace(
        '<body>',
        `<body>\n\t<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">\n\t\t${svgStrList.join(
          '\n\t\t'
        )}\n\t</svg>`
      );
    },
  };
}
