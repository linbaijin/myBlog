// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'muse-ui/lib/styles/base.less';
import { Button, Select,AppBar,Grid} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import 'typeface-roboto'
Vue.use(Button).use(Select).use(AppBar).use(Grid)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
