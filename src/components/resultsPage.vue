<template>
  <v-container>
  <v-layout>
    <v-flex xs12>
      <h3 class="pt-2">Wyniki twojego testu</h3>
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
            <h4> {{numberOfRightAnswers}} z {{totalNumberOfQuestions}}</h4>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-flex>
</v-container>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      totalNumberOfQuestions: null,
      numberOfRightAnswers: null
    }
  },
  created() {
    //do something after creating vue instance
      this.totalNumberOfQuestions = this.$store.getters.countUpQuestions;
      if (this.$store.getters.displayRightAnswersOnResultsPage != undefined) {
        this.numberOfRightAnswers = this.$store.getters.displayRightAnswersOnResultsPage;
      }
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
