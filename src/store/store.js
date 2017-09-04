import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 1,
    oneChoiceQuestions: [
      {
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz a',
        answer2: 'to jest przykładowa odpowiedz b',
        answer3: 'to jest przykładowa odpowiedz c',
        answer4: 'to jest przykładowa odpowiedz d',
      },
      {
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      }
    ],
    multiChoiceQuestions: [
      {
        question: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer1State: false,
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer2State: false,
        answer3: 'to jest przykładowa odpowiedz',
        answer3State:false,
        answer4: 'to jest przykładowa odpowiedz',
        answer4State: false
      },
      {
        question: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer1State: false,
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer2State: false,
        answer3: 'to jest przykładowa odpowiedz',
        answer3State:false,
        answer4: 'to jest przykładowa odpowiedz',
        answer4State: false
      },
      {
        question: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer1State: false,
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer2State: false,
        answer3: 'to jest przykładowa odpowiedz',
        answer3State:false,
        answer4: 'to jest przykładowa odpowiedz',
        answer4State: false
      },
      {
        question: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer1State: false,
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        answer2State: false,
        answer3: 'to jest przykładowa odpowiedz',
        answer3State:false,
        answer4: 'to jest przykładowa odpowiedz',
        answer4State: false
      }
    ],
    videoBasedQuestions: [
      {
        videoURL: "https://www.youtube.com/watch?v=u4DZPemB4uI",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz a',
        answer2: 'to jest przykładowa odpowiedz b',
        answer3: 'to jest przykładowa odpowiedz c',
        answer4: 'to jest przykładowa odpowiedz d',
      },
      {
        videoURL: "https://www.youtube.com/watch?v=u4DZPemB4uI",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        videoURL: "https://www.youtube.com/watch?v=u4DZPemB4uI",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        videoURL: "https://www.youtube.com/watch?v=u4DZPemB4uI",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      }
    ],
    imageBasedQuestions: [
      {
        imageURL: "https://drive.google.com/file/d/0Bz7mEYNbcJUSNEs3WEtIbEd1QjA/preview",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz a',
        answer2: 'to jest przykładowa odpowiedz b',
        answer3: 'to jest przykładowa odpowiedz c',
        answer4: 'to jest przykładowa odpowiedz d',
      },
      {
        imageURL: "https://drive.google.com/file/d/0Bz7mEYNbcJUSNEs3WEtIbEd1QjA/preview",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        imageURL: "https://drive.google.com/file/d/0Bz7mEYNbcJUSNEs3WEtIbEd1QjA/preview",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
        answer3: 'to jest przykładowa odpowiedz',
        answer4: 'to jest przykładowa odpowiedz',
      },
      {
        imageURL: "https://drive.google.com/file/d/0Bz7mEYNbcJUSNEs3WEtIbEd1QjA/preview",
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        answer2: 'to jest przykładowa odpowiedz',
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
