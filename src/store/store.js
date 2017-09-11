import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase"
import checkTheAnswers from './checkingAnswersMechanism'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 1,
    categoryWiedzaOOrganizacji:
    {
      oneChoiceQuestions: [],
      multiChoiceQuestions: [
        {
          question: "Władzami hufca są (zaznacz prawidłowe odpowiedzi):",
          difficultyLevel: 2,
          correctAnswers: ["komendant hufca","komisja rewizyjna hufca","komenda hufca","sąd harcerski hufca, jeżeli zjazd hufca dokona jego wyboru",   ],
          incorrectAnswers:["zjazd hufca","zespół kadry kształcącej","komisja stopni instruktorskich","namiestnik hufca","zgromadzanie komendantów (szefów) środowisk","szef biura hufca","komendant chorągwi","rada hufca","zlot drużyn i gromad hufcowych",],
          whichAnswersChosen:[]
        }
      ],
      videoBasedQuestions: [],
      imageBasedQuestions: [
        {
          imageURL: "",
          question: "Opisz powyższą fakturę",
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          imageURL: "",
          question: "Znajdź błąd na powyższej fakturze i napisz jak powinna ona poprawnie wyglądać",
          difficultyLevel: 3,
          candidatesAnswer: ""
        }
      ],
      textFieldQuestions: [
        {
          question: "W rozkazie komendanta hufca nie ma informacji o zamknięciu Twojej próby przewodnikowej. Co robisz?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Dlaczego zjazd hufca jest ważny?",
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          question: "Czym różni się czynne prawo wyborcze od biernego prawa wyborczego?",
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          question: "Ile wynosi składka członkowska w ZHP (w chorągwi stołecznej)?",
          difficultyLevel: 3,
          candidatesAnswer: ""
        },
        {
          question: "Kto wydaje decyzję w sprawie Dodatkowej Członkowskiej Składki Zadaniowej (DCSZ)? I co to jest DCSZ?",
          difficultyLevel: 3,
          candidatesAnswer: ""
        },
        {
          question: "Jaką dokumentację pracy wychowawczo-organizacyjnej musi posiadać drużyna/gromada?",
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          question: "Przygotuj preliminarz biwaku Twojej drużyny/gromady",
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          question: "Jak przechowuje się środki finansowe drużyny/gromady?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Kto jest Komendantem Hufca Warszawa-Żoliborz, Komendantem Chorągwi Stołecznej ZHP, Naczelnikiem ZHP i Przewodniczącym ZHP?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Ile zuchów/harcerzy powinna formalnie minimalnie liczyć Twoja gromada/drużyna?",
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          question: "Czym zajmuje się zjazd zwykły hufca?",
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          question: 'Czym zajmuje się zjazd "niezwykły" hufca?',
          difficultyLevel: 2,
          candidatesAnswer: ""
        },
        {
          question: "Kto ma prawo głosu na zjeździe hufca?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        }
      ]
    },
    categoryWychowanieMetodaMetodyki:
    {
      oneChoiceQuestions: [],
      multiChoiceQuestions: [],
      videoBasedQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: [
        {
          question: "Podaj nazwy trzech instrumentów metodycznych stosowanych w Twojej drużynie/gromadzie",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Wymień cechy metody harcerskiej",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Co oznacza pozytywność w metodzie harcerskiej i dlaczego jest ważna w wychowaniu?",
          variant2: "Co oznacza indywidualność w metodzie harcerskiej i dlaczego jest ważna w wychowaniu?",
          variant3: "Co oznacza wzajemność oddziaływań w metodzie harcerskiej i dlaczego jest ważna w wychowaniu?",
          variant4: "Co oznacza dobrowolność i świadomość celów w metodzie harcerskiej i dlaczego jest ważna w wychowaniu?",
          variant5: "Co oznacza pośredniość w metodzie harcerskiej i dlaczego jest ważna w wychowaniu?",
          variant6: "Co oznacza naturalność  w metodzie harcerskiej i dlaczego jest ważna w wychowaniu?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Co jest misją ZHP?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Czym jest system małych grup?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Wymień zasady dobrej zbiórki",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Jakie działania zaproponujesz w poniżej opisanej sytuacji i jak Twoja propozycja wpisuje się w cechy metody harcerskiej?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Czy uczenie w działaniu jest ważne i dlaczego?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Drużynowa powtarza sprawdzone wzorce. Zbiorki są zgodne z zasadami dobrej zbiorki, ale z roku na rok w do drużyny przychodzi coraz mniej harcerzy. Jakie mogą być tego przyczyny, jak uważasz?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Wymień elementy metody harcerskiej",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Wymień nazwy gwiazdek zuchowych i stopni harcerskich oraz opisz sposób ich oznaczania na mundurze",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: 'Jakie znasz instrumenty metodyczne dedykowane dla poszczególnych grup wiekowych',
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Co symbolizują płomienie watry wędrowniczej?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Opisz jedną z ostatnich zbiórek. W opisie wskaż jakie były jej cele, temat, formy pracy, czy i jak przebiegała praca w małych grupach, jaki był podział obowiązków wśród kadry, czy program zbiórki pozwalał na zdobywanie sprawności. Co się udało a co nie i dlaczego (jak sądzisz)?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Opisz wrażenia z ostatniej lektury o tematyce harcerskiej. Czy jej treść zainspirowała Ciebie do czegoś, czy udało się ją wykorzystać w drużynie/gromadzie/pracy z kadrą (jak)?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Jaki jest cel Próby Harcerza i jak długo powinna trwać i czym się kończyć?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Po jakiem czasie od wstąpienia do drużyny/gromady harcerz/zuch powinien złożyć przyrzeczenie harcerskie/ obietnicę zuchową?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Czy stopnie harcerskie należy zdobywać kolejno? Uzasadnij odpowiedź?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        },
        {
          question: "Wymień jakie formy pracy wykorzystujesz w drużynie/gromadzie?",
          difficultyLevel: 1,
          candidatesAnswer: ""
        }
      ]
    },
    categoryBezpieczenstwo:
    {
      oneChoiceQuestions: [
        {
          question: "Pieszy idący po poboczu lub jezdni zobowiązany jest poruszać się:",
          difficultyLevel: 1,
          correctAnswer: 'prawą stroną drogi',
          answer2: 'lewą stronę drogi',
          whichAnswerChosen:''
        },
        {
          question: "Kolumna pieszych w wieku do 10 lat zobowiązana jest poruszać się:",
          difficultyLevel: 1,
          correctAnswer: 'prawą stroną jezdni',
          answer2: 'lewą stroną jezdni',
          whichAnswerChosen:''
        },
        {
          question: "Kolumna pieszych w wieku powyżej 10 lat zobowiązana jest poruszać się:",
          difficultyLevel: 1,
          correctAnswer: 'prawą stroną jezdni',
          answer2: 'lewą stronę jezdni',
          whichAnswerChosen:''
        },
        {
          question: "Niepełnoletni drużynowy:",
          difficultyLevel: 1,
          correctAnswer: 'musi mieć opiekuna drużyny/gromady',
          answer2: 'nie musi mieć opiekuna drużyny/gromady, jeżeli jest instruktorem',
          answer3: 'musi mieć opiekuna drużyny/gromady, który jest instruktorem',
          whichAnswerChosen:''
        },
        {
          question: "Kolumnę pieszych może prowadzić po jezdni",
          difficultyLevel: 1,
          correctAnswer: 'instruktor',
          answer2: 'osoba pełnoletnia',
          answer3: 'tylko drużynowy',
          whichAnswerChosen:''
        },
        {
          question: "Podczas kolonii zuchowej w kadrze:",
          difficultyLevel: 1,
          correctAnswer: 'powinien być co najmniej jeden wychowawca na 15 zuchów',
          answer2: 'powinien być co najmniej jeden wychowawca na 20 zuchów',
          whichAnswerChosen:''
        },
        {
          question: "Podczas obozu harcerskiego w kadrze:",
          difficultyLevel: 1,
          correctAnswer: 'powinien być co najmniej jeden wychowawca na 20 harcerzy',
          answer2: 'powinien być co najmniej jeden wychowawca na 15 harcerzy',
          whichAnswerChosen:''
        },
        {
          question: "Zgoda rodziców (opiekunów prawnych) na przynależność do ZHP jest wymagana w przypadku osób w wieku:",
          difficultyLevel: 1,
          correctAnswer: 'do 16 lat',
          answer2: 'do 18 lat',
          answer3: 'do 10 lat',
          whichAnswerChosen:''
        },
        {
          question: "Na kąpielisku wymagana jest obecność:",
          difficultyLevel: 1,
          correctAnswer: 'ratownika wodnego i wychowawcy',
          answer2: 'wychowawcy',
          answer3: 'ratownika wodnego',
          whichAnswerChosen:''
        },
        {
          question: "Pływanie na obozie może odbywać się:",
          difficultyLevel: 1,
          correctAnswer: 'w wyznaczonym do tego miejscu i po spełnieniu innych warunków',
          answer2: 'w każdym miejscu pod warunkiem obecności ratownika wodnego',
          answer3: 'w każdym miejscu pod warunkiem obecności komendanta obozu',
          whichAnswerChosen:''
        },
        {
          question: "Odpowiedzialność za szkodę wyrządzoną podopiecznym ponosi:",
          difficultyLevel: 1,
          correctAnswer: 'wychowawca',
          answer2: 'ubezpieczyciel',
          answer3: 'wychowawca i ubezpieczyciel',
          whichAnswerChosen:''
        }
      ],
      multiChoiceQuestions: [],
      videoBasedQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    },
    categoryIdeaIHistoria:
    {
      oneChoiceQuestions: [],
      multiChoiceQuestions: [],
      videoBasedQuestions: [],
      imageBasedQuestions: [],
      textFieldQuestions: []
    },

// -------------candidatesAnswers -----------------

    candidatesAnswers: {
      categoryWiedzaOOrganizacji:
      {
        oneChoiceQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        videoBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        imageBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: 'cos tam cos tam',
            isAnswerCorrect: null,
            question: 'bla bla bla'
          },
          {
            candidatesAnswer: 'cos tam cos tam 2',
            isAnswerCorrect: null,
            question: 'bla bla bla 2'
          }
        ]
      },
      categoryWychowanieMetodaMetodyki:
      {
        oneChoiceQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        videoBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        imageBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: "E, E, E !!",
            isAnswerCorrect: null,
            question: "Kuku, Kuku ! "
          }
        ]
      },
      categoryBezpieczenstwo:
      {
        oneChoiceQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        videoBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        imageBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: "Buuu !",
            isAnswerCorrect: null,
            question: "Kra! Kra ! Kra !"
          }
        ]
      },
      categoryIdeaIHistoria:
      {
        oneChoiceQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        videoBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        imageBasedQuestions: [
          {
            candidatesAnswer: null,
            isAnswerCorrect: null,
            question: null
          }
        ],
        textFieldQuestions: [
          {
            candidatesAnswer: "Sru sru sru !",
            isAnswerCorrect: null,
            question: "Łiii! Łiii!"
          }
        ]
      },
    }

  },
  mutations: {
    nextQuestion (state) {
      state.count++
    },
    mapTheFirstCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryWiedzaOOrganizacji = chosenAnswers;
    },
    mapTheSecondCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryWychowanieMetodaMetodyki = chosenAnswers;
    },
    mapTheThirdCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryBezpieczenstwo = chosenAnswers;
    },
    mapTheFourthCategoryAnswers (state, chosenAnswers) {
      state.candidatesAnswers.categoryIdeaIHistoria = chosenAnswers;
    },
    checkTheAnswers (state) {
      // For each category, we check the answers via "checkingAnswersMechanism.js" file.
      // First Category
      let categoryOfQuestions = state.categoryWiedzaOOrganizacji;
      let candidatesAnswersInThisCat = state.candidatesAnswers.categoryWiedzaOOrganizacji;
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

      // Second Category
      categoryOfQuestions = state.categoryWychowanieMetodaMetodyki;
      candidatesAnswersInThisCat = state.candidatesAnswers.categoryWychowanieMetodaMetodyki;
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

      // Third Category
      categoryOfQuestions = state.categoryBezpieczenstwo;
      candidatesAnswersInThisCat = state.candidatesAnswers.categoryBezpieczenstwo;
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

      // Fourth Category
      categoryOfQuestions = state.categoryIdeaIHistoria;
      candidatesAnswersInThisCat = state.candidatesAnswers.categoryIdeaIHistoria;
      checkTheAnswers.checkOneChoiceQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);
      checkTheAnswers.checkVideoBasedQuestionsAnswers(state,categoryOfQuestions,candidatesAnswersInThisCat);

    },
    gradeTFQuestions({state}, payload) {
      console.log(payload);
      // payload.candsCat1TFAnswers
      // payload.dbCat1TFAnswers
      // for (var i = 1; i <  payload.candsCat1TFAnswers.length; i++) {
      //   for (var j = 0; j < payload.dbCat1TFAnswers.length; j++) {
      //     if (payload.candsCat1TFAnswers[i].question == payload.dbCat1TFAnswers[j].question) {
      //       console.log(`jestem to po raz ${j} w rundzie ${i} `);
      //       payload.dbCat1TFAnswers[j].isAnswerCorrect = payload.candsCat1TFAnswers[i].isAnswerCorrect;
      //       payload.dbCat1TFAnswers.splice(j, 1);
      //     }
      //   }
      // }

      // for (var i = 0; i <  payload.dbCat1TFAnswers.length; i++) {
      //   for (var j = 1; j < payload.candsCat1TFAnswers.length; j++) {
      //     if (payload.dbCat1TFAnswers[i].question == payload.candsCat1TFAnswers[j].question) {
      //       console.log(`jestem to po raz ${j} w rundzie ${i} `);
      //       payload.candsCat1TFAnswers[j].isAnswerCorrect = payload.dbCat1TFAnswers[i].isAnswerCorrect;
      //       // TODO: Make some anti-break-system for when there happen to be 2 exact same questions ! Now it breaks..
      //     }
      //   }
      // }

    }
  },
  actions: {
    anonymousSignup ({commit}) {
      firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
    },
    signUpOnStart ({commit}, payload) {
      firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then( user => {
        console.log("zalogowałem się");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
    }
  }
})
