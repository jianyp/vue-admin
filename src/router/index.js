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
          path:'/2',
          component:()=> import('@/views/pages/home/index')
        },
        {
          path:'/1-2',
          component:()=> import('@/views/pages/home/index')
        },
        {
          path:'/1-3',
          component:()=> import('@/views/pages/home/index')
        },
        {
          path:'/3',
          component:()=> import('@/views/pages/home/index')
        },
        {
          path:'/4',
          component:()=> import('@/views/pages/home/index')
        },
        {
          path:'/1-4-1',
          component:()=> import('@/views/pages/home/index')
        },
        {
          path:'/1-4-2',
          component:()=> import('@/views/pages/home/index')
        }
      ]
    }
  ]
})
