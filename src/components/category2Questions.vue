<template>
	<div id="cat2QuestionsStack">

		<v-layout class="mt-4"
		 v-for="oCQuestion in categoryWychowanieMetodaMetodyki.oneChoiceQuestions"
		 :key="oCQuestion.question">
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
									Wybrano: {{oCQuestion.whichAnswerChosen}}
								</p>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>
					</v-card-text>
					<v-card-actions>
						<v-radio-group v-model="oCQuestion.whichAnswerChosen">
							<v-layout column>
								<v-flex ref="OCQAnswer">
									<v-radio :label="oCQuestion.correctAnswer"
									 :value="oCQuestion.correctAnswer"></v-radio>
								</v-flex>

								<v-flex ref="OCQAnswer">
									<v-radio :label="oCQuestion.answer2"
									 :value="oCQuestion.answer2">
									</v-radio>
								</v-flex>

								<v-flex ref="OCQAnswer"
								 v-if="oCQuestion.answer3">
									<v-radio :label="oCQuestion.answer3"
									 :value="oCQuestion.answer3">
									</v-radio>
								</v-flex>

								<v-flex ref="OCQAnswer"
								 v-if="oCQuestion.answer4">
									<v-radio :label="oCQuestion.answer4"
									 :value="oCQuestion.answer4">
									</v-radio>
								</v-flex>
							</v-layout>
						</v-radio-group>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>

		<v-layout class="mt-4"
		 v-for="mCQuestion in categoryWychowanieMetodaMetodyki.multiChoiceQuestions"
		 :key="mCQuestion.question">
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
									Wybrano: {{mCQuestion.whichAnswersChosen}}
								</p>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>
					</v-card-text>
					<v-card-actions>
						<v-flex offset-md1>
							<v-radio-group row>
								<v-checkbox :label="mCQuestion.answer1"
								 v-model="mCQuestion.answer1State"></v-checkbox>
								<v-checkbox :label="mCQuestion.answer2"
								 v-model="mCQuestion.answer2State">
								</v-checkbox>
								<v-checkbox :label="mCQuestion.answer3"
								 v-model="mCQuestion.answer3State">
								</v-checkbox>
								<v-checkbox :label="mCQuestion.answer4"
								 v-model="mCQuestion.answer4State">
								</v-checkbox>
							</v-radio-group>
						</v-flex>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>

		<v-layout class="mt-4"
		 v-for="vBQuestion in categoryWychowanieMetodaMetodyki.videoBasedQuestions"
		 :key="vBQuestion.question">
			<v-flex>
				<v-card hover>
					<v-card-text primary-title>
						<v-layout row>
							<v-flex>
								<iframe class="text-xs-center"
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
									Wybrano: {{vBQuestion.whichAnswerChosen}}
								</p>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>
					</v-card-text>
					<v-card-actions>
						<v-flex offset-md1>
							<v-radio-group row
							 v-model="vBQuestion.whichAnswerChosen">
								<v-radio :label="vBQuestion.correctAnswer"
								 :value="vBQuestion.correctAnswer"></v-radio>
								<v-radio :label="vBQuestion.answer2"
								 :value="vBQuestion.answer2">
								</v-radio>
								<v-radio :label="vBQuestion.answer3"
								 :value="vBQuestion.answer3">
								</v-radio>
								<v-radio :label="vBQuestion.answer4"
								 :value="vBQuestion.answer4">
								</v-radio>
							</v-radio-group>
						</v-flex>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>

		<v-layout class="mt-4"
		 v-for="iBQuestion in categoryWychowanieMetodaMetodyki.imageBasedQuestions"
		 :key="iBQuestion.question">
			<v-flex>
				<v-card hover>
					<v-card-text primary-title>
						<v-layout row>
							<v-flex>
								<iframe class="text-xs-center"
								 id="testImage"
								 :src="iBQuestion.imageURLForThisTest"
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
						<v-flex>
							<v-text-field label="Tu odpowiedz na pytanie"
							 textarea
							 v-model="iBQuestion.candidatesAnswer"></v-text-field>
						</v-flex>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>

		<v-layout class="mt-4"
		 v-for="tFQuestion in categoryWychowanieMetodaMetodyki.textFieldQuestions"
		 :key="tFQuestion.question">
			<v-flex>
				<v-card hover>
					<v-card-text primary-title
					 class="pb-0">
						<v-layout row>
							<v-flex>
								<h5 v-if="tFQuestion.variant2">
									{{tFQuestion.variant2}}
									{{drawWhichTFQuestionVariantToShow(tFQuestion)}}
									<!-- TODO: make it so it displays random variants of the question, not just the second one -->
									<!-- TODO: Steps to do: 1. Create tFQuestion.howManyVariants variable on Firebase. 2.Darw a random one-off draw and assign the results to tFQuestion.drawResult (how will it know to reach it ??) 3. show the variant here -->
								</h5>
								<h5 v-else>
									{{tFQuestion.question}}
								</h5>
							</v-flex>
						</v-layout>
						<v-divider></v-divider>
					</v-card-text>
					<v-card-actions>
						<v-flex>
							<v-text-field label="Tu odpowiedz na pytanie"
							 textarea
							 v-model="tFQuestion.candidatesAnswer"></v-text-field>
						</v-flex>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>

		<v-layout class="mt-3">
			<v-flex>
				<v-btn block
				 secondary
				 dark
				 @click="saveTheAnswers">
					ZAPISZ SWOJE ODPOWIEDZI Z TEGO DZIAŁU
				</v-btn>
			</v-flex>
		</v-layout>

		<v-snackbar :timeout="timeout"
		 top='top'
		 v-model="snackbar">
			Zapisano odpowiedzi z tego działu!
			<v-btn flat
			 class="pink--text"
			 @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>

	</div>
</template>
<script>
export default {
  name: "cat2Questions",
  data() {
    return {
      snackbar: false,
      timeout: 1300
    };
  },
  computed: {
    categoryWychowanieMetodaMetodyki() {
      return this.$store.state.categoryWychowanieMetodaMetodyki;
    },
    oneChoiceQuestions() {
      return this.$store.state.categoryWychowanieMetodaMetodyki
        .oneChoiceQuestions;
    },
    multiChoiceQuestions() {
      return this.$store.state.categoryWychowanieMetodaMetodyki
        .multiChoiceQuestions;
    },
    videoBasedQuestions() {
      return this.$store.state.categoryWychowanieMetodaMetodyki
        .videoBasedQuestions;
    },
    imageBasedQuestions() {
      return this.$store.state.categoryWychowanieMetodaMetodyki
        .imageBasedQuestions;
    },
    textFieldQuestions() {
      return this.$store.state.categoryWychowanieMetodaMetodyki
        .textFieldQuestions;
    }
  },
  methods: {
    drawWhichTFQuestionVariantToShow(tFQuestion) {
      // Count how many variants are there (as we could save additional datafield for each multiple-variants question but that would require changing the already deployed database of questions and introduce room for error in integrity ... )
      let count = 1;
      while (true) {
        if (tFQuestion[`variant${count}`]) {
          count++;
        } else {
          break;
        }
      }
      randomDraw = Math.floor(Math.random() * count + 1);
      tFQuestion.whichVariantDrawn = randomDraw;
      if (randomDraw === 0) {
        return tFQuestion.question;
      } else {
        return tFQuestion[`variant${randomDraw}`];
      }
    },
    displayArrayAnswersCorrectly(arrayAnswer) {
      console.log(arrayAnswer);
      if (arrayAnswer) {
        if (arrayAnswer.length == 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    saveTheAnswers() {
      let categoryWychowanieMetodaMetodykiAnswers = {
        oneChoiceQuestions: [],
        multiChoiceQuestions: [],
        videoBasedQuestions: [],
        imageBasedQuestions: [],
        textFieldQuestions: []
      };

      if (this.oneChoiceQuestions) {
        for (var i = 0; i < this.oneChoiceQuestions.length; i++) {
          let dataFormattedObject = {
            question: this.oneChoiceQuestions[i].question,
            difficultyLevel: this.oneChoiceQuestions[i].difficultyLevel,
            starredQuestion: this.oneChoiceQuestions[i].starredQuestion,
            candidatesAnswer: this.oneChoiceQuestions[i].whichAnswerChosen,
            correctAnswer: this.oneChoiceQuestions[i].correctAnswer,
            isAnswerCorrect: null
          };
          categoryWychowanieMetodaMetodykiAnswers.oneChoiceQuestions.push(
            dataFormattedObject
          );
        }
      }

      if (this.multiChoiceQuestions) {
        for (var i = 0; i < this.multiChoiceQuestions.length; i++) {
          let dataFormattedObject = {
            question: this.multiChoiceQuestions[i].question,
            difficultyLevel: this.multiChoiceQuestions[i].difficultyLevel,
            starredQuestion: this.multiChoiceQuestions[i].starredQuestion,
            whichAnswersChosen: this.multiChoiceQuestions[i].whichAnswersChosen,
            correctAnswers: this.multiChoiceQuestions[i].correctAnswers,
            isAnswerCorrect: null,
            questionAnswerScore: 0
          };
          categoryWychowanieMetodaMetodykiAnswers.multiChoiceQuestions.push(
            dataFormattedObject
          );
        }
      }

      if (this.videoBasedQuestions) {
        for (i = 0; i < this.videoBasedQuestions.length; i++) {
          let dataFormattedObject = {
            question: this.videoBasedQuestions[i].question,
            difficultyLevel: this.videoBasedQuestions[i].difficultyLevel,
            starredQuestion: this.videoBasedQuestions[i].starredQuestion,
            candidatesAnswer: this.videoBasedQuestions[i].whichAnswerChosen,
            isAnswerCorrect: null
          };
          categoryWychowanieMetodaMetodykiAnswers.videoBasedQuestions.push(
            dataFormattedObject
          );
        }
      }

      if (this.imageBasedQuestions) {
        for (i = 0; i < this.imageBasedQuestions.length; i++) {
          let dataFormattedObject = {
            question: this.imageBasedQuestions[i].question,
            difficultyLevel: this.imageBasedQuestions[i].difficultyLevel,
            starredQuestion: this.imageBasedQuestions[i].starredQuestion,
            candidatesAnswer: this.imageBasedQuestions[i].candidatesAnswer,
            isAnswerCorrect: null,
            imageURLForThisTest: this.imageBasedQuestions[i].imageURLForThisTest
          };
          categoryWychowanieMetodaMetodykiAnswers.imageBasedQuestions.push(
            dataFormattedObject
          );
        }
      }

      if (this.textFieldQuestions) {
        for (i = 0; i < this.textFieldQuestions.length; i++) {
          let theQuestion;
          if (this.textFieldQuestions[i].whichVariantDrawn) {
            theQuestion = this.textFieldQuestions[i][
              `variant${whichVariantDrawn}`
            ];
          } else {
            theQuestion = this.textFieldQuestions[i].question;
          }
          let dataFormattedObject = {
            question: theQuestion,
            difficultyLevel: this.textFieldQuestions[i].difficultyLevel,
            starredQuestion: this.textFieldQuestions[i].starredQuestion,
            candidatesAnswer: this.textFieldQuestions[i].candidatesAnswer,
            isAnswerCorrect: null,
            examinersNotes: ""
          };
          categoryWychowanieMetodaMetodykiAnswers.textFieldQuestions.push(
            dataFormattedObject
          );
        }
      }

      console.log("Dispatchuję 'updateCurrentExamAnswers'");
      this.$store.dispatch(
        "updateCurrentExamAnswers",
        "categoryWychowanieMetodaMetodyki"
      );
      console.log("------------Jeszcze w komponencie -------------");
      console.log(
        "to są wszystkie odpowiedzi które chce zapisac z tej kategorii"
      );
      console.log(categoryWychowanieMetodaMetodykiAnswers);
      this.$store.commit(
        "mapTheSecondCategoryAnswers",
        categoryWychowanieMetodaMetodykiAnswers
      );
      this.snackbar = true;
    }
  },
  mounted() {
    setTimeout(() => {
      let test = this.$refs;
      for (const key in test) {
        if (test.hasOwnProperty(key) && key == "OCQAnswer") {
          const answer = test[key];
          for (let i = 0; i < answer.length; i++) {
            let randomOrder = Math.round(Math.random() * 12);
            answer[i].className = `flex order-xs${randomOrder}`;
          }
        }
      }
    }, 2000);
  }
};
</script>
<style scoped>
</style>
