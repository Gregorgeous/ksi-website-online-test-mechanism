var drawTheQuestions = function (AllTheQuestions) {
  let cat1NumOfQuestions = 5;
  let cat2NumOfQuestions = 8;
  let cat3NumOfQuestions = 6;
  let cat4NumOfQuestions = 4;
  var myBigObject = {
    categoryWiedzaOOrganizacji: {
      oneChoiceQuestions: [],
      multiChoiceQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    },
    categoryWychowanieMetodaMetodyki: {
      oneChoiceQuestions: [],
      multiChoiceQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    },
    categoryBezpieczenstwo: {
      oneChoiceQuestions: [],
      multiChoiceQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    },
    categoryIdeaIHistoria: {
      oneChoiceQuestions: [],
      multiChoiceQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    }
  }
  let cat1Questions = {
    starredQuestions: {
      // oneChoiceQuestions: [],
      // multiChoiceQuestions: [],
      // imageBasedQuestions: [],
      // textFieldQuestions: []
    },
    otherQuestions: {
      // oneChoiceQuestions: [],
      // multiChoiceQuestions: [],
      // imageBasedQuestions: [],
      // textFieldQuestions: []
    }
  }
  let cat2Questions = {
    starredQuestions: {},
    otherQuestions: {}
  }
  let cat3Questions = {
    starredQuestions: {},
    otherQuestions: {}
  }
  let cat4Questions = {
    starredQuestions: {},
    otherQuestions: {}
  }

  function filterStarredQuestionsInGivenCategory(categoryOfQuestions, whichCatToPutIt) {
    function filterInGivenTypeOfQuestion(whichTypeOfQs, _whichCatToPutIt, numOfTypeOfQuestion) {
      if (whichTypeOfQs) {
        let pointer1;
        let pointer2;
        switch (numOfTypeOfQuestion) {
          case 1:
            _whichCatToPutIt.starredQuestions = {
              ..._whichCatToPutIt.starredQuestions,
              oneChoiceQuestions: []
            }
            pointer1 = _whichCatToPutIt.starredQuestions.oneChoiceQuestions;
            _whichCatToPutIt.otherQuestions = {
              ..._whichCatToPutIt.otherQuestions,
              oneChoiceQuestions: []
            }
            pointer2 = _whichCatToPutIt.otherQuestions.oneChoiceQuestions;
            break;
          case 2:
            _whichCatToPutIt.starredQuestions = {
              ..._whichCatToPutIt.starredQuestions,
              multiChoiceQuestions: []
            }
            pointer1 = _whichCatToPutIt.starredQuestions.multiChoiceQuestions;
            _whichCatToPutIt.otherQuestions = {
              ..._whichCatToPutIt.otherQuestions,
              multiChoiceQuestions: []
            }
            pointer2 = _whichCatToPutIt.otherQuestions.multiChoiceQuestions;
            break;
          case 3:
            _whichCatToPutIt.starredQuestions = {
              ..._whichCatToPutIt.starredQuestions,
              imageBasedQuestions: []
            }
            pointer1 = _whichCatToPutIt.starredQuestions.imageBasedQuestions;
            _whichCatToPutIt.otherQuestions = {
              ..._whichCatToPutIt.otherQuestions,
              imageBasedQuestions: []
            }
            pointer2 = _whichCatToPutIt.otherQuestions.imageBasedQuestions;
            break;
          case 4:
            _whichCatToPutIt.starredQuestions = {
              ..._whichCatToPutIt.starredQuestions,
              textFieldQuestions: []
            }
            pointer1 = _whichCatToPutIt.starredQuestions.textFieldQuestions;
            _whichCatToPutIt.otherQuestions = {
              ..._whichCatToPutIt.otherQuestions,
              textFieldQuestions: []
            }
            pointer2 = _whichCatToPutIt.otherQuestions.textFieldQuestions;
            break;
        }
        whichTypeOfQs.forEach(question => {
          if (question.starredQuestion) {
            pointer1.push(question);
          } else {
            pointer2.push(question);
          }
        })

      }
    }

    function countNumOfStarredQuestions(_whichCatToPutIt, countStarredQs) {
      let counter = 0;
      if (countStarredQs) {
        // FIXME: ensure '_whichCatToPutIt.XXXX' object exists (you can use a load of if statements OR this new neat feature seen in Fun fun function channel)
        counter += _whichCatToPutIt.starredQuestions.oneChoiceQuestions.length;
        counter += _whichCatToPutIt.starredQuestions.multiChoiceQuestions.length;
        counter += _whichCatToPutIt.starredQuestions.imageBasedQuestions.length;
        counter += _whichCatToPutIt.starredQuestions.textFieldQuestions.length;
      } else {
        counter += _whichCatToPutIt.otherQuestions.oneChoiceQuestions.length;
        counter += _whichCatToPutIt.otherQuestions.multiChoiceQuestions.length;
        counter += _whichCatToPutIt.otherQuestions.imageBasedQuestions.length;
        counter += _whichCatToPutIt.otherQuestions.textFieldQuestions.length;

      }
    }

    filterInGivenTypeOfQuestion(categoryOfQuestions.oneChoiceQuestions, whichCatToPutIt, 1);
    filterInGivenTypeOfQuestion(categoryOfQuestions.multiChoiceQuestions, whichCatToPutIt, 2);
    filterInGivenTypeOfQuestion(categoryOfQuestions.imageBasedQuestions, whichCatToPutIt, 3);
    filterInGivenTypeOfQuestion(categoryOfQuestions.textFieldQuestions, whichCatToPutIt, 4);
  }

  filterStarredQuestionsInGivenCategory(AllTheQuestions.cat1Questions, cat1Questions)
  filterStarredQuestionsInGivenCategory(AllTheQuestions.cat2Questions, cat2Questions)
  filterStarredQuestionsInGivenCategory(AllTheQuestions.cat3Questions, cat3Questions)
  filterStarredQuestionsInGivenCategory(AllTheQuestions.cat4Questions, cat4Questions)



  // NOTE: potential Endless-loop if one of the categories ever has no questions in any type of questions ! (not likely but I note it for future remembrance ! )
  function randomizeEachCategory(numOfQuestions, catOfQs, whichCatInBigObj) {
    // Firstly, we want to draw 2 random 'starred' questions ..
    // 'currentNumOfQuestions' is our master counter of the questions currently added to the test (this prevents edge-case when - like in cat.3 there's no starred questions)
    let currentNumOfQuestions = 0;
    let numOfStarredQuestions = 2;

    //====== STEP 1: Drawing from starred questions ========
    for (let i = 0; i < numOfStarredQuestions; i++) {
      let arrayOfExistingCats = [];
      for (let key in catOfQs.starredQuestions) {
        let obj = catOfQs.starredQuestions;
        if (obj.hasOwnProperty(key) && obj[key].length != 0) {
          arrayOfExistingCats.push(key)
        }
      }

      if (arrayOfExistingCats.length == 0) break;

      let randomIndex = Math.round((Math.random() * arrayOfExistingCats.length));
      if (randomIndex == arrayOfExistingCats.length) randomIndex--;
      let randomCategory = arrayOfExistingCats[randomIndex];
      let pointerToQuestionsPool = catOfQs.starredQuestions[randomCategory];
      let pointerToBigObj = whichCatInBigObj[randomCategory];

      let randomQuestion = Math.floor((Math.random() * pointerToQuestionsPool.length));
      if (randomQuestion == pointerToQuestionsPool.length) randomQuestion--;

      // -----------------------------------------------------
      // HERE we additionally draw one of the available random images for the question (or only one possible, if there's only one image to pick from in the given question) if we happened to draw an imageBasedQuestion.
      if (randomCategory == 'imageBasedQuestions') {
        let randomImageURL = Math.floor((Math.random() * pointerToQuestionsPool[randomQuestion].imageURLs.length));
        if (randomImageURL == pointerToQuestionsPool[randomQuestion].imageURLs.length) randomImageURL--;
        if (pointerToQuestionsPool[randomQuestion].imageURLs.length < 0) {
          pointerToQuestionsPool[randomQuestion].imageURLForThisTest = '';
        } else if (pointerToQuestionsPool[randomQuestion].imageURLs.length == 1) {
          pointerToQuestionsPool[randomQuestion].imageURLForThisTest = pointerToQuestionsPool[randomQuestion].imageURLs[0];
        } else {
          pointerToQuestionsPool[randomQuestion].imageURLForThisTest = pointerToQuestionsPool[randomQuestion].imageURLs[randomImageURL];
        }
      }
      // ---------- end of drawing random image if drawn imageBasedQuestion ----------------------------

      pointerToBigObj.push(pointerToQuestionsPool[randomQuestion]);
      pointerToQuestionsPool.splice(randomQuestion, 1);
      currentNumOfQuestions++;
    }

    //====== STEP 2: Drawing from other questions ========
    for (let i = 0; i < numOfQuestions - currentNumOfQuestions; i++) {

      let arrayOfExistingCats = [];
      for (let key in catOfQs.otherQuestions) {
        let obj = catOfQs.otherQuestions;
        if (obj.hasOwnProperty(key) && obj[key].length != 0) {
          arrayOfExistingCats.push(key)
        }
      }
      let randomIndex = Math.round((Math.random() * arrayOfExistingCats.length));
      if (randomIndex == arrayOfExistingCats.length) randomIndex--;
      let randomCategory = arrayOfExistingCats[randomIndex];
      let pointerToQuestionsPool = catOfQs.otherQuestions[randomCategory];
      let pointerToBigObj = whichCatInBigObj[randomCategory];

      let randomQuestion = Math.floor((Math.random() * pointerToQuestionsPool.length));
      if (randomQuestion == pointerToQuestionsPool.length) randomQuestion--;

      // HERE we additionally draw one of the available random images for the question (or only one possible, if there's only one image to pick from in the given question) if we happened to draw an imageBasedQuestion.
      if (randomCategory == 'imageBasedQuestions') {
        let randomImageURL = Math.floor((Math.random() * pointerToQuestionsPool[randomQuestion].imageURLs.length));
        if (randomImageURL == pointerToQuestionsPool[randomQuestion].imageURLs.length) randomImageURL--;
        if (pointerToQuestionsPool[randomQuestion].imageURLs.length < 0) {
          pointerToQuestionsPool[randomQuestion].imageURLForThisTest = '';
        } else if (pointerToQuestionsPool[randomQuestion].imageURLs.length == 1) {
          pointerToQuestionsPool[randomQuestion].imageURLForThisTest = pointerToQuestionsPool[randomQuestion].imageURLs[0];
        } else {
          pointerToQuestionsPool[randomQuestion].imageURLForThisTest = pointerToQuestionsPool[randomQuestion].imageURLs[randomImageURL];
        }
      }
      // ---------- end of drawing random image if drawn imageBasedQuestion ----------------------------

      pointerToBigObj.push(pointerToQuestionsPool[randomQuestion]);
      pointerToQuestionsPool.splice(randomQuestion, 1);
    }
  }

  randomizeEachCategory(cat1NumOfQuestions, cat1Questions, myBigObject.categoryWiedzaOOrganizacji);
  // console.log("To jest mój big object po DRYowaniu na razie pierwsze kat.");
  // console.log(myBigObject);

  randomizeEachCategory(cat2NumOfQuestions, cat2Questions, myBigObject.categoryWychowanieMetodaMetodyki);
  randomizeEachCategory(cat3NumOfQuestions, cat3Questions, myBigObject.categoryBezpieczenstwo);
  randomizeEachCategory(cat4NumOfQuestions, cat4Questions, myBigObject.categoryIdeaIHistoria);

  console.log("To jest mój big object W SUMIE:");
  console.log(myBigObject);

  return myBigObject;
}

export default {
  drawTheQuestions
};


// THIS IS THE OLD VERSION OF RANDOMIZATIOM ALGORITHM
// function randomizeEachCategory(categoryOfQuestions, whichCatInBigObj) {
//   function randomizeEachTypeOfQuestions(whichTypeOfQs, typeOfQsInBigObj) {
//     console.log("To jest whichTypeOfQs, czyli AllTheQuestions.cat3Questions.oneChoiceQuestions");
//     console.log(whichTypeOfQs);
//     if (whichTypeOfQs) {
//       console.log("Dlatego tutaj jestem");
//       var typeOfQuestion = whichTypeOfQs;

//       let randNumOfDrawings = Math.floor((Math.random() * 5) + 1);
//       if (randNumOfDrawings > typeOfQuestion.length) {
//         randNumOfDrawings = typeOfQuestion.length;
//       }
//       for (var i = 0; i < randNumOfDrawings; i++) {
//         let randLimit = typeOfQuestion.length;
//         let randNumber = Math.floor((Math.random() * randLimit));
//         typeOfQsInBigObj.push(typeOfQuestion[randNumber]);
//         typeOfQuestion.splice(randNumber, 1);
//       }
//     }
//   }

//   randomizeEachTypeOfQuestions(
//     categoryOfQuestions.oneChoiceQuestions,
//     whichCatInBigObj.oneChoiceQuestions);
//   randomizeEachTypeOfQuestions(
//     categoryOfQuestions.imageBasedQuestions,
//     whichCatInBigObj.imageBasedQuestions);
//   randomizeEachTypeOfQuestions(
//     categoryOfQuestions.textFieldQuestions,
//     whichCatInBigObj.textFieldQuestions);
// }


// And this is the old way of calling the method: 
// randomizeEachCategory(AllTheQuestions.cat2Questions, myBigObject.categoryWychowanieMetodaMetodyki);

// randomizeEachCategory(AllTheQuestions.cat3Questions, myBigObject.categoryBezpieczenstwo);

// randomizeEachCategory(AllTheQuestions.cat4Questions, myBigObject.categoryIdeaIHistoria);
