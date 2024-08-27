## 按需加载
- 原因：并不是所有组件都需要引入，比如：element-plus的icon组件，只需要用到的组件，其他组件就不需要引入，这样打包出来的文件会变小，加载速度更快。

## 示例
```ts

import {ElButton} from 'element-plus'

import type {App} from 'vue'

const setupElementPlus = (app: App) => {
  app.use(ElButton)
}

export default setupElementPlus

```
