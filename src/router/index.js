import Vue from 'vue'
import Router from 'vue-router'
import questionForm from '@/components/questionForm'
import startTestPage from '@/components/startTestPage'
import resultsPage from '@/components/resultsPage'
import examinersDashboard from '@/components/examinersDashboard'

// temp solution
import updateQuestionsDb from '@/components/questionDbUpdates/updateQuestionsDb'

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
    },
    {
      path: '/results-page',
      name: 'resultsPage',
      component: resultsPage
    },
    {
      path: '/update-questions-db',
      name: 'updateQuestionsDb',
      component: updateQuestionsDb
    },
    {
      path: '/examiners-dashboard',
      name: 'examinersDashboard',
      component: examinersDashboard
    }
  ]
})
