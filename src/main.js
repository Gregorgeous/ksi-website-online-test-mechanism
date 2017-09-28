import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store/store';

import('./../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)

Vue.config.productionTip = false
var myFirebase;

new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(App),
  beforeCreate() {
    //do something before creating vue instance
    var config = {
    apiKey: "AIzaSyBFmzyLdcH3NLUSTagqkmtCf63tKkxCPCU",
    authDomain: "ksi-test-mechanism.firebaseapp.com",
    databaseURL: "https://ksi-test-mechanism.firebaseio.com",
    projectId: "ksi-test-mechanism",
    storageBucket: "ksi-test-mechanism.appspot.com",
    messagingSenderId: "1066220391714"
    };
    myFirebase  = firebase.initializeApp(config)

    this.$store.
    dispatch('signUpOnStart', {email: 'example@example.com',
    password: 'example1'})
  },
  created() {
    this.$store.dispatch('fetchTheCandidateData')
    this.$store.dispatch('fetchQuestionsWhenPageRefreshed');

  }
})
