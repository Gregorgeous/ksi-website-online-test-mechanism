<template>
  <div id="cat4QuestionsStack">

    <v-layout
    class="mt-4"
    v-for="(oCQuestion, index) in categoryIdeaIHistoria.oneChoiceQuestions"
    :key="index">
    <v-flex>
      <v-card hover>
        <v-card-text primary-title>
          <v-layout>
            <h5>
              {{oCQuestion.question}}
            </h5>
          </v-layout>
          <v-layout row>
            <v-flex>
              <p v-if="oCQuestion.whichAnswerChosen">
                Wybrano:  {{oCQuestion.whichAnswerChosen}}
              </p>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-flex offset-md1>
            <v-radio-group row v-model="oCQuestion.whichAnswerChosen">
              <v-radio
              :label="oCQuestion.correctAnswer"
              :value="oCQuestion.correctAnswer"
              ></v-radio>
              <v-radio
              :label="oCQuestion.answer2"
              :value="oCQuestion.answer2"
              >
            </v-radio>
            <v-radio
            v-if="oCQuestion.answer3"
            :label="oCQuestion.answer3"
            :value="oCQuestion.answer3"
            >
          </v-radio>
          <v-radio
          v-if="oCQuestion.answer4"
          :label="oCQuestion.answer4"
          :value="oCQuestion.answer4"
          >
        </v-radio>
      </v-radio-group>
    </v-flex>
  </v-card-actions>
</v-card>
</v-flex>
</v-layout>

<v-layout
class="mt-4"
v-for="(mCQuestion, index) in categoryIdeaIHistoria.multiChoiceQuestions"
:key="index">
<v-flex>
  <v-card hover>
    <v-card-text primary-title>
      <v-layout>
        <h5>
          {{mCQuestion.question}}
        </h5>
      </v-layout>
      <v-layout row>
        <v-flex>
          <p v-if="mCQuestion.whichAnswersChosen">
            Wybrano:  {{mCQuestion.whichAnswersChosen}}
          </p>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card-text>
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

<v-layout
class="mt-4"
v-for="(vBQuestion, index) in categoryIdeaIHistoria.videoBasedQuestions"
:key="index">
<v-flex>
  <v-card hover>
    <v-card-text primary-title>
      <v-layout row>
        <v-flex>
          <iframe
          class="text-xs-center"
          id="testImage"
          :src="vBQuestion.videoURL"
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
    <v-layout row>
      <v-flex>
        <p v-if="vBQuestion.whichAnswerChosen">
          Wybrano:  {{vBQuestion.whichAnswerChosen}}
        </p>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
  </v-card-text>
  <v-card-actions>
    <v-flex offset-md1>
      <v-radio-group row v-model="vBQuestion.whichAnswerChosen">
        <v-radio
        :label="vBQuestion.correctAnswer"
        :value="vBQuestion.correctAnswer"></v-radio>
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

<v-layout
class="mt-4"
v-for="(iBQuestion, index) in categoryIdeaIHistoria.imageBasedQuestions"
:key="index">
<v-flex>
  <v-card hover>
    <v-card-text primary-title>
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
    <v-layout row>
      <v-flex>
        <p v-if="iBQuestion.whichAnswerChosen">
          Wybrano:  {{iBQuestion.whichAnswerChosen}}
        </p>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
  </v-card-text>
  <v-card-actions>
    <v-flex offset-md1>
      <v-radio-group row v-model="iBQuestion.whichAnswerChosen">
        <v-radio
        :label="iBQuestion.correctAnswer"
        :value="iBQuestion.correctAnswer"></v-radio>
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

<v-layout
class="mt-4"
v-for="(tFQuestion, index) in categoryIdeaIHistoria.textFieldQuestions"
:key="index">
<v-flex>
  <v-card hover>
    <v-card-text primary-title class="pb-0">
      <v-layout row>
        <v-flex>
          <h5 v-if="tFQuestion.variant2">
            {{tFQuestion.variant2}}
            <!-- TODO: make it so it displays random variants of the question, not just the second one -->
          </h5>
          <h5 v-else>
            {{tFQuestion.question}}
          </h5>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-actions>
      <v-flex >
        <v-text-field
        :name="index"
        label="Tu odpowiedz na pytanie"
        textarea
        v-model="tFQuestion.candidatesAnswer"
        ></v-text-field>
      </v-flex>
    </v-card-actions>
  </v-card>
</v-flex>
</v-layout>

<v-layout class="mt-3">
  <v-flex>
    <v-btn block secondary dark @click="saveTheAnswers">
      ZAPISZ SWOJE ODPOWIEDZI Z TEGO DZIAŁU
    </v-btn>
  </v-flex>
</v-layout>

</div>
</template>
<script>
export default {
  name: "cat4Questions",
  data () {
    return {

    }
  },
  computed: {
    categoryIdeaIHistoria () {
      return this.$store.state.categoryIdeaIHistoria;
    },
    oneChoiceQuestions () {
      return this.$store.state.categoryIdeaIHistoria.oneChoiceQuestions;
    },
    multiChoiceQuestions () {
      return this.$store.state.categoryIdeaIHistoria.multiChoiceQuestions;
    },
    videoBasedQuestions () {
      return this.$store.state.categoryIdeaIHistoria.videoBasedQuestions;
    },
    imageBasedQuestions () {
      return this.$store.state.categoryIdeaIHistoria.imageBasedQuestions;
    },
    textFieldQuestions () {
      return this.$store.state.categoryIdeaIHistoria.textFieldQuestions;
    }
  },
  methods: {
    saveTheAnswers() {
      let categoryIdeaIHistoria = {
        oneChoiceQuestions: [] ,
        videoBasedQuestions: [] ,
        imageBasedQuestions: [] ,
        textFieldQuestions: []
      };
      if (this.oneChoiceQuestions) {
        for (var i = 0; i < this.oneChoiceQuestions.length; i++) {
          let dataFormattedObject = {
            question: this.oneChoiceQuestions[i].question,
            candidatesAnswer: this.oneChoiceQuestions[i].whichAnswerChosen,
            correctAnswer: this.oneChoiceQuestions[i].correctAnswer,
            isAnswerCorrect: null
          }
          categoryIdeaIHistoria.oneChoiceQuestions.push(dataFormattedObject);
        }
      }

      if (this.videoBasedQuestions) {
        for (i = 0; i < this.videoBasedQuestions.length; i++) {
          let dataFormattedObject = {
            question: this.videoBasedQuestions[i].question,
            candidatesAnswer: this.videoBasedQuestions[i].whichAnswerChosen,
            isAnswerCorrect: null
          }
          categoryIdeaIHistoria.videoBasedQuestions.push(dataFormattedObject);
        }
      }

      if (this.imageBasedQuestions) {
        for (i = 0; i < this.imageBasedQuestions.length; i++) {
          let dataFormattedObject = {
            question: this.imageBasedQuestions[i].question,
            candidatesAnswer: this.imageBasedQuestions[i].candidatesAnswer,
            isAnswerCorrect: null
          }
          categoryIdeaIHistoria.imageBasedQuestions.push(dataFormattedObject);
        }
      }

      if (this.textFieldQuestions) {
      for (i = 0; i < this.textFieldQuestions.length; i++) {
        let dataFormattedObject = {
          question: this.textFieldQuestions[i].question,
          candidatesAnswer: this.textFieldQuestions[i].candidatesAnswer,
          isAnswerCorrect: null
        }
        categoryIdeaIHistoria.textFieldQuestions.push(dataFormattedObject);
      }
    }
    console.log("Dispatchuję 'updateCurrentExamAnswers'");
    this.$store.dispatch('updateCurrentExamAnswers','categoryIdeaIHistoria')
    console.log("------------Jeszcze w komponencie -------------");
    console.log("to są wszystkie odpowiedzi które chce zapisac z tej kategorii");
    console.log(categoryIdeaIHistoria);
    this.$store.commit('mapTheFourthCategoryAnswers', categoryIdeaIHistoria)
  }
}
}
</script>
<style scoped>
</style>
