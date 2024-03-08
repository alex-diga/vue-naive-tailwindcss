/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<typeof DefineComponent>
  export default component
}

// 解决导入 element-plus 中文包问题
declare module 'element-plus/dist/locale/zh-cn.mjs'
