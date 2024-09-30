# UseSvg

## 建议注册为全局组件

```TSX
import UseSvg from '@/components/use-svg/index.vue';
// 注册全局组件: `use-svg`
app.component('use-svg', UseSvg);
```

## vite.config.ts 配置

```TSX
import { svgBuilder } from './src/components/use-svg/loader';

plugins: [
  /** svg处理 */
  svgBuilder('./src/assets/svg/'),
]
```

## 使用方法

```TSX
<use-svg name="caret-bottom"/>
```
