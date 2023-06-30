import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import '@/utils'
import config from '@/config'
import './theme/index.less'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.prototype.$config = config

Vue.use(VXETable)
Vue.use(ViewUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
