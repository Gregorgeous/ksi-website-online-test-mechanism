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
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
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
      candsAnswer.isAnswerCorrect = null;
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
    },
    finishGradingTheTest () {
      console.log("klik!");
      let candsCat1TFAnswers = this.expansionPanels.categoryWiedzaOOrganizacji;
      let dbCat1TFAnswers = this.$store.state.candidatesAnswers.categoryWiedzaOOrganizacji.textFieldQuestions;
      this.$store.commit('gradeTFQuestions', {candsCat1TFAnswers, dbCat1TFAnswers});

      // let cat2 = this.expansionPanels.categoryWychowanieMetodaMetodyki;
      // let dbCat2 = this.$store.state.candidatesAnswers.categoryWychowanieMetodaMetodyki.textFieldQuestions;
      // this.$store.commit('gradeTFQuestions', cat2, dbCat2);
      //
      // let cat3 = this.expansionPanels.categoryBezpieczenstwo;
      // let dbCat3 = this.$store.state.candidatesAnswers.categoryBezpieczenstwo.textFieldQuestions;
      // this.$store.commit('gradeTFQuestions', cat3, dbCat3);
      //
      // let cat4 = this.expansionPanels.categoryIdeaIHistoria;
      // let dbCat4 = this.$store.state.candidatesAnswers.categoryIdeaIHistoria.textFieldQuestions;
      // this.$store.commit('gradeTFQuestions', cat4, dbCat4);

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

    var cat1TextFieldAnswers = this.candidatesAnswersInCategoryWiedzaOOrganizacji.textFieldQuestions;

    cat1TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryWiedzaOOrganizacji.push(object);
    })
    console.log(this.expansionPanels.categoryWiedzaOOrganizacji);


    var cat2TextFieldAnswers = this.candidatesAnswersInCategoryWychowanieMetodaMetodyki.textFieldQuestions;

    cat2TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryWychowanieMetodaMetodyki.push(object);
    })
    console.log(this.expansionPanels.categoryWychowanieMetodaMetodyki);

    var cat3TextFieldAnswers = this.candidatesAnswersInCategoryBezpieczenstwo.textFieldQuestions;

    cat3TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryBezpieczenstwo.push(object);
    })
    console.log(this.expansionPanels.categoryBezpieczenstwo);

    var cat4TextFieldAnswers = this.candidatesAnswersInCategoryIdeaIHhistoria.textFieldQuestions;

    cat4TextFieldAnswers.forEach(object => {
      this.expansionPanels.categoryIdeaIHistoria.push(object);
    })
    console.log(this.expansionPanels.categoryIdeaIHistoria);
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
