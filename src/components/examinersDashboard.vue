<template>
  <div>
    <v-toolbar extended class="cyan" dark>
      <v-toolbar-title slot="extension" class="display-2 ">
        Panel sprawdzającego
      </v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-layout>
        <v-flex xs12>
          <h3 class="pt-2">Wyniki w pytaniach jednokrotnego wyboru</h3>
        </v-flex>
      </v-layout>

      <v-flex xs12 sm10 offset-sm1>
        <v-card >
          <v-card-text>
            <v-layout class="my-1">
              <v-flex xs12 md6>
                <h4>Liczba poprawnych odpowiedzi </h4>
              </v-flex>
              <v-flex xs12 md6>
                <h4> ...  z  ...</h4>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-layout>
        <v-flex xs12>
          <h3 class="pt-5">Wyniki w pytaniach wielokrotnego wyboru</h3>
        </v-flex>
      </v-layout>

      <v-flex xs12 sm10 offset-sm1>
        <v-card >
          <v-card-text>
            <v-layout class="my-1">
              <v-flex xs12 md6>
                <h4>Liczba poprawnych odpowiedzi </h4>
              </v-flex>
              <v-flex xs12 md6>
                <h4> ...  z  ...</h4>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <hr class="mt-4">
      <v-divider></v-divider>
      <hr>

      <h3 class="mt-4"> Sprawdź poprawność pytań otwartych</h3>

      <v-expansion-panel expand>
        <v-expansion-panel-content v-for="(category,key, index) in expansionPanels" :key="key">
          <div slot="header">{{category[0].categoryTitle}}</div>

          <v-layout
          class="mt-4"
          v-if="category.length == 1">
            <v-flex>
              <v-card>
                <v-card-title class="justify-center text-xs-center">
                <h4 class="text-xs-center">W tym teście nie było pytań opisowych dla danej kategorii</h4>
              </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout
          class="mt-4 "
          v-for="(tFQuestion,index) in category"
          :key="index"
          v-if="tFQuestion.question != undefined">
          <v-flex >
            <v-card
            hover
            :class= "comProp(tFQuestion)"
            class=" white--text"
            :ref='key' >
            <v-card-text primary-title class="pb-0">
              <v-layout row>
                <v-flex>
                  <h5>
                    Pytanie: {{tFQuestion.question}}
                  </h5>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-text-field
              :name="index"
              label="Tak odpowiedział kandydat:"
              textarea
              disabled
              dark
              v-model="tFQuestion.candidatesAnswer"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-layout row wrap justify-space-between>
                <v-flex class="text-xs-center" >
                  <v-btn  class="elevation-8 red accent-2 white--text" round @click="makeAnswerWrong(tFQuestion)" >
                    Zła odpowiedź
                    <v-icon right medium dark >thumb_down</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex class="text-xs-center">
                  <v-btn class="elevation-8 accent-3 " round @click="makeAnswerNull(tFQuestion)">
                    Trudno ocenić..
                    <v-icon right medium dark >thumbs_up_down</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex class="text-xs-center">
                  <v-btn class="elevation-8 light-green accent-3 white--text" round @click="makeAnswerCorrect(tFQuestion)">
                    dobra odpowiedź
                    <v-icon right medium dark >thumb_up</v-icon>
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

<v-snackbar
      :timeout="timeout"
      top='top'
      v-model="snackbar"
    >
      Sprawdzono test !
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      snackbar: false,
      timeout:2000,
      expansionPanels: {
        categoryWiedzaOOrganizacji: [
          {categoryTitle: "Dział 1.: Wiedza o organizacji"}
        ] ,
        categoryWychowanieMetodaMetodyki: [
          {categoryTitle: "Dział 2.: Wychowanie. Metoda i metodyki harcerskie"}
        ],
        categoryBezpieczenstwo: [
          {categoryTitle: "Dział 3.: Bezpieczeństwo"}
        ],
        categoryIdeaIHistoria: [
          {categoryTitle: "Dział 4.: Idea i historia"}
        ]
      }
    }
  },
  methods: {
    makeAnswerWrong(candsAnswer) {
      candsAnswer.isAnswerCorrect = false;
      console.log(candsAnswer);
    },
    makeAnswerCorrect(candsAnswer){
      candsAnswer.isAnswerCorrect = true;
      console.log(candsAnswer);
    },
    makeAnswerNull(candsAnswer){
      candsAnswer.isAnswerCorrect = -1;
      console.log(candsAnswer);
    },
    comProp (tFQuestion) {
      if (tFQuestion.isAnswerCorrect == null) {
        return 'blue-grey'
      }
      else if (tFQuestion.isAnswerCorrect == false) {
        return 'red'
      }
      else if (tFQuestion.isAnswerCorrect == true) {
        return 'green'
      }
      else if (tFQuestion.isAnswerCorrect == -1) {
        return 'grey lighten-1'
      }
    },
    finishGradingTheTest () {
      this.snackbar = true;
      // BELOW is only for updating view in Vue dev panel
      this.$store.commit('gradeTFQuestions');
      this.$store.dispatch('uploadCandsAnswersToDb');
      this.$store.dispatch('deactivateCurrentExamVersion');
      this.$router.push('/results-page');
    }
  },
  computed: {
    candidatesAnswersInCategoryWiedzaOOrganizacji () {
      return this.$store.state.candidatesAnswers.categoryWiedzaOOrganizacji;
    },
    candidatesAnswersInCategoryWychowanieMetodaMetodyki () {
      return this.$store.state.candidatesAnswers.categoryWychowanieMetodaMetodyki;
    },
    candidatesAnswersInCategoryBezpieczenstwo () {
      return this.$store.state.candidatesAnswers.categoryBezpieczenstwo;
    },
    candidatesAnswersInCategoryIdeaIHhistoria () {
      return this.$store.state.candidatesAnswers.categoryIdeaIHistoria;
    },
  },
  created() {
    //do something after creating vue instance
    // this.totalNumberOfQuestions = this.$store.getters.countUpQuestions;
    // if (this.$store.getters.displayRightAnswersOnResultsPage != undefined) {
    //   this.numberOfRightAnswers = this.$store.getters.displayRightAnswersOnResultsPage;
    // }

    this.$store.dispatch("fetchTheCandidateData");

    // NOTE: Below we "attach" all the text field answers from all the categories of questions to the "expansionPanels" variable - so that it displays in a way it does on the website right now using expansion Panel Vuetify UI component
    var cat1TextFieldAnswers = this.candidatesAnswersInCategoryWiedzaOOrganizacji.textFieldQuestions;

    cat1TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryWiedzaOOrganizacji.push(object);
    })
    // console.log(this.expansionPanels.categoryWiedzaOOrganizacji);


    var cat2TextFieldAnswers = this.candidatesAnswersInCategoryWychowanieMetodaMetodyki.textFieldQuestions;

    cat2TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryWychowanieMetodaMetodyki.push(object);
    })
    // console.log(this.expansionPanels.categoryWychowanieMetodaMetodyki);

    var cat3TextFieldAnswers = this.candidatesAnswersInCategoryBezpieczenstwo.textFieldQuestions;

    cat3TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryBezpieczenstwo.push(object);
    })
    // console.log(this.expansionPanels.categoryBezpieczenstwo);

    var cat4TextFieldAnswers = this.candidatesAnswersInCategoryIdeaIHhistoria.textFieldQuestions;

    cat4TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryIdeaIHistoria.push(object);
    })
    // console.log(this.expansionPanels.categoryIdeaIHistoria);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
v-card{
  margin-top: 50%
}
</style>
