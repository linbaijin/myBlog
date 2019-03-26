import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import editor from '@/components/pages/editor'
import rightArticles from '@/components/pages/rightArticles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/Main',
      name:'Main',
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
        }
      ]
    },
    
  ]
})
