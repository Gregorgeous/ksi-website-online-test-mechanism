import Vue from 'vue'
import Router from 'vue-router'
import questionForm from '@/components/questionForm'
import startTestPage from '@/components/startTestPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'startTestPage',
      component: startTestPage
    },
    {
      path: '/question-form',
      name: 'questionForm',
      component: questionForm
    }
  ]
})
