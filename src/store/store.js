import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase"
import fbApp from './../main.js'
import checkTheAnswers from './checkingAnswersMechanism'
import drawingQuestionsMechanism from './drawingQuestionsMechanism'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    fatalError: false,
    refreshedDuringGrading: false,
    loadingState: false,
    count: 1,
    adminAccount:{
      id: null
    },
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
            whichAnswerChosen: null,
            correctAnswer: null,
            question: null
          },
          {
            whichAnswerChosen: "bla bla dobrze !",
            correctAnswer: "bla bla dobrze !",
            question: "to jest moje pytanie"
          },
          {
            whichAnswerChosen: "bla bla zle !",
            correctAnswer: "bla bla !",
            question: "to jest moje pytanie 2 "
          }
        ],
        videoBasedQuestions: [
          {
            whichAnswerChosen: null,
            correctAnswer: null,
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
            candidatesAnswer: 'brak odpowiedzi',
            isAnswerCorrect: null,
            question: 'Błąd: to pytanie powinno się pojawić tylko gdy użytkownik nie zapisze swoich pytań w tej kategorii'
          },
          {
            candidatesAnswer: 'brak odpowiedzi',
            isAnswerCorrect: null,
            question: 'Błąd: to pytanie powinno się pojawić tylko gdy użytkownik nie zapisze swoich pytań w tej kategorii'
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
            candidatesAnswer: 'brak odpowiedzi',
            isAnswerCorrect: null,
            question: 'Błąd: to pytanie powinno się pojawić tylko gdy użytkownik nie zapisze swoich pytań w tej kategorii'
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
            candidatesAnswer: 'brak odpowiedzi',
            isAnswerCorrect: null,
            question: 'Błąd: to pytanie powinno się pojawić tylko gdy użytkownik nie zapisze swoich pytań w tej kategorii'
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
            candidatesAnswer: 'brak odpowiedzi',
            isAnswerCorrect: null,
            question: 'Błąd: to pytanie powinno się pojawić tylko gdy użytkownik nie zapisze swoich pytań w tej kategorii'
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
  getters: {
    forExaminersDashboard1(state) {
      let counter = 0;
      function countUpEachCat (category){
        if (category.oneChoiceQuestions) {
          category.oneChoiceQuestions.forEach((questionObj)=>{
            if (questionObj.whichAnswerChosen == questionObj.correctAnswer) {
              counter++;
            }
          })
        }
      }
      // NOTE: we only check for the first one, if the first is empty the rest will surely be as well (it means that the data has failed to be fetched from db)
      if (state.categoryWiedzaOOrganizacji != null) {
        countUpEachCat(state.categoryWiedzaOOrganizacji);
        countUpEachCat(state.categoryWychowanieMetodaMetodyki);
        countUpEachCat(state.categoryBezpieczenstwo);
        countUpEachCat(state.categoryIdeaIHistoria);
      }
      console.log("-------jestem w getters:forExaminersDashboard1: --------");
      console.log('Tyle policzyłem poprawnych odp. jedn. wyboru');
      console.log(counter);
      return counter;
    },
    forExaminersDashboard2(state){
      let TotalNum = 0;
      if (state.categoryWiedzaOOrganizacji == null) {
        return 0;
      }
      if (state.categoryWiedzaOOrganizacji.oneChoiceQuestions) {
        TotalNum += state.categoryWiedzaOOrganizacji.oneChoiceQuestions.length;
      }
      if (state.categoryWychowanieMetodaMetodyki.oneChoiceQuestions) {
        TotalNum += state.categoryWychowanieMetodaMetodyki.oneChoiceQuestions.length;
      }
      if (state.categoryBezpieczenstwo.oneChoiceQuestions) {
        TotalNum += state.categoryBezpieczenstwo.oneChoiceQuestions.length;
      }
      if (state.categoryIdeaIHistoria.oneChoiceQuestions) {
        TotalNum += state.categoryIdeaIHistoria.oneChoiceQuestions.length;
      }
      return TotalNum;
    }
  },
  mutations: {
    changeLoadingState(state, boolStatus){
      state.loadingState = boolStatus;
    },
    setAdmin (state, payload) {
      state.adminAccount = payload;
    },
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
    },
    fetchTheFinishedTest(state,fetchedTest){
      if (fetchedTest.categoryWiedzaOOrganizacji) {
        state.candidatesAnswers.categoryWiedzaOOrganizacji = fetchedTest.categoryWiedzaOOrganizacji;
      }
      if (fetchedTest.categoryWychowanieMetodaMetodyki) {
        state.candidatesAnswers.categoryWychowanieMetodaMetodyki = fetchedTest.categoryWychowanieMetodaMetodyki;
      }
      if (fetchedTest.categoryBezpieczenstwo) {
        state.candidatesAnswers.categoryBezpieczenstwo = fetchedTest.categoryBezpieczenstwo;
      }
      if (fetchedTest.categoryIdeaIHistoria) {
        state.candidatesAnswers.categoryIdeaIHistoria = fetchedTest.categoryIdeaIHistoria;
      }
    },
    endTheExam(state){
      state.candidateDetails.firstName = '';
      state.candidateDetails.lastName = '';
      state.candidateDetails.scoutGroup = '';
      state.candidateDetails.userID = '';
      state.categoryWiedzaOOrganizacji = {};
      state.categoryWychowanieMetodaMetodyki = {};
      state.categoryBezpieczenstwo = {};
      state.categoryIdeaIHistoria = {};
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
      // TODO: improve this action by using firebase auth cookies instead of inefficient "currentActiveCandidate" db field
      firebase.database().ref('currentActiveCandidate').once('value')
      .then((data) => {
        const object = data.val();
        if (object) {
          const candidate = {
            firstName: object.firstName,
            lastName: object.lastName,
            scoutGroup: object.scoutGroup,
            userID: object.userID
          };
          commit('fetchTheCandidatesData', candidate);
        }
        else {
          console.log("Brak aktywnego kandydata");
        }
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
      // TODO: improve the way data is structured in database; allow multiple collections/JSONs in the "currentActiveExamStructure" by assigning them an ID. Append that ID field to the user taking the exam at their db field.
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
    updateCurrentExamAnswers({state}, whichCat) {
      // IDEA: whenever user clicks "save answers in this category (in PL: 'zapisz odpowiedzi z tej kategorii') we want to update the 'currentActiveExamStructure' node in firebase db with the answers (thus we send whole current state of each of the vuex question categories states - they contain the answer parameter thanks to dynamic v-model binding)  ... So that when the user refreshes the page (which automatically triggers the fetching of the current exam from db) the fetched questions cointain the answers given by the user before refreshing"
      if (whichCat == 'categoryWiedzaOOrganizacji') {
        var stateCat = state.categoryWiedzaOOrganizacji;
        firebase.database().ref('currentActiveExamStructure/' + whichCat).set(stateCat);
      }
      else if (whichCat == 'categoryWychowanieMetodaMetodyki') {
        var stateCat = state.categoryWychowanieMetodaMetodyki;
        firebase.database().ref('currentActiveExamStructure/' + whichCat).set(stateCat);
      }
      else if (whichCat == 'categoryBezpieczenstwo') {
        var stateCat = state.categoryBezpieczenstwo;
        firebase.database().ref('currentActiveExamStructure/' + whichCat).set(stateCat);
      }
      else if (whichCat == 'categoryIdeaIHistoria') {
        console.log("FOR NOW I DO NOTHING FOR THIS CATEGORY - ONCE KSI PROVIDES QUESTIONS FOR THIS CAT, YOU'LL NEED TO UPDATE ME");
        // var stateCat = state.categoryIdeaIHistoria;
        // firebase.database().ref('currentActiveExamStructure/' + whichCat).set(stateCat);
      }
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
      // NOTE: unused action, TODO: revalidate if needed after fully finishing client's (KSI) demands concerning the functionality.
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
    },
    signUpOnStart ({commit}, payload) {
      // NOTE: This was a previous, temporary, approach - every visitor of the page was automatically signed in as the admin of the test. TODO: revalidate if action is needed.
      firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then( user => {
        console.log("zalogowałem się");
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
    },
    signInAdmin ({commit, state}, payload) {
      commit('changeLoadingState', true);
      return firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        admin => {
          const newAdmin = {
            id: admin.uid,
          }
          commit('setAdmin', newAdmin);
          commit('changeLoadingState', false);
          return true;
        }
      )
      .catch(
        error => {
          console.log(error);
          commit('changeLoadingState', false);
          return false;
        }
      )
    },
    fetchTheFinishedTest({commit,state,dispatch, getters}){
      firebase.database()
      .ref('currentActiveCandidate/userID')
      .once('value')
      .then((userIDSnaphot) => {
        let theId = userIDSnaphot.val();
        console.log('to jest id kandydata:');
        console.log(theId);

        if (theId !== '') {
          console.log("przeszedłem przez condition");
          firebase.database()
          .ref('candidatesTestsStack/' + theId)
          .once('value')
          .then((fetchedTestSnapshot) => {
            let fetchedTest = fetchedTestSnapshot.val();
            console.log("znalazłem test, oto on:");
            console.log(fetchedTest);
            commit('fetchTheFinishedTest', fetchedTest);
          })
          .catch((e) => {
            console.log(e);
          })
        }
        else {
          console.log('ERROR.User ID is null');
        }

      })





    },
    numberOfCorrectAnswers({state}, whichCatToSumUp) {
      let totalNum = 0;
      function sumItUp (category) {
        let sum = 0;
        // NOTE: this was older approach when I didn't realise my short answer questions will also have isAnswerCorrect parameter
        // function sumTheShortAnswers (typeOfQuestions){
        //   var amount = typeOfQuestions.filter((questionObj) => {
        //     return questionObj.correctAnswer == questionObj.whichAnswerChosen && questionObj.whichAnswerChosen != null;
        //   })
        //   return amount.length;
        // }
        function sumThisTypeOfAnswers (typeOfQuestions){
          var amount = typeOfQuestions.filter((questionObj) => {
            return questionObj.isAnswerCorrect === true;
          })
          return amount.length;
        }
        if (category.oneChoiceQuestions) {
          sum += sumThisTypeOfAnswers(category.oneChoiceQuestions);
        }
        if (category.videoBasedQuestions) {
          sum += sumThisTypeOfAnswers(category.videoBasedQuestions);
        }
        if (category.imageBasedQuestions) {
          sum += sumThisTypeOfAnswers(category.imageBasedQuestions)
        }
        if (category.textFieldQuestions) {
          sum += sumThisTypeOfAnswers(category.textFieldQuestions)
        }

        return sum
      }

      if (whichCatToSumUp === 'all') {
        if (state.candidatesAnswers.categoryWiedzaOOrganizacji) {
          totalNum += sumItUp(state.candidatesAnswers.categoryWiedzaOOrganizacji);
        }
        if (state.candidatesAnswers.categoryWychowanieMetodaMetodyki) {
          totalNum += sumItUp(state.candidatesAnswers.categoryWychowanieMetodaMetodyki);
        }
        if (state.candidatesAnswers.categoryBezpieczenstwo) {
          totalNum += sumItUp(state.candidatesAnswers.categoryBezpieczenstwo);
        }
        if (state.candidatesAnswers.categoryIdeaIHistoria) {
          totalNum += sumItUp(state.candidatesAnswers.categoryIdeaIHistoria);
        }
      }
      else if (whichCatToSumUp === 'firstCat') {
        if (state.candidatesAnswers.categoryWiedzaOOrganizacji) {
          totalNum += sumItUp(state.candidatesAnswers.categoryWiedzaOOrganizacji);
        }
      }
      else if (whichCatToSumUp === 'secondCat') {
        if (state.candidatesAnswers.categoryWychowanieMetodaMetodyki) {
          totalNum += sumItUp(state.candidatesAnswers.categoryWychowanieMetodaMetodyki);
        }
      }
      else if (whichCatToSumUp === 'thirdCat') {
        if (state.candidatesAnswers.categoryBezpieczenstwo) {
          totalNum += sumItUp(state.candidatesAnswers.categoryBezpieczenstwo);
        }
      }
      else if (whichCatToSumUp === 'fourthCat') {
        if (state.candidatesAnswers.categoryIdeaIHistoria) {
          totalNum += sumItUp(state.candidatesAnswers.categoryIdeaIHistoria);
        }
      }
      // console.log(`sumuję odpowiedzi z kategorii: ${whichCatToSumUp}`);
      // console.log(totalNum);
      return totalNum;
    },
    totalNumberOfQuestion({state}, whichCatToSumUp) {
      let totalNum = 0;
      function sumItUp (category) {
        let sum = 0;
        if (category.oneChoiceQuestions) {
          sum += category.oneChoiceQuestions.length;
        }
        if (category.videoBasedQuestions) {
          sum += category.videoBasedQuestions.length;
        }
        if (category.imageBasedQuestions) {
          sum += category.imageBasedQuestions.length;
        }
        if (category.textFieldQuestions) {
          sum += category.textFieldQuestions.length;
        }
        return sum
      }

      if (whichCatToSumUp === 'all') {
        if (state.categoryWiedzaOOrganizacji) {
          totalNum += sumItUp(state.categoryWiedzaOOrganizacji);
        }
        if (state.categoryWychowanieMetodaMetodyki) {
          totalNum += sumItUp(state.categoryWychowanieMetodaMetodyki);
        }
        if (state.categoryBezpieczenstwo) {
          totalNum += sumItUp(state.categoryBezpieczenstwo);
        }
        if (state.categoryIdeaIHistoria) {
          totalNum += sumItUp(state.categoryIdeaIHistoria);
        }
      }
      else if (whichCatToSumUp === 'firstCat') {
        if (state.categoryWiedzaOOrganizacji) {
          totalNum += sumItUp(state.categoryWiedzaOOrganizacji);
        }
      }
      else if (whichCatToSumUp === 'secondCat') {
        if (state.categoryWychowanieMetodaMetodyki) {
          totalNum += sumItUp(state.categoryWychowanieMetodaMetodyki);
        }
      }
      else if (whichCatToSumUp === 'thirdCat') {
        if (state.categoryBezpieczenstwo) {
          totalNum += sumItUp(state.categoryBezpieczenstwo);
        }
      }
      else if (whichCatToSumUp === 'fourthCat') {
        if (state.categoryIdeaIHistoria) {
          totalNum += sumItUp(state.categoryIdeaIHistoria);
        }
      }

      return totalNum;
    }
  }
})
