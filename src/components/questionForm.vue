<template>
  <v-container class="mt-5">
    <v-toolbar :class="[countdownToolbarColor]" fixed>
      <v-layout wrap>
        <v-flex xs8>
          <v-toolbar-title v-if="testHasReallystarted">Test trwa, pozostało czasu:</v-toolbar-title>
          <v-toolbar-title v-else>Test rozpocznie się za:</v-toolbar-title>
          <CountDown ref="countdown" :time="inititalTestTime" @onProgress="countDownProgress" @onFinish="countDownFinished">
            minut: {{displayMinutesLeft}} , sekund: {{displaySecondsLeft}} .
          </CountDown>
        </v-flex>
        <v-flex xs4>
          <v-btn @click="breakInTheTestDialog = true">
            Zatrzymaj test
          </v-btn>
        </v-flex>
      </v-layout>
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
    
    <!--  Similar dialog appearing when admin wants to do a break in the test -->
    <v-layout row justify-center>
      <v-dialog v-model="breakInTheTestDialog" persistent width="50%">
        <v-card v-if="!adminReAuthenticated">
          <v-card-title primary-title>
            <v-flex>
              <div>
                <h3 class="headline ">Aby zatrzymać test, zaloguj się ponownie</h3>
              </div>
            </v-flex>
          </v-card-title>
          <v-divider></v-divider>
          <form action='submit' method="post" autocomplete="new-password" >
            <input autocomplete="false" name="hidden" type="text" style="display:none;">
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="email" type='email' v-model="email" aria-autocomplete="new-password">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <input autocomplete="false" name="hidden" type="text" style="display:none;">
                  <v-text-field label="hasło" type='password' v-model="password" aria-autocomplete="new-password">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-flex>
                <v-btn flat class="brown--text" @click="cancelBreakingTheTest">
                  Cofnij
                </v-btn>
                <v-btn flat :loading="isLoading" :disabled="isLoading" class="orange--text" @click="adminSignInForBreakInTest">
                  Zaloguj
                </v-btn>
              </v-flex>
            </v-card-actions>
          </form>
          <v-alert warning transition="scale-transition" :value="errorInForm" class="text-xs-center">
            {{errorMessage}}
          </v-alert>
        </v-card>

        <v-card v-else>
          <v-layout>
            <v-flex>
              <h5>Czas zatrzymany ... a przynajmniej na moment :> </h5>

            </v-flex>
          </v-layout>
          <v-layout>
            <img src="static/Time-Bomb-test-stopped.png" width="100%" height="30%" alt="a ticking timer in a bomb indicating that the test has been stopped for a moment">
          </v-layout>
          <v-layout>
            <v-flex>
              <v-btn round class="error" @click="carryOnTheTest">
                kontynuuj test
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>

      </v-dialog>
    </v-layout>

      <v-dialog v-model="endOfTimeDialog" fullscreen>
        <v-card>
          <v-card-title>
            <span class="headline">
              Koniec czasu ! 
            </span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <p> Teraz przekaż urządzenie w ręce administratora aby mógł ocenić twoje odpowiedzi :) </p>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click='saveTheTest'>Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    



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
        testHasReallystarted: false,
        countDownSeconds: 0,
        countdownToolbarColor: 'teal lighten-4',
        breakInTheTestDialog: false,
        email: '',
        password: '',
        errorInForm: false,
        errorMessage: '',
        adminReAuthenticated: false,
        endOfTimeDialog: false
      }
    },
    methods: {
      cancelBreakingTheTest(){
        this.email = '';
        this.password = '';
        this.breakInTheTestDialog = false;
      },
      carryOnTheTest() {
        this.breakInTheTestDialog = false;
        this.email = '';
        this.password = '';
        this.adminReAuthenticated = false;
        this.$refs.countdown.$emit('start');
      },
      adminSignInForBreakInTest() {
        if (this.email == '' || this.password == '') {
          this.errorInForm = true;
          this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
        } else if (this.password.length < 6) {
          this.errorInForm = true;
          this.errorMessage = 'Twoje hasło ma przynajmniej 6 znaków..';
        } else {
          this.$store.dispatch('adminSignInForBreakInTest', {
              email: this.email,
              password: this.password
            })
            .then((result) => {
              console.log("result of promise", result);
              if (result === false) {
                this.errorInForm = true;
                this.errorMessage = 'Hasło lub email się nie zgadzają';
                this.adminReAuthenticated = false;
              } else {
                this.errorInForm = false;
                this.errorMessage = '';
                this.adminReAuthenticated = true;
                this.$refs.countdown.$emit('stop');
              }
            })
        }
      },
      countDownProgress(time) {
        this.countDownSeconds = time;
        if (time > 0 && this.fetchingTestDone) {
          this.$store.commit('syncExamTimeInMemory', time);
        }
      },
      countDownFinished() {
        if (this.testHasReallystarted) {
          this.$store.commit('removeExamTimeFromMemory');
          this.endOfTimeDialog = true;
        }else{
          this.$refs.countdown.$emit('restart');
          this.testHasReallystarted = true;
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
      isLoading() {
        return this.$store.state.loadingState;
      },
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
          return Math.ceil((this.countDownSeconds + 1) / 60) -1;
        } else {
          return Math.ceil(this.countDownSeconds / 60) - 1;
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
      breakInTheTestDialog:function(){
        if (this.breakInTheTestDialog) {
          this.email = '';
          this.password = '';
        }
      },
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
    },
    mounted(){
      console.log("tu jestem!");
      if (localStorage.getItem('examTime')) {
        this.testHasReallystarted = true;
      }
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


  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */

    {
    transform: translateX(10px);
    opacity: 0;
  }

</style>
