<template>
  <div>

    <v-toolbar extended class="cyan" dark>
      <v-toolbar-title slot="extension" class="display-2 ">
        Panel sprawdzającego
      </v-toolbar-title>
    </v-toolbar>

    <!--  TEMP: this is temporary solution for the case when  user refreshes tne page during the grading process     -->
    <div v-if="refreshedDuringGrading">
      <v-dialog v-model="refreshedDuringGrading" lazy absolute>
        <v-card>
          <v-card-title>
            <div class="headline">BŁĄD! Odświeżyłeś stronę w czasie sprawdzania egzaminu</div>
          </v-card-title>
          <v-card-text>Aby kontynuować, należy cofnąć do poprzedniego widoku a następnie ponownie kliknąć "zakończ test" </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click="refreshedDuringGrading = false">zamknij</v-btn>
            <!--FIXME: remember to change  refreshedDuringGrading to "dialog" here and on the top. -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div v-else>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <h3 class="pt-2">Wyniki w pytaniach jednokrotnego wyboru</h3>
          </v-flex>
        </v-layout>

        <v-card>
          <v-card-text>
            <v-layout class="my-1" align-center>
              <v-flex xs12 md6>
                <h4>Liczba poprawnych odpowiedzi </h4>
              </v-flex>
              <v-flex xs12 md6>
                <h4>
                  {{oneChoiceQuestionsResults}} z {{oneChoiceQuestionsTotalNum}}
                </h4>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

        <v-layout v-if="thereAreMCQuestionsInTest">
          <v-flex xs12>
            <h3 class="pt-5">Wyniki w pytaniach wielokrotnego wyboru</h3>
          </v-flex>
        </v-layout>

        <v-layout v-else>
          <v-flex xs12>
            <h3 class="pt-5">W tym teście brak było pytań wielokrotnego wyboru, kontynuuj do pytań opisowych</h3>
          </v-flex>
        </v-layout>

        <v-card v-if="thereAreMCQuestionsInTest">
          <v-card-text>
            <v-layout class="my-1" align-center>
              <v-flex xs12 md6>
                <h4>Pytań wielokrotnego wyboru</h4>
              </v-flex>
              <v-flex xs12 md6>
                <h4> {{MCQsTotalNumber}}</h4>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn block round flat info @click="MCQestionsVisible = !MCQestionsVisible">
              <span v-if="!MCQestionsVisible"> Oceń odpowiedzi </span>
              <span v-if="MCQestionsVisible"> Zamknij panel </span>
            </v-btn>
          </v-card-actions>
        </v-card>


        <v-expansion-panel expand v-if="thereAreMCQuestionsInTest && MCQestionsVisible">
          <v-expansion-panel-content v-for="(category, key, index)  in allCandidatesAnswers" :key="index">
            <div slot="header" v-if="category.multiChoiceQuestions && category.multiChoiceQuestions.length > 0  "> {{multiChoiceQuestionsPanel[index]}} </div>

            <v-card v-for="(question,index) in category.multiChoiceQuestions" :key="question.question" v-if="category.multiChoiceQuestions">
              <v-card-title class="brown lighten-1 white--text pb-0">
                <h5>
                 Pytanie {{index+1}}.
                </h5>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                  <v-flex>
                    <p class="text-xs-center">
                      {{question.question}}
                    </p>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout justify-space-around class="mt-2">
                  <v-flex xs5>
                    <h5 class="text-xs-center">Poprawne odpowiedzi:</h5>
                    <v-layout v-for="rightAnswer in question.correctAnswers" :key="rightAnswer" v-if="question.correctAnswers">
                      - {{rightAnswer}}
                    </v-layout>
                    <v-layout v-else>
                      Brak poprawnych odpowiedzi!
                    </v-layout>
                    <!-- Below is once you implement the wrong questions as well... (add 1 field in all 4 comps) -->
                    <!-- <v-layout v-for="wrongAnswer in question.correctAnswers" :key="wrongAnswer" v-if="question.incorrectAnswers">{{wrongAnswer}} </v-layout> -->
                  </v-flex>
                  <v-flex xs5>
                    <h5 class="text-xs-center">Odpowiedzi próbanta:</h5>
                    <v-layout v-for="candidatesAnswers in question.whichAnswersChosen" :key="candidatesAnswers" v-if="question.whichAnswersChosen && question.whichAnswersChosen.length > 0">
                      - {{candidatesAnswers}}
                    </v-layout>
                    <v-layout justify-center v-if="!question.whichAnswersChosen ||  question.whichAnswersChosen.length == 0">
                      Żadna
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>

                <v-layout class="mt-1 " justify-center>
                  <h5 class="teal--text">Waga pytania: {{question.difficultyLevel}} </h5>
                </v-layout>

                <v-layout justify-center="">
                  <p >Oceń odpowiedź:</p>
                </v-layout>
                

                <v-layout justify-center>
                    <v-flex sm10 offset-sm2>
                  <v-radio-group v-model="question.questionAnswerScore" row>
                      <v-radio v-for="mark in question.difficultyLevel+1" :color='MCQRadioBtnColour(question,question.questionAnswerScore)' :key="mark" :label="(mark-1).toString()" :value="mark-1"></v-radio>
                  </v-radio-group>
                    </v-flex>
                </v-layout>
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>


        <hr class="mt-4">
        <v-divider></v-divider>
        <hr>

        <h3 class="mt-4"> Sprawdź poprawność pytań otwartych</h3>

        <v-expansion-panel expand>
          <v-expansion-panel-content v-for="(category,key) in expansionPanels" :key="key">
            <div slot="header">{{category[0].categoryTitle}}</div>

            <v-layout class="mt-4" v-if="category.length == 1">
              <v-flex>
                <v-card>
                  <v-card-title class="justify-center text-xs-center">
                    <h4 class="text-xs-center">W tym teście nie było pytań opisowych dla danej kategorii</h4>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>

            <v-layout class="mt-4 " v-for="(tFQuestion,index) in category" :key="index" v-if="tFQuestion.question != undefined">
              <v-flex>
                <v-card hover :class="comProp(tFQuestion)" class=" white--text" :ref='key'>
                  <v-card-text primary-title class="pb-0">
                    <v-layout row v-if="tFQuestion.imageURLForThisTest">
                      <v-flex>
                        <img :src="tFQuestion.imageURLForThisTest" alt="" width="100%">
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex>
                        <h5>
                          Pytanie: {{tFQuestion.question}}
                        </h5>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-text-field :name="index" label="Tak odpowiedział kandydat:" textarea disabled dark v-model="tFQuestion.candidatesAnswer"></v-text-field>
                    <v-btn class="elevation-8 blue accent-2 white--text" block @click="showNotesField(tFQuestion)">
                      <span> Dodaj własne uwagi</span>
                    </v-btn>
                    <!-- Text field for examiner's extra notes/thoughts -->
                    <v-text-field v-show='tFQuestion.examinersNotes!=""' label="Uwagi sprawdzającego" v-model="tFQuestion.examinersNotes"
                      textarea dark></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout row wrap justify-space-between>
                      <v-flex class="text-xs-center">
                        <v-btn class="elevation-8 red accent-2 white--text" round @click="makeAnswerWrong(tFQuestion)">
                          Zła odpowiedź
                          <v-icon right medium dark>thumb_down</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex class="text-xs-center">
                        <v-btn class="elevation-8 accent-3 " round @click="makeAnswerNull(tFQuestion)">
                          Trudno ocenić..
                          <v-icon right medium dark>thumbs_up_down</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex class="text-xs-center">
                        <v-btn class="elevation-8 light-green accent-3 white--text" round @click="makeAnswerCorrect(tFQuestion)">
                          dobra odpowiedź
                          <v-icon right medium dark>thumb_up</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>
      <v-container>
        <v-flex>
          <v-btn primary round @click="finishGradingTheTest">
            Zakończ sprawdzanie
          </v-btn>
        </v-flex>
      </v-container>
    </div>
    <v-snackbar :timeout="timeout" top='top' v-model="snackbar">
      Sprawdzono test !
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        snackbar: false,
        refreshedDuringGrading: false,
        dialog: false,
        timeout: 1300,
        MCQestionsVisible: false,
        multiChoiceQuestionsPanel: [
          "Dział 1.: Wiedza o organizacji",
          "Dział 2.: Wychowanie. Metoda i metodyki harcerskie",
          "Dział 3.: Bezpieczeństwo",
          "Dział 4.: Idea i historia"
        ],
        expansionPanels: {
          categoryWiedzaOOrganizacji: [{
            categoryTitle: "Dział 1.: Wiedza o organizacji"
          }],
          categoryWychowanieMetodaMetodyki: [{
            categoryTitle: "Dział 2.: Wychowanie. Metoda i metodyki harcerskie"
          }],
          categoryBezpieczenstwo: [{
            categoryTitle: "Dział 3.: Bezpieczeństwo"
          }],
          categoryIdeaIHistoria: [{
            categoryTitle: "Dział 4.: Idea i historia"
          }]
        }
      }
    },
    methods: {
      logging() {
        console.log(this.refreshedDuringGrading);
      },
      MCQRadioBtnColour(question,grade){
        console.log("jestem w MCQRadioBtnColour:");
        console.log("question.difficultyLevel:");
        console.log(question.difficultyLevel);        
        console.log("grade:");
        console.log(grade);

        if (grade/question.difficultyLevel > 0.66){
          question.isAnswerCorrect = true;
          return 'green accent-4'
        }else if (grade/question.difficultyLevel >= 0.5){
          question.isAnswerCorrect = true;
          return 'light-green lighten-1'
        }else if(grade/question.difficultyLevel >= 0.3){
          question.isAnswerCorrect = -1;
          return 'deep-orange lighten-1'
        }else{
          question.isAnswerCorrect = false;
          return 'red'
        }
      },
      showNotesField(candsAnswer) {
        if (!candsAnswer.examinersNotes) {
          candsAnswer.examinersNotes = ' ';
        }
      },
      makeAnswerWrong(candsAnswer) {
        candsAnswer.isAnswerCorrect = false;
        console.log(candsAnswer);
      },
      makeAnswerCorrect(candsAnswer) {
        candsAnswer.isAnswerCorrect = true;
        console.log(candsAnswer);
      },
      makeAnswerNull(candsAnswer) {
        candsAnswer.isAnswerCorrect = -1;
        console.log(candsAnswer);
      },
      comProp(tFQuestion) {
        if (tFQuestion.isAnswerCorrect == null) {
          return 'blue-grey'
        } else if (tFQuestion.isAnswerCorrect == false) {
          return 'red'
        } else if (tFQuestion.isAnswerCorrect == true) {
          return 'green'
        } else if (tFQuestion.isAnswerCorrect == -1) {
          return 'grey lighten-1'
        }
      },
      finishGradingTheTest() {
        this.snackbar = true;
        this.$store.dispatch('uploadCandsAnswersToDb');
        this.$store.dispatch('deactivateCurrentExamVersion');
        setTimeout(() => {
          this.$router.push('/results-page');
        }, 1400);
        // BELOW is only for updating view in Vue dev panel
        this.$store.commit('gradeTFQuestions');
      }
    },
    computed: {
      thereAreMCQuestionsInTest() {
        let test = this.allCandidatesAnswers;
        let counter = 0;
        for (const cat in test) {
          if (test[cat].multiChoiceQuestions && test[cat].multiChoiceQuestions.length > 0) {
            counter++;
          }
        }

        if (counter > 0) {
          return true;
        } else {
          return false;
        }
      },
      formatExpansionPanelTitleCorrectly(key) {
        console.log(key);
        return key.toString();
      },
      allCandidatesAnswers() {
        return this.$store.state.candidatesAnswers;
      },
      candidatesAnswersInCategoryWiedzaOOrganizacji() {
        return this.$store.state.candidatesAnswers.categoryWiedzaOOrganizacji;
      },
      candidatesAnswersInCategoryWychowanieMetodaMetodyki() {
        return this.$store.state.candidatesAnswers.categoryWychowanieMetodaMetodyki;
      },
      candidatesAnswersInCategoryBezpieczenstwo() {
        return this.$store.state.candidatesAnswers.categoryBezpieczenstwo;
      },
      candidatesAnswersInCategoryIdeaIHistoria() {
        return this.$store.state.candidatesAnswers.categoryIdeaIHistoria;
      },
      MCQsTotalNumber(){
        return this.$store.state.allMCQuestions;
      },
      oneChoiceQuestionsResults() {
        return this.$store.getters.forExaminersDashboard1;
      },
      oneChoiceQuestionsTotalNum() {
        return this.$store.getters.forExaminersDashboard2;
      }
    },
    created() {
      // At the very beginning we want to display count the number of the MCQs to be displayed in the stats in UI.
      this.$store.commit('countMCQsInTheCurrentTest');

      //do something after creating vue instance
      // this.totalNumberOfQuestions = this.$store.getters.countUpQuestions;
      // if (this.$store.getters.displayRightAnswersOnResultsPage != undefined) {
      //   this.numberOfRightAnswers = this.$store.getters.displayRightAnswersOnResultsPage;
      // }

      // TEMP: this is temporary solution for case when the user refreshes test during the grading process..
      // NOTE: I presume here that if the first category of Qs is nullable, it means that the page is refreshed (rember, we're in the created lifecycle hook when the data from firebase isn't able to be fetched yet )
      function isEmpty(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop))
            return false;
        }
        return true;
      }
      if (isEmpty(this.$store.state.categoryWiedzaOOrganizacji)) {

        this.refreshedDuringGrading = true;
        this.dialog = true;
      }

      this.$store.dispatch("fetchTheCandidateData");

      // NOTE: Below we "attach" all the text field answers from all the categories of questions to the "expansionPanels" variable - so that it displays in a way it does on the website right now using expansion Panel Vuetify UI component
      var cat1TextFieldAnswers = this.candidatesAnswersInCategoryWiedzaOOrganizacji.textFieldQuestions;

      var cat1ImageBasedAnswers =
        this.candidatesAnswersInCategoryWiedzaOOrganizacji.imageBasedQuestions;

      cat1TextFieldAnswers.forEach(object => {
        this.expansionPanels.categoryWiedzaOOrganizacji.push(object);
      })
      cat1ImageBasedAnswers.forEach(object => {
        this.expansionPanels.categoryWiedzaOOrganizacji.push(object);
      })
      // console.log(this.expansionPanels.categoryWiedzaOOrganizacji);


      var cat2TextFieldAnswers = this.candidatesAnswersInCategoryWychowanieMetodaMetodyki.textFieldQuestions;
      var cat2ImageBasedAnswers =
        this.candidatesAnswersInCategoryWychowanieMetodaMetodyki.imageBasedQuestions;
      cat2TextFieldAnswers.forEach(object => {
        this.expansionPanels.categoryWychowanieMetodaMetodyki.push(object);
      })
      // console.log(this.expansionPanels.categoryWychowanieMetodaMetodyki);
      cat2ImageBasedAnswers.forEach(object => {
        this.expansionPanels.categoryWychowanieMetodaMetodyki.push(object);
      })

      var cat3TextFieldAnswers = this.candidatesAnswersInCategoryBezpieczenstwo.textFieldQuestions;

      var cat3ImageBasedAnswers = this.candidatesAnswersInCategoryBezpieczenstwo.imageBasedQuestions;

      cat3TextFieldAnswers.forEach(object => {
        this.expansionPanels.categoryBezpieczenstwo.push(object);
      })
      cat3ImageBasedAnswers.forEach(object => {
        this.expansionPanels.categoryBezpieczenstwo.push(object);
      })
      // console.log(this.expansionPanels.categoryBezpieczenstwo);

      var cat4TextFieldAnswers = this.candidatesAnswersInCategoryIdeaIHistoria.textFieldQuestions;
      var cat4ImageBasedAnswers = this.candidatesAnswersInCategoryIdeaIHistoria.imageBasedQuestions;

      cat4TextFieldAnswers.forEach(object => {
        this.expansionPanels.categoryIdeaIHistoria.push(object);
      })
      cat4ImageBasedAnswers.forEach(object => {
        this.expansionPanels.categoryIdeaIHistoria.push(object);
      })
      // console.log(this.expansionPanels.categoryIdeaIHistoria);


      
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  v-card {
    margin-top: 50%
  }

</style>
