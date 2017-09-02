import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store';

import Vuetify from 'vuetify'

import('./../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(App)
})
