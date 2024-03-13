const quizData = [
    {
      question: "Quel est le langage de programmation orienté objet ?",
      options: ["Java", "Python", "JavaScript", "C++"],
      answer: "Java"
    },
    {
      question: "Quelle est la syntaxe correcte pour une boucle for en JAVA ?",
      options: ["for (int i = 0; i < 5; i++)", "foreach (int i in array)", "for (i = 0; i <= 5)", "for (i < 5; i++)"],
      answer: "for (int i = 0; i < 5; i++)"
    },
    {
      question:"Lequel des éléments suivants gère une liste de pilotes de base de données dans JDBC?",
      options:["DriverManager","Connection","Statement","Statement"],
      answer:"DriverManager"
    },
    {
      question:"Lequel des éléments suivants présente l’avantage d’utiliser PreparedStatement en Java?",
      options:["Ralentissement des performances","Encourage l’injection SQL","Empêche l’injection SQL","Utilise plus de mémoire"],
      answer:"Empêche l’injection SQL"
    },
    {
      question:"Lequel des méthodes suivants est utilisé pour annuler une transaction JDBC?",
      options:["removeTransaction()"," rollback()"," commit()"," roll()"],
      answer:" rollback()"
    },
    {
      question:" String en Java est",
      options:["une classe","un objet","une variable","un tableau de char"],
      answer:"une classe"
    },
   
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const scoreElement = document.getElementById("score");
  const messageElement = document.getElementById("message");
  const timerElement = document.getElementById("time");
  const playAgainButton = document.getElementById("play-again-btn");

  
  function displayQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
    startTimer();

  }
    function checkAnswer(answer) {
      clearInterval(timer);

      const currentQuizData = quizData[currentQuestion];
      if (answer === currentQuizData.answer) {
        score++;
        messageElement.textContent = "Bonne réponse!";
      } else {
        messageElement.textContent = "Mauvaise réponse!";
        document.getElementById("message").style.color = "red";
      }
      scoreElement.textContent = score;
      disableOptions();
    }
    function disableOptions(){
      const options = optionsElement.querySelectorAll("button");
      options.forEach(option => {
        option.disabled = true;
      });
    }
    function nextQuestion() {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        displayQuestion();
        messageElement.textContent = "";
      } else {
        endQuiz();
      }
    }
    function endQuiz(){
    questionElement.textContent = "Quiz terminé!";
    optionsElement.innerHTML = "";
    
    messageElement.textContent = "Votre score final est: " + score;
    document.getElementById("message").style.color = "black";
    clearInterval(timer);
    playAgainButton.style.display = 'block';


    }

  function startTimer() {
    let time = 20;
    timerElement.textContent = "Temps restant: " + time + " secondes";
    timer = setInterval(() => {
      time--;
      if (time >= 0) {
        timerElement.textContent = "Temps restant: " + time + " secondes";
      }
      if (time === 0) {
        clearInterval(timer);
        messageElement.textContent = "Temps écoulé!";
        disableOptions();
      }
    }, 1000);
  }
  function playAgain() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    messageElement.textContent = "";
    playAgainButton.style.display = 'none'; // Cacher le bouton après avoir cliqué
  }
  function startQuiz() {
    window.location.href = "index.html"; // Rediriger vers la page du quiz
  }
  displayQuestion();