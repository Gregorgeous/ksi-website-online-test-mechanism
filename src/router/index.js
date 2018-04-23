import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import questionForm from '@/components/questionForm'
import startTestPage from '@/components/startTestPage'
import resultsPage from '@/components/resultsPage'
import examinersDashboard from '@/components/examinersDashboard'
import AdminLoginView from '@/components/AdminLoginView'
import AdminDashboard from '@/components/AdminDashboard'
import testsDatabase from '@/components/testsDatabase'
// temp solution
import updateQuestionsDb from '@/components/questionDbUpdates/updateQuestionsDb'

Vue.use(Router)

let router = new Router({
  routes: [
    
    {
      path: '/',
      redirect: '/admin-dashboard'
    },
    {
      path: '/login',
      name: 'AdminLoginView',
      component: AdminLoginView
    },
    {
      path: '/admin-dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/tests-database',
      name: 'testsDatabase',
      component: testsDatabase,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/start-test',
      name: 'startTestPage',
      component: startTestPage,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/question-form',
      name: 'questionForm',
      component: questionForm,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/results-page',
      name: 'resultsPage',
      component: resultsPage,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/update-questions-db',
      name: 'updateQuestionsDb',
      component: updateQuestionsDb,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/examiners-dashboard',
      name: 'examinersDashboard',
      component: examinersDashboard,
      meta:{
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
