var checkOneChoiceQuestionsAnswers = (state, catOfQuestions, thisCatCandAnswers) => {


  if (thisCatCandAnswers.oneChoiceQuestions.length > 0 && catOfQuestions.oneChoiceQuestions) {
    for (var i = 0; i < catOfQuestions.oneChoiceQuestions.length; i++) {
      for (var j = 0; j < thisCatCandAnswers.oneChoiceQuestions.length; j++) {
        if (thisCatCandAnswers.oneChoiceQuestions[j].question === catOfQuestions.oneChoiceQuestions[i].question){
          if (thisCatCandAnswers.oneChoiceQuestions[j].candidatesAnswer === catOfQuestions.oneChoiceQuestions[i].correctAnswer) {
            thisCatCandAnswers.oneChoiceQuestions[j].isAnswerCorrect = true;
          }
          else if (thisCatCandAnswers.oneChoiceQuestions[j].candidatesAnswer !== catOfQuestions.oneChoiceQuestions[i].correctAnswer) {
            thisCatCandAnswers.oneChoiceQuestions[j].isAnswerCorrect = false;
          }
          else {
            thisCatCandAnswers.oneChoiceQuestions[j].isAnswerCorrect = 'not true, nor false, something went wrong..';
          }
        }
      }
    }
  }

}

var checkVideoBasedQuestionsAnswers = (state, catOfQuestions, thisCatCandAnswers) => {

  if (thisCatCandAnswers.videoBasedQuestions.length > 0 && catOfQuestions.videoBasedQuestions) {
    for (var i = 0; i < catOfQuestions.videoBasedQuestions.length; i++) {
      for (var j = 0; j < thisCatCandAnswers.videoBasedQuestions.length; j++) {
        if (thisCatCandAnswers.videoBasedQuestions[j].question === catOfQuestions.videoBasedQuestions[i].question){
          if (thisCatCandAnswers.videoBasedQuestions[j].candidatesAnswer === catOfQuestions.videoBasedQuestions[i].correctAnswer) {
            thisCatCandAnswers.videoBasedQuestions[j].isAnswerCorrect = true;
          }
          else if (thisCatCandAnswers.videoBasedQuestions[j].candidatesAnswer !== catOfQuestions.videoBasedQuestions[i].correctAnswer) {
            thisCatCandAnswers.videoBasedQuestions[j].isAnswerCorrect = false;
          }
          else {
            thisCatCandAnswers.videoBasedQuestions[j].isAnswerCorrect = 'not true, nor false, something went wrong..';
          }
        }
      }
    }
  }
}

module.exports = {
  checkOneChoiceQuestionsAnswers,
  checkVideoBasedQuestionsAnswers
};
