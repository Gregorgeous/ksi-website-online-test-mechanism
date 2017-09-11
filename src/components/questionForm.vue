<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h3>Tutaj będzie licznik z czasem do końca: ....</h3>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <h4 style="text-decoration:underline">
          Oto lista pytań na które odpowiadasz:
        </h4>
      </v-flex>
    </v-layout>
    <form class="testForm"
    action="/"
    method="post"
    @submit.prevent = "checkTheAnswers"
    >



    <h5 class="text-xs-left mb-1 mt-4 ">Pytania z działu I. : Wiedza o organizacji</h5>
    <v-divider></v-divider>

    <cat1Questions></cat1Questions>

    <h5 class="text-xs-left mb-1 mt-4 ">Pytania z działu II. : Wychowanie, metoda harcerska i metodyka</h5>
    <v-divider></v-divider>

    <cat2Questions></cat2Questions>

    <h5 class="text-xs-left mb-1 mt-4 ">Pytania z działu III. : Bezpieczeństwo</h5>
    <v-divider></v-divider>

    <cat3Questions></cat3Questions>

    <h5 class="text-xs-left mb-1 mt-4 ">Pytania z działu IV. : Idea i historia</h5>
    <v-divider></v-divider>

    <cat4Questions></cat4Questions>

    <v-layout>
      <v-flex>
        <v-btn round primary dark class="mt-5" type="submit"> Zapisz i zakończ test </v-btn>
        <!-- <v-btn round primary dark class="mt-5" @click='saveTheAnswers'> testButton</v-btn>
        <v-btn round primary dark class="mt-5" @click='checkTheAnswers'> CHECK THE ANSWERS!</v-btn> -->
      </v-flex>
    </v-layout>
  </form>

  <div class="text-xs-center">
      <v-pagination :length="4" v-model="page" circle></v-pagination>
  </div>

  </v-container>
</template>

<script>
import cat1Questions from './category1Questions.vue'
import cat2Questions from './category2Questions.vue'
import cat3Questions from './category3Questions.vue'
import cat4Questions from './category4Questions.vue'

export default {
  name: 'questionForm',
  components: {
    cat1Questions,
    cat2Questions,
    cat3Questions,
    cat4Questions
  },
  data () {
    return {
      page: 0
    }
  },
  methods: {
    checkTheAnswers () {
      this.$store.commit('checkTheAnswers');
      console.log('sprawdzam !');

      console.log("przenoszę na inną stronę");
      this.$router.push('/examiners-dashboard');
    }
  },
  computed: {
    // countUpQuestions () {
    //   return this.$store.getters.countUpQuestions;
    // }
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
</style>
