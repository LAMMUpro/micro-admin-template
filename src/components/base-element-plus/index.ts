import {ElButton,ElSelect} from 'element-plus'

import type {App} from 'vue'

const setupElementPlus = (app: App) => {
  app.use(ElButton)
  app.use(ElSelect)
}

export default setupElementPlus
