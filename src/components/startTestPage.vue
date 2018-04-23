<template>
  <div >

 <v-flex class="text-xs-left">
  <v-btn  flat depressed class="pl-0 text-xs-left " id="backbutton"  to='/admin-dashboard'>
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
        <v-card-text>Spróbuj odświeżyc stronę. Jeśli błąd będzie się dalej powtarzac, zmień przeglądarkę na dowolną inną niż ta, której obecnie używasz. </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

  <v-layout v-else>
    <v-flex xs12  md3 offset-md4 sm4 offset-sm3>
      <v-card class="mp-5 mt-5">
        <v-card-title primary-title>
          <v-flex>
            <div >
              <h3 class="headline ">Podaj swoje dane i rozpocznij test</h3>
              <hr>
              <div class="mt-3">Test będzie trwac X minut.</div>
              <div>Test będzie składac się z X pytań</div>
            </div>
          </v-flex>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
              label="Imię"
              required
              v-model="thisCandidate.firstName">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
              label="Nazwisko"
              required
              v-model="thisCandidate.lastName">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
              label="Środowisko służby"
              required
              v-model="thisCandidate.scoutGroup"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-flex>
            <v-btn flat class="orange--text" @click="startTheTest">
              Rozpocznij
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import * as firebase from "firebase"
import config from "./../fbConfig"

export default {
  name: 'hello',
  data () {
    return {

    }
  },
  methods: {
    startTheTest() {
      // FIXME: no check for previous candidate with same name, see method 'uploadCandsAnswersToDb' in vuex actions.
      this.thisCandidate.userID = `${this.thisCandidate.firstName} ${this.thisCandidate.lastName}`
      // console.log(this.thisCandidate);
      this.$store.dispatch('initializeCandidate');

      this.$store.dispatch('CreateNewExamQuestionStack');
      this.$router.push('/question-form');
    }
  },
  computed: {
    thisCandidate(){
      return this.$store.state.candidateDetails;
    },
    ThereIsFatalError(){
      return this.$store.state.fatalError;
    }
  },
  created() {
    this.$store.dispatch('fetchTheCandidateData');
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#backbutton {
display: inline-block;
left: 0
}
#backbutton .btn__content {
  padding-left: 0
}
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
