<template>
  <div>

    <div class="navbar">
      <v-layout>
        <v-flex>
          <v-parallax
            id="navbar"
            :src="Pic"
            height='300'
          ></v-parallax>
        </v-flex>
      </v-layout>
    </div>
      

  <v-layout>
    <v-flex xs12  md2 offset-md5 sm3 offset-sm4>
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
import Pic from "@/assets/navbar.png"

export default {
  name: 'hello',
  data () {
    return {
      Pic
    }
  },
  methods: {
    startTheTest() {
      this.thisCandidate.userID = `${this.thisCandidate.firstName}${this.thisCandidate.lastName}`
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navbar{
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
