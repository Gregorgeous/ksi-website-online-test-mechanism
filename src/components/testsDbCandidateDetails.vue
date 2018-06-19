<template>
  <div>
    <v-toolbar fixed scroll-off-screen class="pb-2">
      <v-layout align-center>
        <v-flex class="text-xs-left">
          <v-btn flat depressed class="pl-0 text-xs-left" @click="goBack">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            <span class="ml-2">
              Cofnij
            </span>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-card id="titleCard" class="">
            <v-card-title>
              <h5 class="headline mb-0">
                Widok szczegółowy testu
              </h5>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-toolbar>
    <v-layout class="mt-5" v-if="isLoading" transition="scale-transition" row>
      <v-flex class="text-xs-center mt-5">
        <v-progress-circular class="amber--text" indeterminate size="100"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout v-else class="mt-5">
      <v-flex xs10 offset-xs1>
        <v-card>

          <v-container class="mt-5">
            <v-layout row>
              <v-flex>
                <i class="fa fa-user-circle fa-5x mb-3" aria-hidden="true"></i>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <p class="text-xs-center">{{candidateName}}</p>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-container>

          <v-container>
            <v-flex xs12 md6 offset-md3>
              <v-card class="grey lighten-1">
                <v-layout row wrap>
                  <v-flex sm12 >
                    <div>
                      <div class="headline  text-xs-center">
                        Liczba poprawnych odpowiedzi:
                      </div>
                      <h4 class="mt-2  text-xs-center">
                        {{totalCorrectAnsNum}} z {{totalNumOfQuestions}}</h4>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-divider class="mt-3"></v-divider>
          </v-container>

          <categoryResults categoryTitle='Dział 1.: Wiedza o organizacji' whatCatToCount='dbviewdefault' :categoryResults='candidatesAnswers.categoryWiedzaOOrganizacji'
          test = 'categoryWiedzaOOrganizacji'></categoryResults>

          <categoryResults categoryTitle='Dział 2.: Wychowanie. Metoda i metodyki harcerskie' whatCatToCount='dbviewdefault' :categoryResults='candidatesAnswers.categoryWychowanieMetodaMetodyki'
          test = 'categoryWychowanieMetodaMetodyki'></categoryResults>

          <categoryResults categoryTitle='Dział 3.: Bezpieczeństwo' whatCatToCount='dbviewdefault' :categoryResults='candidatesAnswers.categoryBezpieczenstwo'
          test = 'categoryBezpieczenstwo'></categoryResults>

          <categoryResults categoryTitle='Dział 4.: Idea i historia' whatCatToCount='dbviewdefault' :categoryResults='candidatesAnswers.categoryIdeaIHistoria'
          test = 'categoryIdeaIHistoria'></categoryResults>

        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  import categoryResults from './resultsPageComponents/categoryResults'

  export default {

    components: {
      categoryResults
    },
    data() {
      return {
        candidateName: '',
        snackbar: false,
        timeout: 2000,
        totalCorrectAnsNum: null,
        totalNumOfQuestions: null
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
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
      }
    },
    computed: {
      candidatesAnswers() {
        return this.$store.state.testDetailsInDBView;
      },
      isLoading() {
        return this.$store.state.loadingState;
      },
      // TODO: Find a way to fetch also the candidate details (i.e. name, surname, unit)
      // ourUser() {
      //   return this.$store.state.candidateDetails;
      // }
    },
    created() {
      let candidateID = this.$route.params.candidate_id;
      this.candidateName = candidateID;
      this.$store.dispatch('fetchTestDetailsDB', candidateID)
      .then(result => {
        this.totalNumOfQuestions = result.numOfAllQuestions;
        this.totalCorrectAnsNum = result.numOfCorrectAnswers;
      })
    }
  }

</script>


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
