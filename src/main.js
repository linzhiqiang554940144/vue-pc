import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import * as filters from '@/filters'
import * as directives from '@/directives'

import '@/plugins/ant-design-vue'
import '@/plugins/vue-echarts'
import '@/mock'

import '@/router/permission'

import '@/assets/styles/common/main.less'

//白屏过渡
import { preloaderFinished } from '@/utils/preload'
preloaderFinished()

Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]()))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')