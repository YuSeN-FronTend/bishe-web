import { createApp, createVNode } from 'vue'
import App from './App.vue'
import router from "./router/index";
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as Icons from '@element-plus/icons'
import navAside from './components/layout/navAside/index.vue'
import { generateRoutesFromMenu } from './router/getRoutes'
import print from 'vue3-print-nb'
const app = createApp(App);
app.component('navAside', navAside)
app.use(createPinia())
app.use(print);
let menu = JSON.parse(String(sessionStorage.getItem('userInfo')))?.routeInfo
generateRoutesFromMenu(menu)?.forEach((item: any) => {
    router.addRoute(item)
})
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
app.mount('#app')
// 创建Icon组件
const Icon = (props: { icon: string }) => {
    const { icon } = props
    return createVNode(Icons[icon as keyof typeof Icons])
}
// 注册Icon组件
app.component('Icon', Icon)