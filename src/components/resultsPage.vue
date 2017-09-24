<template>
  <div>
    <v-toolbar extended class="green" dark>
      <v-flex class="mt-5">
        <v-toolbar-title slot="extension" class="display-3">
          Wynik testu
        </v-toolbar-title>
      </v-flex>
    </v-toolbar>

    <v-container>
      <v-layout>
        <v-flex xs8 offset-xs2>
          <v-card >
            <v-container>
              <v-layout row>
                <v-flex>
                  <h4 class="text-xs-center">Twoje dane</h4>
                  <i class="fa fa-user-circle fa-5x mb-3" aria-hidden="true"></i>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <p class="text-xs-center">Imię: {{ourUser.firstName}}</p>
                </v-flex>
                <v-flex xs12 sm4>
                  <p class="text-xs-center">Nazwisko: {{ourUser.lastName}}</p>
                </v-flex>
                <v-flex xs12 sm4>
                  <p class="text-xs-center">Środowisko: {{ourUser.scoutGroup}}</p>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-container>

            <v-container>
              <v-flex xs12 md6 offset-md3>
                <v-card class="grey lighten-1">
                  <v-layout row wrap>
                    <v-flex sm12 md7>
                      <div>
                        <div class="headline">
                          Liczba poprawnych odpowiedzi:
                        </div>
                        <h4 class="mt-2">
                          {{totalCorrectAnsNum}} z {{totalNumOfQuestions}}</h4>
                      </div>
                    </v-flex>
                    <v-flex sm12 md4>
                      <v-card-media
                      src="http://download.seaicons.com/icons/custom-icon-design/flatastic-2/512/success-icon.png"
                      height="125px"
                      contain
                      ></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-divider class="mt-3"></v-divider>
            </v-container>

            <categoryResults
            categoryTitle='Dział 1.: Wiedza o organizacji'
            whatCatToCount= 'firstCat'
            :categoryResults= 'candidatesAnswers.categoryWiedzaOOrganizacji'></categoryResults>

            <categoryResults
            categoryTitle='Dział 2.: Wychowanie. Metoda i metodyki harcerskie'
            whatCatToCount= 'secondCat'
            :categoryResults= 'candidatesAnswers.categoryWychowanieMetodaMetodyki'></categoryResults>

            <categoryResults
            categoryTitle='Dział 3.: Bezpieczeństwo'
            whatCatToCount= 'thirdCat'
            :categoryResults= 'candidatesAnswers.categoryBezpieczenstwo'></categoryResults>

            <categoryResults
            categoryTitle='Dział 4.: Idea i historia'
            whatCatToCount= 'fourthCat'
            :categoryResults= 'candidatesAnswers.categoryIdeaIHistoria'></categoryResults>

            <v-container>
              <v-layout>
                <v-flex>
                  <v-btn primary @click='exitTheWholeTest'>Zakończ sprawdzanie i wróć do widoku głównego</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>

</div>
</template>

<script>
import categoryResults from './resultsPageComponents/categoryResults'

export default {
  name: 'hello',
  components: {
    categoryResults
  },
  data () {
    return {
      snackbar: false,
      timeout:2000,
      totalCorrectAnsNum: null,
      totalNumOfQuestions: null
    }
  },
  methods: {
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
    exitTheWholeTest(){
      this.$store.dispatch('deactivateCurrentCandidate');
      this.$router.push('/');
    }
  },
  computed: {
    candidatesAnswers(){
      return this.$store.state.candidatesAnswers;
    },
    ourUser () {
      return this.$store.state.candidateDetails;
    }
  },
  created() {
    this.$store.dispatch("fetchTheFinishedTest");
    this.$store.dispatch('numberOfCorrectAnswers','all')
    .then((theNumber) => {
      this.totalCorrectAnsNum = theNumber;
    });
    this.$store.dispatch('totalNumberOfQuestion', 'all')
    .then((theSum) => {
      this.totalNumOfQuestions = theSum;
    })
  }
}
</script>


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
