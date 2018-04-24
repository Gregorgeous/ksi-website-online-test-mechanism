<template>
  <v-container class="mt-5">
    <v-toolbar :class="[countdownToolbarColor]" fixed>
      <v-flex>
        <v-toolbar-title>Test trwa, pozostało czasu:</v-toolbar-title>
        <!-- <v-spacer></v-spacer> -->
        <CountDown ref="countdown" :time="inititalTestTime" @onProgress="countDownProgress" @onFinish="countDownFinished">
          minut: {{displayMinutesLeft}} , sekund: {{displaySecondsLeft}} .
        </CountDown>
      </v-flex>
    </v-toolbar>

    <v-layout class="mt-2">
      <v-flex>
        <h4 style="text-decoration:underline">
          Oto lista pytań na które odpowiadasz:
        </h4>
      </v-flex>
    </v-layout>



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

    <!--  Dialog(vuetify)/modal(bootstrap) form for finishing the test -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent width="50%">
        <v-btn class="mt-5" primary round dark slot="activator">Zakończ test</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">
              Poczekaj ...
            </span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <p>Czy chcesz już na pewno zakończyć test ?</p>
                <p>UWAGA! Jeśli w czasie testu odświeżałeś/aś stronę - przed zakończeniem zapisz jeszcze raz swoje odpowiedzi
                  w KAŻDEJ kategorii pytań (klikając czarne przyciski "zapisz odpowiedzi z tej kategorii") </p>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <!-- TODO: Improve the alignment here for responsive design -->
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">anuluj</v-btn>
            <v-btn class="blue--text darken-1" flat @click='saveTheTest'>zapisz i zakończ test!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- <div class="text-xs-center">
      <v-pagination :length="4" v-model="page" circle></v-pagination>
  </div> -->



  </v-container>
</template>

<script>
  import cat1Questions from './category1Questions.vue'
  import cat2Questions from './category2Questions.vue'
  import cat3Questions from './category3Questions.vue'
  import cat4Questions from './category4Questions.vue'
  import CountDown from 'vuejs-count-down'

  export default {
    name: 'questionForm',
    components: {
      cat1Questions,
      cat2Questions,
      cat3Questions,
      cat4Questions,
      CountDown
    },
    data() {
      return {
        testIsStillLoadingUp: true,
        page: 0,
        dialog: false,
        myInitialTestTime: 0,
        testTime: 0,
        TestHasStarted: false,
        countDownSeconds: 0,
        countdownToolbarColor: 'teal lighten-4'
      }
    },
    methods: {
      countDownProgress(time) {
        this.countDownSeconds = time;
        if (time > 0 && this.fetchingTestDone) {
          this.$store.commit('syncExamTimeInMemory', time);
        }
      },
      countDownFinished() {
        // TODO: figure some way out how to correctly removeExamTimeFromMemory - if you uncomment the below, apart from deleting it from memory once it REALLY finished the exam, it also accidentally deletes the thing in local storage whenever you enter it after test interruption (which defeates the purpose!)  
        // restart when countdown ends 
        this.$refs.countdown.$emit('restart')
        if (this.fetchingTestDone) {
          console.log("==== I'm from 'countDownFinished()' method === ");
          console.log(
            "... and I should only appear if the counter has REALLY finished (not the edge case when it finished only because there the test time wasn't even initialized thus is 0"
          );
          this.$store.commit('removeExamTimeFromMemory');
        }

      },
      checkTheAnswers() {
        this.$store.commit('checkTheAnswers');
        console.log('sprawdzam !');

        console.log("przenoszę na inną stronę");
        this.$router.push('/examiners-dashboard');
      },
      saveTheTest() {
        this.dialog = false;
        this.$store.commit('checkTheAnswers');
        console.log('sprawdzam !');

        console.log("przenoszę na inną stronę");
        this.$router.push('/examiners-dashboard');
      }
    },
    computed: {
      fetchingTestDone() {
        return this.$store.state.fetchingTestDone;
      },
      thisCandidate() {
        return this.$store.state.candidateDetails;
      },
      inititalTestTime() {
        return this.$store.state.totalExamTime;
      },
      displayMinutesLeft() {
        if ((this.countDownSeconds / 60) <= 3) {
          this.countdownToolbarColor = 'red accent-4'
        } else if ((this.countDownSeconds / 60) <= 8) {
          this.countdownToolbarColor = 'red accent-1'
        } else if ((this.countDownSeconds / 60) <= 20) {
          this.countdownToolbarColor = 'orange accent-1'
        } else if ((this.countDownSeconds / 60) > 20) {
          this.countdownToolbarColor = 'light-green lighten-3'
        }
        if (this.countDownSeconds % 60 == 0) {
          return Math.ceil((this.countDownSeconds + 1) / 60);
        } else {
          return Math.ceil(this.countDownSeconds / 60);
        }
      },
      displaySecondsLeft() {
        return this.countDownSeconds % 60;
      },
      startTestTimer() {
        if (this.initialTestTime > 0) {
          this.myInitialTestTime = this.initialTestTime;
        }
      }
    },
    watch: {
      myInitialTestTime: function () {
        console.log("I am triggered!");

        if (!this.TestHasStarted) {
          this.TestHasStarted = true;
          this.testIsStillLoadingUp = false;
          this.testTime = this.myInitialTestTime;
          this.$refs.countdown.$emit('start')
        }
      }
    },
    created() {
      //do something after creating vue instance
      this.$store.dispatch('fetchTheCandidateData');
      this.$store.dispatch('fetchQuestionsWhenPageRefreshed');

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

</style>
