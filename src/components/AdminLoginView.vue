<template >
  <div class="parent">
    <!--TODO: add srcset and handling between small and large ver of the img -->
    <img class="elevation-4" src="/static/navbarSM.png" alt="Navigation bar logo of the Warsaw-zoliborz district" id="navbar"/>

    <div id="adminLoginPanel">

      <v-layout class="mx-3 d-inline-flex">
        <v-flex>
          <v-card id="titleCard">
            <v-card-title primary-title class="text-xs-center">
              <h3 class="headline mb-0 text-xs-center">Platforma testowa KSI Warszawa-Żoliborz</h3>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout class="mt-0" >
        <v-flex xs10 offset-xs1 md6 offset-md3 >
          <v-card class="mp-5 my-5  elevation-10">
            <v-card-title primary-title>
              <v-flex>
                <div>
                  <h3 class="headline ">Login administratora</h3>
                </div>
              </v-flex>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                  label="email"
                  type='email'
                  v-model="email">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="hasło"
                type='password'
                v-model="password">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-flex>
            <v-btn flat class="orange--text" @click="adminSignIn">
              Zaloguj
            </v-btn>
          </v-flex>
        </v-card-actions>
        <v-layout v-if="isLoading" transition="scale-transition" row>
          <v-flex class="text-xs-center">
            <v-progress-circular class="amber--text" indeterminate size="40"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
        <v-alert warning transition="scale-transition" :value="errorInForm" class="text-xs-center" >
            {{errorMessage}}
        </v-alert>
      </v-card>
    </v-flex>
  </v-layout>


</div>



</div>
</template>

<script>
// import * as firebase from "firebase"

export default {
  name: 'hello',
  data () {
    return{
      email: '',
      password: '',
      errorInForm: false,
      errorMessage: ''
    }
  },
  methods: {
    adminSignIn() {
      // console.log(this.email, this.password);
      if (this.email == '' || this.password == '') {
        this.errorInForm = true;
        this.errorMessage = 'Jedno lub więcej pól nie zostało wypełnionych!';
      } else if (this.password.length < 6) {
        this.errorInForm = true;
        this.errorMessage = 'Twoje hasło ma przynajmniej 6 znaków..';
      } else {
        this.$store.dispatch('signInAdmin', {email: this.email, password:this.password})
        .then((result) => {
          console.log("result of promise", result);
          if (result === false) {
            this.errorInForm = true;
            this.errorMessage = 'Hasło lub email się nie zgadzają';
          }
          else {
            this.errorInForm = false;
            this.errorMessage = '';
            this.$router.push('/admin-dashboard');
          }
        })
      }
    }
  },
  computed: {
    isLoading(){
      return this.$store.state.loadingState;
    }
  }
}
</script>


<style scoped>
.parent{
  display:flex;
  flex-direction: column;
  /* align-items: center; */
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
  background-image: url('/static/Campfire.jpg');
  align-self:stretch;
  background-size: cover;
  background-position-x: center;
}

#titleCard{
  background-color: rgba(255, 255, 255, 0.32);
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
