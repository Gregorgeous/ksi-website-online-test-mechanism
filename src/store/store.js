import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 1,
    oneChoiceQuestions: [
      {
        question1: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question2: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question3: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question4: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      }
    ],
    multiChoiceQuestions: [
      {
        question1: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question2: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question3: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question4: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      }
    ]
  },
  mutations: {
    nextQuestion (state) {
      state.count++
    }
  }
})
