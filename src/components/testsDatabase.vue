<template>
  <div>
    <v-layout align-center>
      <v-flex class="text-xs-left">
        <v-btn flat depressed class="pl-0 text-xs-left " id="backbutton" to='/admin-dashboard'>
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          <span class="ml-2">
            panel administratora
          </span>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-card id="titleCard" class="">
          <v-card-title>
            <h5 class="headline mb-0 text-xs-center">
              Baza danych testów
            </h5>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>

    <v-card>
      <v-layout align-center justify-center mt-3 v-if="outputFiltered">
        <v-flex xs4 sm2 md2>
          <v-btn @click='cancelSearch'>cofnij</v-btn>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center mt-3 v-else>
        <v-flex xs8 sm6 md4>
          <v-flex xs4 sm2 md2 v-if="outputFiltered">
            <v-btn @click='cancelSearch'>cofnij</v-btn>
          </v-flex>
          <v-card-text>
            <v-text-field name="searchBar" label="Wyszukaj kandydata" v-model="searchQuery" single-line></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4 sm2 md2>
          <v-btn @click='performSearch'> szukaj</v-btn>
        </v-flex>
      </v-layout>
    </v-card>

    <v-layout v-if="ThereIsFatalError">
      <v-dialog v-model="ThereIsFatalError" lazy absolute>
        <v-card>
          <v-card-title>
            <div class="headline">Nastąpił błąd połączenia z bazą danych online</div>
          </v-card-title>
          <v-card-text>Spróbuj odświeżyc stronę. Jeśli błąd będzie się dalej powtarzac, zmień przeglądarkę na dowolną inną niż ta, której
            obecnie używasz. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">zamknij</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout v-else-if="isLoading" transition="scale-transition" row mt-5>
      <v-flex class="text-xs-center">
        <v-progress-circular class="amber--text" indeterminate size="300"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout v-else mx-2 mt-4 wrap justify-center>
      <v-flex xs12 sm4 md3 mb-2 mx-1 v-for="(test, name) in filterOutput" :key="test.key">
        <v-card hover>
          <v-card-title>
            <v-flex>
              <h3 class="title">
                {{name}}
              </h3>
            </v-flex>
          </v-card-title>
          <v-card-media contain src="/static/test.png" height='50'>
          </v-card-media>
          <v-card-actions>
            <v-flex>
              <v-btn flat class="orange--text" @click="snackbar = true">
                szczegóły
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex v-if="outputFiltered && filteredOutputIsEmpty">
        <v-card hover>
          <v-card-title id='badNewsTitle'>
            <v-flex>
              <h3 class="title">
                Brak wyników dla zapytania: "{{searchQuery}}"
              </h3>
            </v-flex>
          </v-card-title>
          <v-card-media contain src="/static/sadFace.svg" height='50'>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar :timeout="6000" top v-model="snackbar">
      Na razie widok ogólny, dajcie mi znać co chcielibyście w widoku szczegółowym :)
      <v-btn flat class='amber--text' @click="snackbar = false">Zamknij</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        searchQuery: null,
        outputFiltered: false,
        filteredTests: {},
        snackbar: false
      }
    },
    methods: {
      performSearch() {
        let testsSource = this.allTestsDBReference;
        let query = this.searchQuery.toLowerCase();
        if (query == '') {
          return;
        }
        for (var name in testsSource) {
          if (name.toLowerCase().search(query) > -1) {
            this.filteredTests[name] = testsSource[name];
          }
        }
        this.outputFiltered = true;
      },
      cancelSearch() {
        this.outputFiltered = false;
        this.filteredTests = {};
      }
    },
    computed: {
      thisCandidate() {
        return this.$store.state.candidateDetails;
      },
      ThereIsFatalError() {
        return this.$store.state.fatalError;
      },
      isLoading() {
        return this.$store.state.loadingState;
      },
      allTestsDBReference() {
        return this.$store.state.testsDB;
      },
      filterOutput() {
        if (this.outputFiltered == false) {
          return this.$store.state.testsDB;
        } else {
          return this.filteredTests;
        }
      },
      filteredOutputIsEmpty() {
        let filteredTests = this.filteredTests;
        for (var key in filteredTests) {
          if (filteredTests.hasOwnProperty(key))
            return false;
        }
        return true;
      }
    },
    created() {
      this.$store.dispatch('fetchAlltestsDB');
    }
  }

</script>

<style scoped>
  #badNewsTitle {
    padding-bottom: 0
  }

</style>
