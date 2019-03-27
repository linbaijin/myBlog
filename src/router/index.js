import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import editor from '@/components/pages/editor'
import rightArticles from '@/components/pages/rightArticles'
import register from '@/components/pages/register'
import login from '@/components/pages/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Main',
      component:Main,
      children:[
        {
          path:'/',
          name:'rightArticlrs',
          component:rightArticles
        },
        {
          path:'/editor',
          name:'Editor',
          component:editor
        },
      ]
    },
    {
      path:'/register',
      name:'Register',
      component:register
    },{
      path:'/login',
      name:'Login',
      component:login
    }
    
  ]
})
