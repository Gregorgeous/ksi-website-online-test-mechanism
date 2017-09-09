// var checkOneChoiceQuestionsAnswers = (state) => {
//
//   if (state.candidatesAnswers.oneChoiceQuestions[0].candidatesAnswer != null ) {
//     for (var i = 0; i < state.oneChoiceQuestions.length; i++) {
//       for (var j = 0; j < state.candidatesAnswers.oneChoiceQuestions.length; j++) {
//         if (state.candidatesAnswers.oneChoiceQuestions[j].question === state.oneChoiceQuestions[i].question){
//           if (state.candidatesAnswers.oneChoiceQuestions[j].candidatesAnswer === state.oneChoiceQuestions[i].correctAnswer) {
//             state.candidatesAnswers.oneChoiceQuestions[j].isAnswerCorrect = true;
//           }
//           else if (state.candidatesAnswers.oneChoiceQuestions[j].candidatesAnswer !== state.oneChoiceQuestions[i].correctAnswer) {
//             state.candidatesAnswers.oneChoiceQuestions[j].isAnswerCorrect = false;
//           }
//           else {
//             state.candidatesAnswers.oneChoiceQuestions[j].isAnswerCorrect = 'not true, nor false, something went wrong..';
//           }
//         }
//       }
//     }
//   }
// }
//
// var checkVideoBasedQuestionsAnswers = (state) => {
//
//   if (state.candidatesAnswers.videoBasedQuestions[0].candidatesAnswer != null ) {
//     for (var i = 0; i < state.videoBasedQuestions.length; i++) {
//       for (var j = 0; j < state.candidatesAnswers.videoBasedQuestions.length; j++) {
//         if (state.candidatesAnswers.videoBasedQuestions[j].question === state.videoBasedQuestions[i].question){
//           if (state.candidatesAnswers.videoBasedQuestions[j].candidatesAnswer === state.videoBasedQuestions[i].correctAnswer) {
//             state.candidatesAnswers.videoBasedQuestions[j].isAnswerCorrect = true;
//           }
//           else if (state.candidatesAnswers.videoBasedQuestions[j].candidatesAnswer !== state.videoBasedQuestions[i].correctAnswer) {
//             state.candidatesAnswers.videoBasedQuestions[j].isAnswerCorrect = false;
//           }
//           else {
//             state.candidatesAnswers.videoBasedQuestions[j].isAnswerCorrect = 'not true, nor false, something went wrong..';
//           }
//         }
//       }
//     }
//   }
//
// }
//
// var checkImageBasedQuestionsAnswers = (state) => {
//
//   if (state.candidatesAnswers.imageBasedQuestions[0].candidatesAnswer != null ) {
//     for (var i = 0; i < state.imageBasedQuestions.length; i++) {
//       for (var j = 0; j < state.candidatesAnswers.imageBasedQuestions.length; j++) {
//         if (state.candidatesAnswers.imageBasedQuestions[j].question === state.imageBasedQuestions[i].question){
//           if (state.candidatesAnswers.imageBasedQuestions[j].candidatesAnswer === state.imageBasedQuestions[i].correctAnswer) {
//             state.candidatesAnswers.imageBasedQuestions[j].isAnswerCorrect = true;
//           }
//           else if (state.candidatesAnswers.imageBasedQuestions[j].candidatesAnswer !== state.imageBasedQuestions[i].correctAnswer) {
//             state.candidatesAnswers.imageBasedQuestions[j].isAnswerCorrect = false;
//           }
//           else {
//             state.candidatesAnswers.imageBasedQuestions[j].isAnswerCorrect = 'not true, nor false, something went wrong..';
//           }
//         }
//       }
//     }
//   }
//
// }
//
//
// module.exports = {
//   checkOneChoiceQuestionsAnswers,
//   checkVideoBasedQuestionsAnswers,
//   checkImageBasedQuestionsAnswers
// };
