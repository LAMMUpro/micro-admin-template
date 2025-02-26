
## 路由组件路由注册
### vue3
```tsx
import { generateExportComponent } from '@/microapp';

{
  path: '/ExportComponent/xxxDetailByID',
  name: 'ExportComponent_xxxDetailByID',
  component: () => generateExportComponent(defineAsyncComponent(() => import('@/pages/xxxDetailByID.vue'))),
  meta: { hidden: true, title: 'xx详情' },
}, 
```

### vue2