// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'muse-ui/lib/styles/base.less';
import { 
  Button, Select,AppBar,Grid,
  Avatar,Badge,Icon,Form,TextField,
  Checkbox,Chip,Snackbar,Pagination,
  Dialog,Radio,Menu,List
} from 'muse-ui'
import Toast from 'muse-ui-toast'
import 'muse-ui/lib/styles/theme.less';
import uploader from 'vant/lib/uploader'
import 'vant/lib/uploader/style'
import 'typeface-roboto'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/darkula.css'
//muse-ui Toast配置
const config = {
  position: 'top',               // position
  time: 3000,                       // show time length
  closeIcon: 'close',               // close icon
  close: true,                      // show close button
  successIcon: 'check_circle',      // success icon
  infoIcon: 'info',                 // info icon
  warningIcon: 'priority_high',     // warning icon
  errorIcon: 'warning'              // error icon
}

Vue.use(Button).use(Select).use(AppBar).use(Grid)
.use(Avatar).use(Badge).use(Icon).use(Form).use(TextField)
.use(Checkbox).use(Chip).use(Snackbar).use(Dialog).use(Radio)
Vue.use(mavonEditor).use(Toast,config).use(Pagination).use(Menu)
.use(List)

Vue.use(uploader)

Vue.use(hljs)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,form,next)=>{//路由守卫
  if(to.matched.some(res=>res.meta.requireAuth)){
    if(sessionStorage.getItem('userName')){
      next()
    }else{
      next({
        path:'/login'
      })
    }
  }else{
    next()
  }
})
