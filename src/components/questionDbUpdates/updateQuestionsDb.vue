<template>
  <v-layout>
    <v-flex xs12  md2 offset-md5 sm3 offset-sm4>
      <v-card class="mp-5 mt-5">
        <v-card-title primary-title>
          <v-flex>
            <div >
              <h3 class="headline ">Kliknij żeby dodac szabl. pyt. do db</h3>
              <hr>
            </div>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-flex>
            <v-btn flat class="orange--text" @click='addQToDb'>
              Dodaj pytanie
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      drawer: false,
      title: 'abc',
      location: 'abc',
      imageUrl: 'abc',
      description: 'abc',
    }
  },
  methods: {
    addQToDb() {
      // let newOCQuestion = {
      //   question: "to jest przykładowe pytanie jednokrotnego wyboru, przykładowe pytanie musi miec przynajmniej taką długośc, żeby się ładnie wyświetlało",
      //   answer1: 'to jest przykładowa POPRAWNA odpowiedz a',
      //   isAnswer1Correct: true,
      //   answer2: 'to jest przykładowa odpowiedz b',
      //   isAnswer2Correct:false,
      //   answer3: 'to jest przykładowa odpowiedz c',
      //   isAnswer3Correct:false,
      //   answer4: 'to jest przykładowa odpowiedz d',
      //   isAnswer4Correct:false
      // }
      // console.log(newOCQuestion);
      this.$store.dispatch('updateDBquestions');
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
