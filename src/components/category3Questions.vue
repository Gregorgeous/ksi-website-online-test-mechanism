<template>
  <div id="cat3QuestionsStack">

    <v-layout class="mt-4" v-for="oCQuestion in categoryBezpieczenstwo.oneChoiceQuestions" :key="oCQuestion.question">
      <v-flex>
        <v-card hover>
          <v-card-text primary-title>
            <v-layout>
              <h5>
                {{oCQuestion.question}}
              </h5>
            </v-layout>
            <v-layout row>
              <v-flex>
                <p v-if="oCQuestion.whichAnswerChosen">
                  Wybrano: {{oCQuestion.whichAnswerChosen}}
                </p>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-flex offset-md1>
              <v-radio-group row v-model="oCQuestion.whichAnswerChosen">
                <v-radio :label="oCQuestion.correctAnswer" :value="oCQuestion.correctAnswer"></v-radio>
                <v-radio :label="oCQuestion.answer2" :value="oCQuestion.answer2">
                </v-radio>
                <v-radio v-if="oCQuestion.answer3" :label="oCQuestion.answer3" :value="oCQuestion.answer3">
                </v-radio>
                <v-radio v-if="oCQuestion.answer4" :label="oCQuestion.answer4" :value="oCQuestion.answer4">
                </v-radio>
              </v-radio-group>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-4" v-for="mCQuestion in categoryBezpieczenstwo.multiChoiceQuestions" :key="mCQuestion.question">
      <v-flex>
        <v-card hover>
          <v-card-text primary-title>
            <v-layout>
              <h5>
                {{mCQuestion.question}}
              </h5>
            </v-layout>
            <v-layout row>
              <v-flex>
                <p v-if="mCQuestion.whichAnswersChosen">
                  Wybrano: {{mCQuestion.whichAnswersChosen}}
                </p>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-flex offset-md1>
              <v-radio-group row>
                <v-checkbox :label="mCQuestion.answer1" v-model="mCQuestion.answer1State"></v-checkbox>
                <v-checkbox :label="mCQuestion.answer2" v-model="mCQuestion.answer2State">
                </v-checkbox>
                <v-checkbox :label="mCQuestion.answer3" v-model="mCQuestion.answer3State">
                </v-checkbox>
                <v-checkbox :label="mCQuestion.answer4" v-model="mCQuestion.answer4State">
                </v-checkbox>
              </v-radio-group>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-4" v-for="vBQuestion in categoryBezpieczenstwo.videoBasedQuestions" :key="vBQuestion.question">
      <v-flex>
        <v-card hover>
          <v-card-text primary-title>
            <v-layout row>
              <v-flex>
                <iframe class="text-xs-center" id="testImage" :src="vBQuestion.videoURL" width="100%" height="400px">
                </iframe>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <h5>
                  {{vBQuestion.question}}
                </h5>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <p v-if="vBQuestion.whichAnswerChosen">
                  Wybrano: {{vBQuestion.whichAnswerChosen}}
                </p>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-flex offset-md1>
              <v-radio-group row v-model="vBQuestion.whichAnswerChosen">
                <v-radio :label="vBQuestion.correctAnswer" :value="vBQuestion.correctAnswer"></v-radio>
                <v-radio :label="vBQuestion.answer2" :value="vBQuestion.answer2">
                </v-radio>
                <v-radio :label="vBQuestion.answer3" :value="vBQuestion.answer3">
                </v-radio>
                <v-radio :label="vBQuestion.answer4" :value="vBQuestion.answer4">
                </v-radio>
              </v-radio-group>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-4" v-for="iBQuestion in categoryBezpieczenstwo.imageBasedQuestions" :key="iBQuestion.question">
      <v-flex>
        <v-card hover>
          <v-card-text primary-title>
            <v-layout row>
              <v-flex>
                <iframe class="text-xs-center" id="testImage" :src="iBQuestion.imageURLForThisTest" width="100%" height="400px">
                </iframe>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <h5>
                  {{iBQuestion.question}}
                </h5>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-flex>
              <v-text-field label="Tu odpowiedz na pytanie" textarea v-model="iBQuestion.candidatesAnswer"></v-text-field>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-4" v-for="tFQuestion in categoryBezpieczenstwo.textFieldQuestions" :key="tFQuestion.question">
      <v-flex>
        <v-card hover>
          <v-card-text primary-title class="pb-0">
            <v-layout row>
              <v-flex>
                <h5 v-if="tFQuestion.variant2">
                  {{tFQuestion.variant2}}
                  <!-- TODO: make it so it displays random variants of the question, not just the second one -->
                </h5>
                <h5 v-else>
                  {{tFQuestion.question}}
                </h5>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-flex>
              <v-text-field label="Tu odpowiedz na pytanie" textarea v-model="tFQuestion.candidatesAnswer"></v-text-field>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-3">
      <v-flex>
        <v-btn block secondary dark @click="saveTheAnswers">
          ZAPISZ SWOJE ODPOWIEDZI Z TEGO DZIAŁU
        </v-btn>
      </v-flex>
    </v-layout>


    <v-snackbar :timeout="timeout" top='top' v-model="snackbar">
      Zapisano odpowiedzi z tego działu!
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

  </div>
</template>
<script>
  export default {
    name: "cat3Questions",
    data() {
      return {
        snackbar: false,
        timeout: 1300
      }
    },
    computed: {
      categoryBezpieczenstwo() {
        return this.$store.state.categoryBezpieczenstwo;
      },
      oneChoiceQuestions() {
        return this.$store.state.categoryBezpieczenstwo.oneChoiceQuestions;
      },
      multiChoiceQuestions() {
        return this.$store.state.categoryBezpieczenstwo.multiChoiceQuestions;
      },
      videoBasedQuestions() {
        return this.$store.state.categoryBezpieczenstwo.videoBasedQuestions;
      },
      imageBasedQuestions() {
        return this.$store.state.categoryBezpieczenstwo.imageBasedQuestions;
      },
      textFieldQuestions() {
        return this.$store.state.categoryBezpieczenstwo.textFieldQuestions;
      }
    },
    methods: {
      displayArrayAnswersCorrectly(arrayAnswer) {
        console.log(arrayAnswer);
        if (arrayAnswer) {
          if ( arrayAnswer.length == 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      },
      saveTheAnswers() {
        let categoryBezpieczenstwoAnswers = {
          oneChoiceQuestions: [],
          multiChoiceQuestions:[],
          videoBasedQuestions: [],
          imageBasedQuestions: [],
          textFieldQuestions: []
        };

        if (this.oneChoiceQuestions) {
          for (var i = 0; i < this.oneChoiceQuestions.length; i++) {
            let dataFormattedObject = {
              question: this.oneChoiceQuestions[i].question,
              difficultyLevel: this.oneChoiceQuestions[i].difficultyLevel,
              starredQuestion: this.oneChoiceQuestions[i].starredQuestion,
              candidatesAnswer: this.oneChoiceQuestions[i].whichAnswerChosen,
              correctAnswer: this.oneChoiceQuestions[i].correctAnswer,
              isAnswerCorrect: null
            }
            categoryBezpieczenstwoAnswers.oneChoiceQuestions.push(dataFormattedObject);
          }
        }

        if (this.multiChoiceQuestions) {
          for (var i = 0; i < this.multiChoiceQuestions.length; i++) {
            let dataFormattedObject = {
              question: this.multiChoiceQuestions[i].question,
              difficultyLevel: this.multiChoiceQuestions[i].difficultyLevel,
              starredQuestion: this.multiChoiceQuestions[i].starredQuestion,
              whichAnswersChosen: this.multiChoiceQuestions[i].whichAnswersChosen,
              correctAnswers: this.multiChoiceQuestions[i].correctAnswers,
              isAnswerCorrect: null,
              questionAnswerScore: 0 
            }
            categoryBezpieczenstwoAnswers.multiChoiceQuestions.push(dataFormattedObject);
          }
        }

        if (this.videoBasedQuestions) {
          for (i = 0; i < this.videoBasedQuestions.length; i++) {
            let dataFormattedObject = {
              question: this.videoBasedQuestions[i].question,
              difficultyLevel: this.videoBasedQuestions[i].difficultyLevel,
              starredQuestion: this.videoBasedQuestions[i].starredQuestion,
              candidatesAnswer: this.videoBasedQuestions[i].whichAnswerChosen,
              isAnswerCorrect: null
            }
            categoryBezpieczenstwoAnswers.videoBasedQuestions.push(dataFormattedObject);
          }
        }

        if (this.imageBasedQuestions) {
          for (i = 0; i < this.imageBasedQuestions.length; i++) {
            let dataFormattedObject = {
              question: this.imageBasedQuestions[i].question,
              difficultyLevel: this.imageBasedQuestions[i].difficultyLevel,
              starredQuestion: this.imageBasedQuestions[i].starredQuestion,
              candidatesAnswer: this.imageBasedQuestions[i].candidatesAnswer,
              isAnswerCorrect: null,
              imageURLForThisTest: this.imageBasedQuestions[i].imageURLForThisTest
            }
            categoryBezpieczenstwoAnswers.imageBasedQuestions.push(dataFormattedObject);
          }
        }

        if (this.textFieldQuestions) {
          for (i = 0; i < this.textFieldQuestions.length; i++) {
            let dataFormattedObject = {
              question: this.textFieldQuestions[i].question,
              difficultyLevel: this.textFieldQuestions[i].difficultyLevel,
              starredQuestion: this.textFieldQuestions[i].starredQuestion,
              candidatesAnswer: this.textFieldQuestions[i].candidatesAnswer,
              isAnswerCorrect: null
            }
            categoryBezpieczenstwoAnswers.textFieldQuestions.push(dataFormattedObject);
          }
        }

        console.log("Dispatchuję 'updateCurrentExamAnswers'");
        this.$store.dispatch('updateCurrentExamAnswers', 'categoryBezpieczenstwo')
        console.log("------------Jeszcze w komponencie -------------");
        console.log("to są wszystkie odpowiedzi które chcę zapisac z tej kategorii");
        console.log(categoryBezpieczenstwoAnswers);
        this.$store.commit('mapTheThirdCategoryAnswers', categoryBezpieczenstwoAnswers);
        this.snackbar = true;
      }
    },
    updated() {
      //do something after updating vue instance
      // console.log("Jestem sobie updated ! ;D ");
    }
  }

</script>
<style scoped>


</style>
