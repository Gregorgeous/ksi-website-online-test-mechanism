var drawTheQuestions = function (AllTheQuestions)  {
  let cat1Counter;
  let cat1Limit = 5;
  let cat2Counter;
  let cat2Limit = 5;
  let cat3Counter;
  let cat3Limit = 5;
  var myBigObject = {
    categoryWiedzaOOrganizacji: {
      oneChoiceQuestions: [],
      videoBasedQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    },
    categoryWychowanieMetodaMetodyki: {
      oneChoiceQuestions: [],
      videoBasedQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    },
    categoryBezpieczenstwo: {
      oneChoiceQuestions: [],
      videoBasedQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    }
  }


  function randomizeEachCategory(categoryOfQuestions, whichCatInBigObj){
    function randomizeEachTypeOfQuestions(whichTypeOfQs,typeOfQsInBigObj) {
      console.log("To jest whichTypeOfQs, czyli AllTheQuestions.cat3Questions.oneChoiceQuestions");
      console.log(whichTypeOfQs);
      if (whichTypeOfQs) {
        console.log("Dlatego tutaj jestem");
        var typeOfQuestion = whichTypeOfQs;

        let randNumOfDrawings = Math.floor((Math.random() * 5) + 1);
        if (randNumOfDrawings > typeOfQuestion.length) {
          randNumOfDrawings = typeOfQuestion.length;
        }
        for (var i = 0; i < randNumOfDrawings; i++) {
          let randLimit = typeOfQuestion.length;
          let randNumber = Math.floor((Math.random() * randLimit));
          typeOfQsInBigObj.push(typeOfQuestion[randNumber]);
          typeOfQuestion.splice(randNumber,1);
        }
      }
    }

    randomizeEachTypeOfQuestions(
      categoryOfQuestions.oneChoiceQuestions,
      whichCatInBigObj.oneChoiceQuestions);
    randomizeEachTypeOfQuestions(
      categoryOfQuestions.imageBasedQuestions,
      whichCatInBigObj.imageBasedQuestions);
    randomizeEachTypeOfQuestions(
      categoryOfQuestions.textFieldQuestions,
      whichCatInBigObj.textFieldQuestions);
  }

  randomizeEachCategory(AllTheQuestions.cat1Questions,myBigObject.categoryWiedzaOOrganizacji);

  console.log("To jest mój big object po DRYowaniu na razie pierwsze kat.");
  console.log(myBigObject);

  randomizeEachCategory(AllTheQuestions.cat2Questions,myBigObject.categoryWychowanieMetodaMetodyki);

  randomizeEachCategory(AllTheQuestions.cat3Questions,myBigObject.categoryBezpieczenstwo);

  console.log("To jest mój big object W SUMIE:");
  console.log(myBigObject);

  return myBigObject;
}

module.exports = {
  drawTheQuestions
};
