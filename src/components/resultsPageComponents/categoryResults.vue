<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h4>{{categoryTitle}}</h4>
        <h5>
          Wynik :   {{correctAnswersNumber}} z {{thisCatTotalQuestionsNum}}
        </h5>
      </v-flex>
    </v-layout>
    <v-layout
    v-if="correctShortAnswers.length > 0 || wrongShortAnswers.length > 0">
    <v-flex>
      <p class="text-xs-left" style="text-decoration:underline">Pytania zamknięte</p>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-if="correctShortAnswers.length > 0">
          <p class="green--text"> Poprawne odpowiedzi</p>
          <v-expansion-panel inset>
            <v-expansion-panel-content v-for="(questionObj,i) in correctShortAnswers" :key="i">
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
                    Twoja odpowiedź:
                  </v-layout>
                  <v-container>
                    <v-layout>
                      {{questionObj.whichAnswerChosen}}
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12 sm6  v-if="wrongShortAnswers.length > 0">
          <p class="red--text"> Błędne odpowiedzi</p>
          <v-expansion-panel inset>
            <v-expansion-panel-content v-for="(questionObj,i) in wrongShortAnswers" :key="i">
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
                    Twoja odpowiedz:
                  </v-layout>
                  <v-container>
                    <v-layout>
                      {{questionObj.whichAnswerChosen}}
                    </v-layout>
                  </v-container>
                  <v-divider></v-divider>
                  <v-layout>
                    Poprawna odpowiedz
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
        <v-expansion-panel-content
        :class="comProp(questionObj)" v-for="(questionObj,index) in categoryResults.textFieldQuestions" :key="index">
        <div slot="header">{{questionObj.question}}</div>

        <v-layout
        class="mt-4"
        v-if="categoryResults.textFieldQuestions">
        <v-flex>
          <v-card>
            <v-card-title class="justify-center text-xs-center">
              <h4 class="text-xs-center">W tym teście nie było pytań opisowych dla danej kategorii</h4>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout
      class="mt-4">
      <v-flex >
        <v-card
        hover
        :class= "comProp(questionObj)"
        class=" white--text">
        <v-card-text primary-title class="pb-0">
          <v-layout row>
            <v-flex>
              <h5>
                Pytanie: {{questionObj.question}}
              </h5>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-text-field
          :name="index"
          label="Twoja odpowiedź:"
          textarea
          disabled
          dark
          v-model="questionObj.candidatesAnswer"
          ></v-text-field>
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
    comProp (questionObj) {
      if (questionObj.isAnswerCorrect == null) {
        return 'blue-grey'
      }
      else if (questionObj.isAnswerCorrect == false) {
        return 'red'
      }
      else if (questionObj.isAnswerCorrect == true) {
        return 'green'
      }
      else if (questionObj.isAnswerCorrect == -1) {
        return 'grey lighten-1'
      }
    }
  },
  data () {
    return {
      correctShortAnswers: null,
      wrongShortAnswers: null,
      correctAnswersNumber: null,
      thisCatTotalQuestionsNum: null
    }
  },
  created() {
    this.correctShortAnswers = this.categoryResults.oneChoiceQuestions
    .filter((questionObj) => {
      return (questionObj.whichAnswerChosen === questionObj.correctAnswer || questionObj.isAnswerCorrect == true) && questionObj.whichAnswerChosen != null;
    })
    .map((GoodAnswer) => {
      return GoodAnswer;
    });
    console.log("wszystko co jest zapisane w correctShortAnswers:");
    console.log(this.correctShortAnswers);


      this.wrongShortAnswers = this.categoryResults.oneChoiceQuestions
      .filter((questionObj) => {
        return (questionObj.whichAnswerChosen !== questionObj.correctAnswer || questionObj.isAnswerCorrect == false) && questionObj.whichAnswerChosen !== null;
      })
      .map((wrongAnswer) => {
        return wrongAnswer;
      });
      console.log("wszystko co jest zapisane w wrongShortAnswers:");
      console.log(this.wrongShortAnswers);




    this.$store.dispatch('numberOfCorrectAnswers',this.whatCatToCount)
    .then((theNumber) => {
      this.correctAnswersNumber = theNumber;
    });
    this.$store.dispatch('totalNumberOfQuestion', this.whatCatToCount)
    .then((theSum) => {
      this.thisCatTotalQuestionsNum = theSum;
    })

  }
}
</script>
<style scoped>
</style>
