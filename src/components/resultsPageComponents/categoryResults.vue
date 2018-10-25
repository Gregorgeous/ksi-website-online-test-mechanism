<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h4>{{categoryTitle}}</h4>
        <h5>
          Wynik : {{displayNumOfCorrectAnswers}} z {{displayTotalNumOfQuestions}}
        </h5>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <p class="text-xs-left" style="text-decoration:underline">Pytania jednokrotnego wyboru</p>
        <v-layout row wrap v-if="categoryResults.oneChoiceQuestions">
          <v-flex xs12 sm6 v-if="categoryResults.oneChoiceQuestions.length > 0 ">
            <p class="green--text"> Poprawne odpowiedzi</p>
            <v-expansion-panel inset>
              <v-expansion-panel-content v-for="(questionObj,i) in categoryResults.oneChoiceQuestions" :key="i" v-if="questionObj.isAnswerCorrect == true">
                <div slot="header">{{questionObj.question}}</div>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <v-layout>
                      Pytanie:
                    </v-layout>
                    <v-divider></v-divider>
                    <v-container>
                      <v-layout>
                        {{questionObj.question}}
                      </v-layout>
                    </v-container>
                    <v-divider></v-divider>
                    <v-layout>
                      Odpowiedź:
                    </v-layout>
                    <v-container>
                      <v-layout>
                        {{questionObj.candidatesAnswer}}
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
          <v-flex xs12 sm6 v-if="categoryResults.oneChoiceQuestions.length > 0 ">
            <p class="red--text"> Błędne odpowiedzi</p>
            <v-expansion-panel inset>
              <v-expansion-panel-content v-for="(questionObj,i) in categoryResults.oneChoiceQuestions" :key="i" v-if="questionObj.isAnswerCorrect == false">
                <div slot="header">{{questionObj.question}}</div>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <v-layout>
                      Pytanie:
                    </v-layout>
                    <v-divider></v-divider>
                    <v-container>
                      <v-layout>
                        {{questionObj.question}}
                      </v-layout>
                    </v-container>
                    <v-divider></v-divider>
                    <v-layout>
                      Odpowiedź:
                    </v-layout>
                    <v-container>
                      <v-layout>
                        {{questionObj.candidatesAnswer}}
                      </v-layout>
                    </v-container>
                    <v-divider></v-divider>
                    <v-layout>
                      Poprawna odpowiedź
                    </v-layout>
                    <v-container>
                      <v-layout>
                        {{questionObj.correctAnswer}}
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
        <v-layout v-else>
          <v-flex>
            <p>Brak pytań jednokrotnego wyboru w tej kategorii</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- MULTI-CHOICE QUESTIONS RESULTS LAYER  -->
    <v-layout>
      <v-flex>
        <p class="text-xs-center" style="text-decoration:underline">Pytania wielokrotnego wyboru</p>

        <v-layout row wrap v-if="!categoryResults.multiChoiceQuestions">
          <v-flex>
            <p>Brak pytań w tej kategorii</p>
          </v-flex>
        </v-layout>


        <v-layout v-else>
          <v-expansion-panel expand>
            <v-expansion-panel-content :class="comProp(questionObj)" v-for="(questionObj,index) in categoryResults.multiChoiceQuestions"
              :key="index">
              <div slot="header">{{questionObj.question}}</div>

              <v-layout>
                <v-flex>
                  <v-card hover :class="comProp(questionObj)" class=" white--text">
                    <v-card-text primary-title class="pb-0">
                      <v-layout row>
                        <v-flex>
                          <p>
                            Pytanie: {{questionObj.question}}
                          </p>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>

                      <v-layout justify-space-around class="mt-2">
                        <v-flex xs5>
                          <h5 class="text-xs-center">Poprawne odpowiedzi:</h5>
                          <v-layout v-for="rightAnswer in questionObj.correctAnswers" :key="rightAnswer" v-if="questionObj.correctAnswers">
                            - {{rightAnswer}}
                          </v-layout>
                          <v-layout v-else>
                            Brak poprawnych odpowiedzi!
                          </v-layout>
                          <!-- Below is once you implement the wrong questionObjs as well... (add 1 field in all 4 comps) -->
                          <!-- <v-layout v-for="wrongAnswer in questionObj.correctAnswers" :key="wrongAnswer" v-if="questionObj.incorrectAnswers">{{wrongAnswer}} </v-layout> -->
                        </v-flex>
                        <v-flex xs5>
                          <h5 class="text-xs-center">Odpowiedzi próbanta:</h5>
                          <v-layout v-for="candidatesAnswers in questionObj.whichAnswersChosen" :key="candidatesAnswers" v-if="questionObj.whichAnswersChosen && questionObj.whichAnswersChosen.length > 0">
                            - {{candidatesAnswers}}
                          </v-layout>
                          <v-layout justify-center v-if="!questionObj.whichAnswersChosen ||  questionObj.whichAnswersChosen.length == 0">
                            Żadna
                          </v-layout>
                        </v-flex>
                      </v-layout>

                      <v-layout justify-center class="mt-2 pa-2">
                        <v-flex>
                          <h5 class="text-xs-center title amber--text ">
                            Oceniono na: {{questionObj.questionAnswerScore}}pkt. (z {{questionObj.difficultyLevel}}pkt. możliwych)
                          </h5>
                        </v-flex>
                      </v-layout>


                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
      </v-flex>
    </v-layout>




    <div v-if="categoryResults.textFieldQuestions">

      <v-layout>
        <v-flex>
          <p class="text-xs-right" style="text-decoration:underline">Pytania otwarte</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex class="mb-2">
          legenda:
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <p class="red--text">Złe odpowiedzi</p>
        </v-flex>
        <v-flex xs12 sm4>
          <p class="green--text">dobre odpowiedzi</p>
        </v-flex>
        <v-flex xs12 sm4>
          <p class="grey--text">odpowiedzi ani dobre ani złe</p>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>

          <v-expansion-panel expand>
            <v-expansion-panel-content :class="comProp(questionObj)" v-for="(questionObj,index) in categoryResults.textFieldQuestions"
              :key="index">
              <div slot="header">{{questionObj.question}}</div>

              <v-layout class="mt-4" v-if="categoryResults.textFieldQuestions">
                <v-flex>
                  <v-card hover :class="comProp(questionObj)" class=" white--text">
                    <v-card-text primary-title class="pb-0">
                      <v-layout row>
                        <v-flex>
                          <h5>
                            Pytanie: {{questionObj.question}}
                          </h5>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <v-text-field :name="index" label="Odpowiedź:" textarea disabled dark v-model="questionObj.candidatesAnswer"></v-text-field>
                      <v-text-field v-if='questionObj.examinersNotes!=="" ' :name="index" label="Uwagi sprawdzającego:" textarea disabled dark v-model="questionObj.examinersNotes"></v-text-field>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>

              <v-layout class="mt-4" v-else>
                <v-flex>
                  <v-card>
                    <v-card-title class="justify-center text-xs-center">
                      <h4 class="text-xs-center">W tym teście nie było pytań opisowych dla danej kategorii</h4>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
      <!-- NOTE: that's a 2nd expansion Panel for showing the image-based answers -->
      <v-layout v-if="categoryResults.imageBasedQuestions">
        <v-flex>

          <v-expansion-panel expand>
            <v-expansion-panel-content :class="comProp(questionObj)" v-for="(questionObj,index) in categoryResults.imageBasedQuestions"
              :key="index">
              <div slot="header">{{questionObj.question}}</div>

              <v-layout class="mt-4">
                <v-flex>
                  <v-card hover :class="comProp(questionObj)" class=" white--text">
                    <v-card-text primary-title class="pb-0">
                      <v-layout row>
                        <v-flex>
                          <iframe class="text-xs-center" id="testImage" :src="questionObj.imageURLForThisTest" width="100%" height="400px">
                          </iframe>
                        </v-flex>
                      </v-layout>
                      <v-layout row>
                        <v-flex>
                          <h5>
                            Pytanie: {{questionObj.question}}
                          </h5>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <v-text-field :name="index" label="Odpowiedź:" textarea disabled dark v-model="questionObj.candidatesAnswer"></v-text-field>
                      <p class="title" style="text-decoration: underline; text-align: center;">Sprawdzający ma uwagi do tego pytania</p>
                      <v-text-field v-if='questionObj.examinersNotes!=="" ' :name="index" label="Uwagi sprawdzającego:" textarea disabled dark v-model="questionObj.examinersNotes"></v-text-field>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>

    </div>
    <v-divider class="mt-4"></v-divider>
  </v-container>
</template>

<script>
  export default {
    name: "",
    props: ['categoryTitle', 'categoryResults', 'whatCatToCount'],
    methods: {
      comProp(questionObj) {
        if (questionObj.isAnswerCorrect == null) {
          return 'blue-grey'
        } else if (questionObj.isAnswerCorrect == false) {
          return 'red'
        } else if (questionObj.isAnswerCorrect == true) {
          return 'green'
        } else if (questionObj.isAnswerCorrect == -1) {
          return 'grey lighten-1'
        }
      }
    },
    data() {
      return {
        correctShortAnswers: null,
        wrongShortAnswers: null,
        correctAnswersNumber: null,
        thisCatTotalQuestionsNum: null
      }
    },
    computed: {
      displayTotalNumOfQuestions() {
        // IDEA: Because we need to count questions ASYNCHRONOUSLY (i.e. we need to count them only when they are fetched from firebase, otherwise it'll always only count the 4 dummy questions in vuex at existing at the component creation) we create 'allCatQs' variable - it doesn't do anything except it forces this computed method to re-run when this.categoryResults changes (i.e. when this.categoryResults changes from being a dummy object to an object with fetched questions). This way, the calculation of the questions is done twice - firstly at the component creation (counts 4 dummy questions in the vuex, we don't care) and then once the data is fetched (which is what we need).    
        let allCatQs = this.categoryResults;

        // IDEA: Because this component is used in 2 places with a slightly differrent logic (DB of tests view and end-test results view) we need a different to handle counting logic. So when the components are registered within the DB view, all are created with whatCatToCount prop equal to 'dbviewdefault', otherwise they're called differently, accordingly to the result page.    
        if (this.whatCatToCount === "dbviewdefault") {
          this.correctAnswersNumber = countCorrectAnswers(this.categoryResults, '');
          this.thisCatTotalQuestionsNum = countNumberOfQuestions(this.categoryResults);
        } else {
          this.$store.dispatch('totalNumberOfQuestion', this.whatCatToCount)
          .then((data) => {
            this.thisCatTotalQuestionsNum = data;
          })
        }
        return this.thisCatTotalQuestionsNum
      },
      displayNumOfCorrectAnswers() {
        // IDEA: same as in 'displayTotalNumOfQuestions'
        let allCatQs = this.categoryResults;
        if (this.whatCatToCount === "dbviewdefault") {
          this.correctAnswersNumber = countCorrectAnswers(this.categoryResults, '');
        } else {
          this.$store.dispatch('numberOfCorrectAnswers', this.whatCatToCount)
          .then((data) => {
            this.correctAnswersNumber = data;
          })
        }
        return this.correctAnswersNumber
      }
    },
    mounted() {

      // this.correctShortAnswers = this.categoryResults.oneChoiceQuestions
      //   .filter((questionObj) => {
      //     return (questionObj.whichAnswerChosen === questionObj.correctAnswer || questionObj.isAnswerCorrect == true) &&
      //       questionObj.whichAnswerChosen != null;
      //   })
      //   .map((GoodAnswer) => {
      //     return GoodAnswer;
      //   });
      // console.log("wszystko co jest zapisane w correctShortAnswers:");
      // console.log(this.correctShortAnswers);


      // this.wrongShortAnswers = this.categoryResults.oneChoiceQuestions
      //   .filter((questionObj) => {
      //     return (questionObj.whichAnswerChosen !== questionObj.correctAnswer || questionObj.isAnswerCorrect == false) &&
      //       questionObj.whichAnswerChosen !== null;
      //   })
      //   .map((wrongAnswer) => {
      //     return wrongAnswer;
      //   });
      // console.log("wszystko co jest zapisane w wrongShortAnswers:");
      // console.log(this.wrongShortAnswers);

      if (this.whatCatToCount === "dbviewdefault") {
        this.correctAnswersNumber = countCorrectAnswers(this.categoryResults, '');
        this.thisCatTotalQuestionsNum = countNumberOfQuestions(this.categoryResults);
      } else {
        this.$store.dispatch('numberOfCorrectAnswers', this.whatCatToCount)
          .then((theNumber) => {
            this.correctAnswersNumber = theNumber;
          });
        this.$store.dispatch('totalNumberOfQuestion', this.whatCatToCount)
          .then((theSum) => {
            this.thisCatTotalQuestionsNum = theSum;
          })
      }
    }
  }

  function countNumberOfQuestions(allQuestionsObject) {
    let masterCounter = 0;
    for (const questionsType in allQuestionsObject) {
      masterCounter += allQuestionsObject[questionsType].length;
    }
    return masterCounter;
  }

  function countCorrectAnswers(allQuestionsObject, categoryToCount = 'all') {
    let masterCounter = 0;
    if (categoryToCount === "all") {
      for (const cat in allQuestionsObject) {
        for (const questions in allQuestionsObject[cat]) {
          allQuestionsObject[cat][questions].forEach(questionObj => {
            if (questionObj.isAnswerCorrect === true) {
              masterCounter++;
            }
          })
        }
      }
    } else {
      for (const questionsType in allQuestionsObject) {
        allQuestionsObject[questionsType].forEach(questionObj => {
          if (questionObj.isAnswerCorrect === true) {
            masterCounter++;
          }
        })
      }
    }
    return masterCounter;
  }

</script>
<style scoped>


</style>
