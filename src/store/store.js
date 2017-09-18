import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase"
import fbApp from './../main.js'
import checkTheAnswers from './checkingAnswersMechanism'
import drawingQuestionsMechanism from './drawingQuestionsMechanism'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 1,
    categoryWiedzaOOrganizacji:{},
    categoryWychowanieMetodaMetodyki:{},
    categoryBezpieczenstwo:{},
    categoryIdeaIHistoria:{},

// -------------candidatesAnswers -----------------

    candidatesAnswers: {
      categoryWiedzaOOrganizacji:
      {
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
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: 'cos tam cos tam',
            isAnswerCorrect: null,
            question: 'bla bla bla'
          },
          {
            candidatesAnswer: 'cos tam cos tam 2',
            isAnswerCorrect: null,
            question: 'bla bla bla 2'
          }
        ]
      },
      categoryWychowanieMetodaMetodyki:
      {
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
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: "E, E, E !!",
            isAnswerCorrect: null,
            question: "Kuku, Kuku ! "
          }
        ]
      },
      categoryBezpieczenstwo:
      {
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
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: "Buuu !",
            isAnswerCorrect: null,
            question: "Kra! Kra ! Kra !"
          }
        ]
      },
      categoryIdeaIHistoria:
      {
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
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: "Sru sru sru !",
            isAnswerCorrect: null,
            question: "Łiii! Łiii!"
          }
        ]
      },
    },

    candidateDetails: {
      firstName: '',
      lastName: '',
      scoutGroup: '',
      userID:''
    }
  },
  mutations: {
    nextQuestion (state) {
      state.count++
    },
    mapTheFirstCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryWiedzaOOrganizacji = chosenAnswers;
    },
    mapTheSecondCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryWychowanieMetodaMetodyki = chosenAnswers;
    },
    mapTheThirdCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryBezpieczenstwo = chosenAnswers;
    },
    mapTheFourthCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryIdeaIHistoria = chosenAnswers;
    },
    checkTheAnswers (state) {
      // For each category, we check the answers via "checkingAnswersMechanism.js" file.
      // First Category
      let categoryOfQuestions = state.categoryWiedzaOOrganizacji;
      let candidatesAnswersInThisCat = state.candidatesAnswers.categoryWiedzaOOrganizacji;
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

      // Second Category
      categoryOfQuestions = state.categoryWychowanieMetodaMetodyki;
      candidatesAnswersInThisCat = state.candidatesAnswers.categoryWychowanieMetodaMetodyki;
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

      // Third Category
      categoryOfQuestions = state.categoryBezpieczenstwo;
      candidatesAnswersInThisCat = state.candidatesAnswers.categoryBezpieczenstwo;
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

      // Fourth Category
      // categoryOfQuestions = state.categoryIdeaIHistoria;
      // candidatesAnswersInThisCat = state.candidatesAnswers.categoryIdeaIHistoria;
      // checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      // checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

    },
    gradeTFQuestions({state}) {
      // This method is basically useless, the vuex store state is reactive to all changes at the componet side ... BUT the Vue.js dev panel doesn't show any updated changes until you commit or dispatch something :P
      console.log("gradeTFQuestions' executed:See now the updated Vue dev panel");
    },
    updateDBquestions(state) {
      var cat1 = state.categoryWiedzaOOrganizacji;
      firebase.database().ref('categoryWiedzaOOrganizacji').set(cat1)
      .then(() => {
        console.log('Done setting the thing in db');
      })

      var cat2 = state.categoryWychowanieMetodaMetodyki;
      firebase.database().ref('categoryWychowanieMetodaMetodyki').set(cat2)
      .then(() => {
        console.log('Done setting the thing in db');
      })

      var cat3 = state.categoryBezpieczenstwo;
      firebase.database().ref('categoryBezpieczenstwo').set(cat3)
      .then(() => {
        console.log('Done setting the thing in db');
      })

      var cat4 = state.categoryIdeaIHistoria;
      firebase.database().ref('categoryIdeaIHistoria').set(cat4)
      .then(() => {
        console.log('Done setting the thing in db');
      })
    },
    changeUserIdIfNull(state, uId){
      state.candidateDetails.userID = uId;
    },
    fetchTheCandidatesData(state, candidatesData){
      state.candidateDetails = candidatesData;
    },
    CreateNewExamQuestionStack(state, payload){
      state.categoryWiedzaOOrganizacji = payload.categoryWiedzaOOrganizacji;
      state.categoryWychowanieMetodaMetodyki = payload.categoryWychowanieMetodaMetodyki;
      state.categoryBezpieczenstwo = payload.categoryBezpieczenstwo;
    },
    fetchQuestionsWhenPageRefreshed(state, ongoingExamStructure) {
        if (!ongoingExamStructure) {
          console.log("Brak aktywnego egzaminu w db");
          console.log("Nie nadpisuję więc Vuexowego Store'a !");
          return
        }

        console.log('To mój fetch');
        console.log(ongoingExamStructure);
        // if (!state.categoryWiedzaOOrganizacji) {
          state.categoryWiedzaOOrganizacji = ongoingExamStructure.categoryWiedzaOOrganizacji
        // }
        // if (!state.categoryWychowanieMetodaMetodyki) {
          state.categoryWychowanieMetodaMetodyki = ongoingExamStructure.categoryWychowanieMetodaMetodyki
        // }
        // if (!state.categoryBezpieczenstwo) {
          state.categoryBezpieczenstwo = ongoingExamStructure.categoryBezpieczenstwo
        // }
      }
  },
  actions: {
    initializeCandidate({state}){
      // IDEA: here we initiale cand in the DB, meaning, we set the data the user gave us at the home page as the "currentActiveCandidate" node in Firebase DB. From now on we always have the data of the user at the exam session, even if we lose connection/refresh the page.
      let currentCandidate = state.candidateDetails;
      firebase.database().ref('currentActiveCandidate').set(currentCandidate);
    },
    fetchTheCandidateData({commit}){
      // IDEA: whenever we refresh the website, the data from db is pulled up which user was active before the refresh. This prevents loosing the data about the user in current exam session (e.g. in the middle of writing the test .. !)
      firebase.database().ref('currentActiveCandidate').once('value')
      .then((data) => {
        const object = data.val();
        const candidate = {
          firstName: object.firstName,
          lastName: object.lastName,
          scoutGroup: object.scoutGroup,
          userID: object.userID
        };
        commit('fetchTheCandidatesData', candidate);
      })
      .catch(
          (error) => {
            console.log(error);
          }
        )

        console.log('przechodzę przez fetching..');
    },
    deactivateCurrentCandidate(){
      // IDEA: Once we finish the exam session, we remove the reference of 'currentActiveCandidate' in the Firebase DB as the candidate has just finished the exam session and that reference is no longer needed
      firebase.database().ref('currentActiveCandidate').remove();
    },
    updateDBquestions({commit}){
      commit('updateDBquestions');
    },
    CreateNewExamQuestionStack({commit,state,dispatch}){

      async function fetchAllQuestionsFromDb (){
        function getCat1Qs (){
          return firebase.database()
          .ref('categoryWiedzaOOrganizacji')
          .once('value')
        }
        function getCat2Qs (){
          return firebase.database()
          .ref('categoryWychowanieMetodaMetodyki')
          .once('value')
        }
        function getCat3Qs (){
          return firebase.database()
          .ref('categoryBezpieczenstwo')
          .once('value')
        }

        let data1 = await getCat1Qs();
        let cat1Questions = data1.val();
        let data2  = await getCat2Qs();
        let cat2Questions = data2.val();
        let data3  = await getCat3Qs();
        let cat3Questions = data3.val();
        let payload = {cat1Questions,cat2Questions,cat3Questions};
        console.log(payload);
        return payload;
      }

      fetchAllQuestionsFromDb().then((dbQuestionsObject)=>{
        console.log('To poniżej pobrałem z FDB:');
        console.log(dbQuestionsObject);

        var randomisedQuestionStack = drawingQuestionsMechanism.drawTheQuestions(dbQuestionsObject);

        dispatch('uploadActiveVerOfExamToDb',randomisedQuestionStack);

        commit('CreateNewExamQuestionStack', randomisedQuestionStack );
      })
    },
    fetchQuestionsWhenPageRefreshed({commit}){
      firebase.database()
      .ref('currentActiveExamStructure')
      .once('value')
      .then((data) => {
        let ongoingExamStructure = data.val();
        commit('fetchQuestionsWhenPageRefreshed',ongoingExamStructure);
      })
    },
    uploadActiveVerOfExamToDb({state, commit}, currentExamStructure) {
      firebase.database()
      .ref('currentActiveExamStructure')
      .set(currentExamStructure);
    },
    deactivateCurrentExamVersion(){
      firebase.database().ref('currentActiveExamStructure').remove();
    },
    uploadCandsAnswersToDb ({commit, state}) {
      let userId = state.candidateDetails.userID;
      if (userId == '' || userId == null){
        var num = Math.floor((Math.random() * 2000) + 1);
        userId = `NotNamedCandidate${num}`;
        commit('changeUserIdIfNull', userId);
      }

      // console.log(userId);
      let candidatesTest = state.candidatesAnswers;
      firebase.database()
      .ref(`candidatesTestsStack/${userId}`)
      .set(candidatesTest);
    },
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
    }
  }
})
