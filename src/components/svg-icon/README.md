# SvgIcon

## 建议注册为全局组件

```TSX
import svgIcon from '@/components/svg-icon/index.vue';
// 注册全局组件: `svg-icon`
app.component('svg-icon', svgIcon);
```

## vite.config.ts 配置

```TSX
import { svgBuilder } from './src/components/svg-icon/loader';

plugins: [
  /** svg处理 */
  svgBuilder('./src/assets/svg/'),
]
```

## 使用方法

```TSX
<svg-icon name="caret-bottom"/>
```
