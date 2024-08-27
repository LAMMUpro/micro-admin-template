/**
 * 项目部署步骤
 * 1. 运行vite build打包命令
 * 2. 复制nginx.config到/build/下
 */
import { default as tools } from 'local-tool';

const { copyFileOrDir, setSymlink, deleteFileOrDir, execSync } = tools;

function main() {
  console.log('>>> 打包中...');
  execSync('yarn build');
  copyFileOrDir('./nginx.conf', './build/nginx.conf');
  console.log('>>> 打包成功...');
}

main();
