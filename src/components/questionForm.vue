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

    <h5 class="text-xs-left mb-1 mt-4 ">Pytania jednokrotnego wyboru</h5>
    <v-divider></v-divider>

    <v-layout
    class="mt-2"
    v-for="(oCQuestion, index) in oneChoiceQuestions"
    :key="index">
      <v-flex>
        <v-card hover>
          <v-card-title primary-title>
                <p>Pytanie numer {{index + 1}}</p>
                <h5>
                  {{oCQuestion.question}}
                </h5>
                <v-divider></v-divider>
              </v-card-title>
              <v-card-actions>
                <v-flex offset-md1>
                  <v-radio-group row>
                    <v-radio :label="oCQuestion.answer1" :value="oCQuestion.answer1"></v-radio>
                    <v-radio
                    :label="oCQuestion.answer2"
                    :value="oCQuestion.answer2">
                    </v-radio>
                    <v-radio
                    :label="oCQuestion.answer3"
                    :value="oCQuestion.answer3">
                    </v-radio>
                    <v-radio
                    :label="oCQuestion.answer4"
                    :value="oCQuestion.answer4">
                    </v-radio>
                  </v-radio-group>
                </v-flex>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <h5 class="text-xs-left mb-1 mt-4 ">Pytania wielokrotnego wyboru</h5>
    <v-divider></v-divider>

    <v-layout
    class="mt-2"
    v-for="(mCQuestion, index) in multiChoiceQuestions"
    :key="index">
      <v-flex>
        <v-card hover>
          <v-card-title primary-title>
                <p>Pytanie numer {{index + 1}}</p>
                <h5>
                  {{mCQuestion.question}}
                </h5>
                <v-divider></v-divider>
              </v-card-title>
              <v-card-actions>
                <v-flex offset-md1>
                  <v-radio-group row>
                    <v-checkbox
                    :label="mCQuestion.answer1" v-model="mCQuestion.answer1State"></v-checkbox>
                    <v-checkbox
                    :label="mCQuestion.answer2"
                    v-model="mCQuestion.answer2State">
                  </v-checkbox>
                    <v-checkbox
                    :label="mCQuestion.answer3"
                    v-model="mCQuestion.answer3State">
                  </v-checkbox>
                    <v-checkbox
                    :label="mCQuestion.answer4"
                    v-model="mCQuestion.answer4State">
                  </v-checkbox>
                  </v-radio-group>
                </v-flex>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <h5 class="text-xs-left mb-1 mt-4 ">Pytania w oparciu o film</h5>
    <v-divider></v-divider>

    <v-layout
    class="mt-2"
    v-for="(vBQuestion, index) in videoBasedQuestions"
    :key="index">
      <v-flex>
        <v-card hover>
          <v-card-text primary-title>
            <v-layout row>
                <p class="mt-2">Pytanie numer {{index + 1}}</p>
              </v-layout>
              <v-layout row>
                <v-flex>
                <iframe
                class="text-xs-center"
                id="testImage"
                :src="vBQuestion.imageURL"
                width="100%"
                height="400px">
                </iframe>
              </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                <h5>
                  {{vBQuestion.question}}
                </h5>
              </v-flex>
              </v-layout>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions>
                <v-flex offset-md1>
                  <v-radio-group row>
                    <v-radio :label="vBQuestion.answer1" :value="vBQuestion.answer1"></v-radio>
                    <v-radio
                    :label="vBQuestion.answer2"
                    :value="vBQuestion.answer2">
                    </v-radio>
                    <v-radio
                    :label="vBQuestion.answer3"
                    :value="vBQuestion.answer3">
                    </v-radio>
                    <v-radio
                    :label="vBQuestion.answer4"
                    :value="vBQuestion.answer4">
                    </v-radio>
                  </v-radio-group>
                </v-flex>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <h5 class="text-xs-left mb-1 mt-4 ">Pytania w oparciu o obrazek</h5>
    <v-divider></v-divider>

    <v-layout
    class="mt-2"
    v-for="(iBQuestion, index) in imageBasedQuestions"
    :key="index">
      <v-flex>
        <v-card hover>
          <v-card-text primary-title>
            <v-layout row>
                <p class="mt-2">Pytanie numer {{index + 1}}</p>
              </v-layout>
              <v-layout row>
                <v-flex>
                <iframe
                class="text-xs-center"
                id="testImage"
                :src="iBQuestion.imageURL"
                width="100%"
                height="400px">
                </iframe>
              </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                <h5>
                  {{iBQuestion.question}}
                </h5>
              </v-flex>
              </v-layout>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions>
                <v-flex offset-md1>
                  <v-radio-group row>
                    <v-radio :label="iBQuestion.answer1" :value="iBQuestion.answer1"></v-radio>
                    <v-radio
                    :label="iBQuestion.answer2"
                    :value="iBQuestion.answer2">
                    </v-radio>
                    <v-radio
                    :label="iBQuestion.answer3"
                    :value="iBQuestion.answer3">
                    </v-radio>
                    <v-radio
                    :label="iBQuestion.answer4"
                    :value="iBQuestion.answer4">
                    </v-radio>
                  </v-radio-group>
                </v-flex>
              </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    oneChoiceQuestions () {
      return this.$store.state.oneChoiceQuestions;
    },
    multiChoiceQuestions () {
      return this.$store.state.multiChoiceQuestions;
    },
    videoBasedQuestions () {
      return this.$store.state.videoBasedQuestions;
    },
    imageBasedQuestions () {
      return this.$store.state.imageBasedQuestions;
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
</style>
