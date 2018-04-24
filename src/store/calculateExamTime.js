var calculateExamTime = function (allQuestions) {
  let timeInTotal = 0;
  let baseTimeInMinutes = 1;
  for (const category in allQuestions) {
    if (allQuestions.hasOwnProperty(category)) {
      for (const typeOfQ in allQuestions[category]) {
        if (allQuestions[category].hasOwnProperty(typeOfQ)) {
          let questionsArray = allQuestions[category][typeOfQ];
          questionsArray.forEach(question => {
            timeInTotal += baseTimeInMinutes * question.difficultyLevel;
          });
        }
      }
    }
  }
  console.log("-------- Total exam time -------");
  console.log(timeInTotal);

  return timeInTotal*60;
}

export default {
  calculateExamTime
}


// allQuestions = {
//   categoryWiedzaOOrganizacji: {
//     oneChoiceQuestions: [],
//     multiChoiceQuestions: [],
//     imageBasedQuestions: [],
//     textFieldQuestions: []
//   },
//   categoryWychowanieMetodaMetodyki: {
//     oneChoiceQuestions: [],
//     multiChoiceQuestions: [],
//     imageBasedQuestions: [],
//     textFieldQuestions: []
//   },
//   categoryBezpieczenstwo: {
//     oneChoiceQuestions: [],
//     multiChoiceQuestions: [],
//     imageBasedQuestions: [],
//     textFieldQuestions: []
//   },
//   categoryIdeaIHistoria: {
//     oneChoiceQuestions: [],
//     multiChoiceQuestions: [],
//     imageBasedQuestions: [],
//     textFieldQuestions: []
//   }
// }
