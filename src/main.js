// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'muse-ui/lib/styles/base.less';
import { Button, Select,AppBar,Grid,Avatar,Badge,Icon,Form,TextField,Checkbox,Chip,Snackbar} from 'muse-ui'
import Toast from 'muse-ui-toast'
import 'muse-ui/lib/styles/theme.less';
import 'typeface-roboto'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
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
.use(Checkbox).use(Chip).use(Snackbar)
Vue.use(mavonEditor).use(Toast,config)

Vue.use(hljs)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
