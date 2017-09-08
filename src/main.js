import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store';
import * as firebase from 'firebase'
import Vuetify from 'vuetify'

import('./../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp ({
      apiKey: "AIzaSyBFmzyLdcH3NLUSTagqkmtCf63tKkxCPCU",
      authDomain: "ksi-test-mechanism.firebaseapp.com",
      databaseURL: "https://ksi-test-mechanism.firebaseio.com",
      projectId: "ksi-test-mechanism",
      storageBucket: "ksi-test-mechanism.appspot.com"
    })
  }
})
