<template >
  <div class="parent">
    <!--TODO: add srcset and handling between small and large ver of the img -->
    <img class="elevation-4" src="/static/navbarSM.png" alt="Navigation bar logo of the Warsaw-zoliborz district" id="navbar"/>

    <div id="adminLoginPanel">
      <v-layout class="mx-3 d-inline-flex">
        <v-flex>
          <v-card id="titleCard">
            <v-card-title primary-title class="text-xs-center">
              <h3 class="headline mb-0 text-xs-center">Panel członka KSI</h3>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout class="my-4 mx-2">
        <v-flex>

          <v-card class="" >
            <v-parallax
            id="cardImage1"
            src= '/static/startExam.jpg'
            height="300">
          </v-parallax>
          <v-card-title >
            <v-btn block to='/start-test'>
              Nowy test
            </v-btn>
          </v-card-title>
          <!--TODO: checkout what's the best practice, wrapping in vue router link or leave it with "to= '' " prop in the v-btn tag -->
          <!-- <router-link to="/start-test" > </router-link> -->
          <v-card-actions class="pt-0">
            <v-divider ></v-divider>
          </v-card-actions>
        </v-card>

        <v-card class="">
          <v-parallax
          id="cardImage2"
          src= '/static/addExamQuestions2.jpg'
          height="300">
        </v-parallax>
        <v-card-title class="pb-0">

          <v-btn block @click="snackbar = true">
            dodaj pytania do bazy pytań
          </v-btn>
        </v-card-title >
        <v-card-actions class="pt-0">
          <v-divider ></v-divider>
        </v-card-actions>
      </v-card>


      <v-card class="">
        <v-parallax
        id="cardImage3"
        src= '/static/examsDb.jpg'
        height="300">
      </v-parallax>
      <v-card-title >
        <v-btn block to="/tests-database">
          Baza testów
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
    </v-card>

  </v-flex>
</v-layout>

<v-btn outline large class="ma-0 mb-4" color="indigo" fab @click='logout'>
  wyjdź
</v-btn>

</div>



<v-snackbar
:timeout="6000"
top
v-model="snackbar"
>
Ta funkcja jeszcze nie działa, ale już wkrótce zacznie :)
<v-btn flat class='amber--text' @click="snackbar = false">Zamknij</v-btn>
</v-snackbar>
</div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return{
      snackbar: false
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.replace('/login');
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
/* #navbar > div{
margin-bottom: 0px;
} */

.parent{
  display:flex;
  flex-direction: column;
  justify-content: center;
}
#navbar{
  /* height: 90%; */
  z-index: 1;
  height: 40vh;
  /* width: 100%; */
  background-size: cover;
}

#adminLoginPanel{
  z-index: 0;
}

#cardImage2{
  background-position:top;
  justify-content:flex-start;
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
