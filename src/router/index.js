import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'
import page from '@/views/pages/home/index'
import Login from '@/views/login/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: Login,
      component: Login
    },
    {
      path: '/layoutindex',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path:'/0',
          component:()=> import('@/views/pages/home2/index')
        },
        {
          path:'/1-1',
          component:page
        },
        {
          path:'/2',
          component:()=> import('@/views/pages/home2/index')
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
          component:()=> import('@/views/pages/template/templateone')
        },
        {
          path:'/5',
          component:()=> import('@/views/pages/template/templateone')
        },
        {
          path:'/6',
          component:()=> import('@/views/pages/template/templateone')
        },
        {
          path:'/7',
          component:()=> import('@/views/pages/template/templateone')
        },
        {
          path:'/8-1',
          component:()=> import('@/views/pages/template/templateone')
        },
        {
          path:'/8-2',
          component:()=> import('@/views/pages/template/templateone')
        },
        {
          path:'/8-3',
          component:()=> import('@/views/pages/ckgl/wlkcsd')
        },
        {
          path:'/8-4',
          component:()=> import('@/views/pages/template/templateone')
        }
        // {
        //   path:'/1-4-1',
        //   component:()=> import('@/views/pages/home/index')
        // },
        // {
        //   path:'/1-4-2',
        //   component:()=> import('@/views/pages/home/index')
        // }
      ]
    }
  ]
})
