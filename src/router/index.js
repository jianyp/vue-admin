import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/layout/index'
import page from '@/views/pages/home/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layoutindex',
      component: index,
      children:[
        {
          path:'/1-1',
          component:page
        },
        {
          path:'/1-2',
          component:()=> import('@/views/pages/home2/index')
        }
      ]
    }
  ]
})
