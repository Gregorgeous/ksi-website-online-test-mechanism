import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase"
import checkTheAnswers from './checkingAnswersMechanism'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 1,
    oneChoiceQuestions: [
      {
        question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        correctAnswer: 'to jest przykładowa POPRAWNA odpowiedz a',
        answer2: 'to jest przykładowa odpowiedz b',
        answer3: 'to jest przykładowa odpowiedz c',
        answer4: 'to jest przykładowa odpowiedz d',
        whichAnswerChosen:''
      }
    ],
    multiChoiceQuestions: [
      {
        question: "to jest przykładowe pytanie wielokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
        answer1: 'to jest przykładowa POPRAWNA odpowiedz',
        isAnswer1Correct: true,
        answer1State: false,
        answer2: 'ta odpowiedz jest RÓWNIEŻ POPRAWNA ',
        isAnswer2Correct: true,
        answer2State: false,
        answer3: 'to jest przykładowa odpowiedz',
        isAnswer3Correct: false,
        answer3State:false,
        answer4: 'to jest przykładowa odpowiedz',
        isAnswer4Correct: false,
        answer4State: false,
        whichAnswerChosen:''
      }
    ],
    videoBasedQuestions: [
      {
        videoURL: "http://www.youtube.com/embed/pDluLBUwvVo",
        question: "to jest przykładowe pytanie w oparciu o film powyżej",
        correctAnswer: 'to jest przykładowa POPRAWNA odpowiedz a',
        answer2: 'to jest przykładowa odpowiedz b',
        answer3: 'to jest przykładowa odpowiedz c',
        answer4: 'to jest przykładowa odpowiedz d',
        whichAnswerChosen:''
      }
    ],
    imageBasedQuestions: [
      {
        imageURL: "https://drive.google.com/file/d/0Bz7mEYNbcJUSNEs3WEtIbEd1QjA/preview",
        question: "to jest przykładowe pytanie w oparciu o obrazek powyżej",
        correctAnswer: 'to jest przykładowa POPRAWNA odpowiedz a',
        answer2: 'to jest przykładowa odpowiedz b',
        answer3: 'to jest przykładowa odpowiedz c',
        answer4: 'to jest przykładowa odpowiedz d',
        whichAnswerChosen:''
      }
    ],
    candidatesAnswers: {
      oneChoiceQuestions: [
        {
        candidatesAnswer: null,
        isAnswerCorrect: null,
        question: null
        }
      ],
      videoBasedQuestions: [
        {
        candidatesAnswer: null,
        isAnswerCorrect: null,
        question: null
        }
      ],
      imageBasedQuestions: [
        {
        candidatesAnswer: null,
        isAnswerCorrect: null,
        question: null
        }
      ]
    }

  },
  mutations: {
    nextQuestion (state) {
      state.count++
    },
    mapTheAnswers (state, chosenAnswers) {
      state.candidatesAnswers = chosenAnswers;
    },
    checkTheAnswers (state) {
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state);
      checkTheAnswers.checkImageBasedQuestionsAnswers(state);
    }
  },
  getters: {
    countUpQuestions (state) {
      let questionsStack = 0;
      state.oneChoiceQuestions.forEach(question => {
        questionsStack++;
      });
      state.multiChoiceQuestions.forEach(question => {
        questionsStack++;
      });
      state.videoBasedQuestions.forEach(question => {
        questionsStack++;
      });
      state.imageBasedQuestions.forEach(question => {
        questionsStack++;
      });
      return questionsStack;
    },
    displayRightAnswersOnResultsPage (state) {
      let rightAnswersCounter = 0;
      for (var i = 0; i < state.candidatesAnswers.oneChoiceQuestions.length; i++) {
        if (state.candidatesAnswers.oneChoiceQuestions[i].isAnswerCorrect === true) {
          rightAnswersCounter++;
        }
      }

      for (i = 0; i < state.candidatesAnswers.videoBasedQuestions.length; i++) {
        if (state.candidatesAnswers.videoBasedQuestions[i].isAnswerCorrect === true) {
          rightAnswersCounter++;
        }
      }

      for (i = 0; i < state.candidatesAnswers.imageBasedQuestions.length; i++) {
        if (state.candidatesAnswers.imageBasedQuestions[i].isAnswerCorrect === true) {
          rightAnswersCounter++;
        }
      }

      return rightAnswersCounter;
    }
  },
  actions: {
    anonymousSignup ({commit}) {
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
    },
    signUpOnStart ({commit}, payload) {
      firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
        .then( user => {
          console.log("zalogowałem się");
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
    },
    updateOCQsInDb ({commit}, payload) {
      let newOCQuestion = {
        question: payload.question,
        answer1: payload.answer1  ,
        isAnswer1Correct:  payload.isAnswer1Correct ,
        answer2: payload.answer2 ,
        isAnswer2Correct: payload.isAnswer2Correct ,
        answer3: payload.answer3 ,
        isAnswer3Correct: payload.isAnswer3Correct ,
        answer4: payload.answer4 ,
        isAnswer4Correct: payload.isAnswer4Correct
      }
      firebase.database().ref('oneChoiceQuestions').push(newOCQuestion)
      .catch((error) => {
          console.log(error)
      })
    },
    updateMCQsInDb ({commit}, payload) {
      let newMCQuestion = {
        question: payload.question,
        answer1: payload.answer1  ,
        answer1State: false,
        isAnswer1Correct:  payload.isAnswer1Correct ,
        answer2: payload.answer2 ,
        answer2State: false,
        isAnswer2Correct: payload.isAnswer2Correct ,
        answer3: payload.answer3 ,
        answer3State: false,
        isAnswer3Correct: payload.isAnswer3Correct ,
        answer4: payload.answer4 ,
        answer4State: false,
        isAnswer4Correct: payload.isAnswer4Correct
      }
      firebase.database().ref('multiChoiceQuestions').push(newMCQuestion)
      .catch((error) => {
          console.log(error)
      })
    },
    updateVBQsInDb ({commit}, payload) {
      let newVBQuestion = {
        videoURL: "http://www.youtube.com/embed/pDluLBUwvVo",
        question: payload.question,
        answer1: payload.answer1  ,
        isAnswer1Correct:  payload.isAnswer1Correct ,
        answer2: payload.answer2 ,
        isAnswer2Correct: payload.isAnswer2Correct ,
        answer3: payload.answer3 ,
        isAnswer3Correct: payload.isAnswer3Correct ,
        answer4: payload.answer4 ,
        isAnswer4Correct: payload.isAnswer4Correct
      }
      firebase.database().ref('videoBasedQuestions').push(newVBQuestion)
      .catch((error) => {
          console.log(error)
      })
    },
    updateIBQsInDb ({commit}, payload) {
      let newIBQuestion = {
        imageURL: "https://drive.google.com/file/d/0Bz7mEYNbcJUSNEs3WEtIbEd1QjA/preview",
        question: payload.question,
        answer1: payload.answer1  ,
        isAnswer1Correct:  payload.isAnswer1Correct ,
        answer2: payload.answer2 ,
        isAnswer2Correct: payload.isAnswer2Correct ,
        answer3: payload.answer3 ,
        isAnswer3Correct: payload.isAnswer3Correct ,
        answer4: payload.answer4 ,
        isAnswer4Correct: payload.isAnswer4Correct
      }
      firebase.database().ref('imageBasedQuestions').push(newIBQuestion)
      .catch((error) => {
          console.log(error)
      })
    }
  }
})
