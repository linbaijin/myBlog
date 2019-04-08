import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/Main'
import editor from '@/components/pages/editor'
import rightArticles from '@/components/pages/rightArticles'
import register from '@/components/pages/register'
import login from '@/components/pages/login'
import articleInfo from '@/components/pages/articleInfo'
import userInfo from '@/components/pages/userInfo'
import selectArticle from '@/components/pages/selectArticle'
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
          path:'/selectArticle',
          name:'selectArticle',
          component:selectArticle
        },
        {
          path:'/editor',
          name:'Editor',
          meta:{
            requireAuth:true//判断是否要登录,true为要,false为不要
          },
          component:editor
        },
        {
          path:'/articleInfo',
          name:'ArticleInfo',
          component:articleInfo
        }
      ]
    },
    {
      path:'/register',
      name:'Register',
      component:register
    },
    {
      path:'/login',
      name:'Login',
      component:login
    },
    {
      path:'/userInfo',
      name:'UserInfo',
      meta:{
        requireAuth:true//判断是否要登录,true为要,false为不要
      },
      component:userInfo
    }
    
  ]
})
