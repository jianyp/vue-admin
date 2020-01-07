import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import page from '@/views/pages/home/index'
import Login from '@/views/login/index'
import RouterConfig from './modules' // 引入业务逻辑模块

Vue.use(Router)
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// 业务模块路由配置：在modules中新建模块对应js，写入相应路由及组件
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path:'/',
      name: "Login",
      component: Login
    },
    {
      path:'/layoutindex',
      name: "Layout",
      component: Layout,
      children:RouterConfig
    },
  ]
})
