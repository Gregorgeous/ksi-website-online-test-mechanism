import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App'
import firebase from 'firebase'
import config from './../../ksiTestMechFbConfig.json'
import router from './router'
import { store } from './store/store';

// import('./../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)

Vue.config.productionTip = false
let app;
var myFirebase  = firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    // User is signed in.
    app = new Vue({
      el: '#app',
      store: store,
      router,
      render: h => h(App),
      beforeCreate() {
        //do something before creating vue instance
        // this.$store.
        // dispatch('signUpOnStart', {email: 'example@example.com',
        // password: 'example1'})
      },
      created() {
        // this.$store.dispatch('fetchTheCandidateData')
        // this.$store.dispatch('fetchQuestionsWhenPageRefreshed');

      }
    })
  }
});
