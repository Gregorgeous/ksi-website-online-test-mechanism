<template>
  <div>

    <v-flex class="text-xs-left">
      <v-btn flat depressed class="pl-0 text-xs-left " id="backbutton" to='/admin-dashboard'>
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        <span class="ml-2">
          panel administratora
        </span>
      </v-btn>
    </v-flex>
    <v-layout v-if="ThereIsFatalError">
      <v-dialog v-model="ThereIsFatalError" lazy absolute>
        <v-card>
          <v-card-title>
            <div class="headline">Nastąpił błąd połączenia z bazą danych online</div>
          </v-card-title>
          <v-card-text>Spróbuj odświeżyc stronę. Jeśli błąd będzie się dalej powtarzac, zmień przeglądarkę na dowolną
            inną niż ta, której
            obecnie używasz. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">zamknij</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout v-else justify-center>
      <v-flex xs12 sm5 md4>
        <v-card class="mp-5 mt-5">
          <v-card-title primary-title>
            <v-flex>
              <div>
                <h3 class="headline ">Podaj swoje dane i rozpocznij test</h3>
                <hr>
                <div class="mt-3">Test będzie trwać od 40 do 55 minut.</div>
                <div>Test będzie składać się z 23 pytań</div>
              </div>
            </v-flex>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <form>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Imię" required :rules="nameRules" v-model="thisCandidate.firstName">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Nazwisko" required :rules="nameRules" v-model="thisCandidate.lastName">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Środowisko służby" required :rules="nameRules" v-model="thisCandidate.scoutGroup">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-flex>
              <v-btn flat class="orange--text" :loading="isLoading" :disabled="isLoading" @click="startTheTest">
                Rozpocznij
              </v-btn>
            </v-flex>
          </v-card-actions>
          <v-alert warning transition="scale-transition" :value="errorInForm" class="text-xs-center">
            {{errorMessage}}
          </v-alert>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout class="mt-5" justify-center="">
      <v-flex xs12 sm6>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Instrukcje dot. testu</div>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-slide-y-transition>
            <v-card-text class="text-xs-left" v-show="show">
              1. <strong> Pamiętaj aby zapisywać swoje odpowiedzi </strong> - na końcu każdej kategorii znajduje się
              ciemny przycisk "zapisz swoje odpowiedzi z tego działu". Jeśli tego nie zrobisz, a klikniesz przycisk
              zakończenia testu (lub odświeżysz stronę),stracisz swoje odpowiedzi
              <br>
              2. <strong> Zalecamy unikać odświeżania strony</strong> - Test zapisuje twoje odpowiedzi bez konieczności
              odświeżania strony, natomiast za każdym razem gdy to robisz, musisz pamiętać by mieć zapisane odpowiedzi
              (patrz pkt. 1)
              <br>
              3. <strong> Podczas testu jest możliwość jego zatrzymania</strong> - w prawym górnym rogu znajdować się
              będzie przycisk zatrzymania czasu, pamiętaj że każde zatrzymanie czasu wymaga autoryzacji osoby, która
              ocenia twój test
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  import * as firebase from "firebase"

  export default {
    name: 'hello',
    data() {
      return {
        show: false,
        errorInForm: false,
        errorMessage: null,
        nameRules: [v => !!v || "name is required"]
      }
    },
    methods: {
      startTheTest() {
        // FIXME: no check for previous candidate with same name, see method 'uploadCandsAnswersToDb' in vuex actions.
        if (this.thisCandidate.firstName == '' || this.thisCandidate.lastName == '' || this.thisCandidate.scoutGroup ==
          '') {
          this.errorInForm = true;
          this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
        } else {
          this.thisCandidate.userID = `${this.thisCandidate.firstName} ${this.thisCandidate.lastName}`
          // console.log(this.thisCandidate);
          this.$store.dispatch('initializeCandidate');

          this.$store.dispatch('CreateNewExamQuestionStack');
          this.$router.push('/question-form');
        }
      }
    },
    computed: {
      thisCandidate() {
        return this.$store.state.candidateDetails;
      },
      isLoading() {
        return this.$store.state.loadingState;
      },
      ThereIsFatalError() {
        return this.$store.state.fatalError;
      }
    },
    created() {
      this.$store.dispatch('fetchTheCandidateData');
    }
  }

</script>


<style scoped>
  #backbutton {
    display: inline-block;
    left: 0
  }

  #backbutton .btn__content {
    padding-left: 0
  }

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
