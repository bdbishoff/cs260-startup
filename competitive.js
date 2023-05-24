// Function to shuffle the array randomly
function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
    }

function updateScores (correct) {
  let currStreak = localStorage.getItem("currStreak");
  let highStreak = localStorage.getItem("highStreak");

  if (correct) {
    currStreak++
    localStorage.setItem("currStreak", currStreak);

    if (highStreak < currStreak) {
      highStreak = currStreak;
      localStorage.setItem("highStreak", highStreak);
    }

    document.getElementById("btn-highStreak").innerHTML = localStorage.getItem("highStreak");
    document.getElementById("btn-currStreak").innerHTML = localStorage.getItem("currStreak");
  }
  else {
    currStreak = 0;
    localStorage.setItem("currStreak", currStreak);
    document.getElementById("btn-currStreak").innerHTML = localStorage.getItem("currStreak");
  }
}

function getLies() {
    // Grab input prompt
    // const prompt = document.getElementsByClassName("prompt-input")[0].value;
    
    // change options based off prompt
    const option1 = document.getElementsByClassName("option1")[0];
    const option2 = document.getElementsByClassName("option2")[0];
    const option3 = document.getElementsByClassName("option3")[0];

    let eventNumber = Math.floor(Math.random() * 10);

    const historicalEvents = {
        0: {
          truths: ["The American Revolution began in 1775.", "The signing of the Declaration of Independence took place in 1776."],
          lie: "The Battle of Waterloo ended World War I."
        },
        1: {
          truths: ["The fall of the Berlin Wall occurred in 1989.", "The Apollo 11 mission successfully landed humans on the moon in 1969."],
          lie: "The French Revolution started in 1848."
        },
        2: {
          truths: ["The signing of the Magna Carta took place in 1215.", "The Black Death ravaged Europe in the 14th century."],
          lie: "The invention of the printing press happened in the 16th century."
        },
        3: {
          truths: ["The Boston Tea Party happened in 1773.", "The signing of the Treaty of Versailles marked the end of World War I."],
          lie: "The Great Fire of London occurred in 1620."
        },
        4: {
          truths: ["The Wright brothers made their first powered flight in 1903.", "The sinking of the RMS Titanic happened in 1912."],
          lie: "The construction of the Great Wall of China began in the 18th century."
        },
        5: {
          truths: ["The signing of the Emancipation Proclamation occurred in 1863.", "The stock market crash of 1929 triggered the Great Depression."],
          lie: "The Battle of Hastings took place in 1776."
        },
        6: {
          truths: ["The assassination of Archduke Franz Ferdinand sparked World War I.", "The Cuban Missile Crisis took place in 1962."],
          lie: "The signing of the Treaty of Tordesillas divided the New World between Spain and Portugal in the 19th century."
        },
        7: {
          truths: ["The Battle of Stalingrad was a major turning point in World War II.", "The signing of the Treaty of Ghent ended the War of 1812."],
          lie: "The Russian Revolution happened in 1905."
        },
        8: {
          truths: ["The Renaissance began in the 14th century.", "The invention of the printing press by Johannes Gutenberg happened in the 15th century."],
          lie: "The Battle of Thermopylae took place in the 13th century BCE."
        },
        9: {
          truths: ["The signing of the Treaty of Paris marked the end of the American Revolutionary War.", "The D-Day invasion occurred on June 6, 1944."],
          lie: "The Industrial Revolution started in the 17th century."
        }
      };

    let optionEvent = historicalEvents[eventNumber];
    let truth1 = optionEvent.truths[0];
    let truth2 = optionEvent.truths[1];
    window.lie = optionEvent.lie;


    const numbers = [truth1, truth2, lie];
    window.shuffled = shuffleArray(numbers);

    option1.innerHTML = shuffled[0];
    option2.innerHTML = shuffled[1];
    option3.innerHTML = shuffled[2];

    document.getElementById("before-gen-options").style.visibility="visible";
    document.getElementById("before-gen-submit").style.visibility="visible";

    document.getElementById("option1-color").style.setProperty('--bs-btn-bg', '#575a5d');
    document.getElementById("option1-color").style.setProperty('--bs-btn-active-bg', '#262628');

    document.getElementById("option2-color").style.setProperty('--bs-btn-bg', '#575a5d');
    document.getElementById("option2-color").style.setProperty('--bs-btn-active-bg', '#262628');

    document.getElementById("option3-color").style.setProperty('--bs-btn-bg', '#575a5d');
    document.getElementById("option3-color").style.setProperty('--bs-btn-active-bg', '#262628');

    correctAnswer = document.getElementById("correctAnswer");
    correctAnswer.innerHTML = "Guess the Lie";
}

function checkAnswer () {

    if (document.getElementById("option1").checked) {
        if (window.shuffled[0] == window.lie) {
            correctAnswer = document.getElementById("correctAnswer");
            correctAnswer.innerHTML = "You are right &#9989";
            updateScores(true);
        }
        else {
          correctAnswer = document.getElementById("correctAnswer");
          correctAnswer.innerHTML = "You are wrong &#10060;";
          updateScores(false);
        }
    }

    else if (document.getElementById("option2").checked) {
        if (window.shuffled[1] == window.lie) {
          correctAnswer = document.getElementById("correctAnswer");
          correctAnswer.innerHTML = "You are right &#9989";
          updateScores(true);
        }
        else {
          correctAnswer = document.getElementById("correctAnswer");
          correctAnswer.innerHTML = "You are wrong &#10060;";
          btn = document.getElementById("option2");
          updateScores(false);
        }
    }

    else if (document.getElementById("option3").checked) {
        if (window.shuffled[2] == window.lie) {
          correctAnswer = document.getElementById("correctAnswer");
          correctAnswer.innerHTML = "You are right &#9989";
          updateScores(true);
        }
        else {
          correctAnswer = document.getElementById("correctAnswer");
          correctAnswer.innerHTML = "You are wrong &#10060;";
          updateScores(false);
        }
    }
    
    revealAnswer();
    document.getElementById("before-gen-submit").style.visibility="hidden";
}

function revealAnswer () {
  if (window.shuffled[0] == window.lie) {

    document.getElementById("option1-color").style.setProperty('--bs-btn-bg', '#289f47');
    document.getElementById("option1-color").style.setProperty('--bs-btn-active-bg', '#289f47');

    document.getElementById("option2-color").style.setProperty('--bs-btn-bg', '#a1101f');
    document.getElementById("option2-color").style.setProperty('--bs-btn-active-bg', '#a1101f');

    document.getElementById("option3-color").style.setProperty('--bs-btn-bg', '#a1101f');
    document.getElementById("option3-color").style.setProperty('--bs-btn-active-bg', '#a1101f');
  }
  else if (window.shuffled[1] == window.lie) {

    document.getElementById("option2-color").style.setProperty('--bs-btn-bg', '#289f47');
    document.getElementById("option2-color").style.setProperty('--bs-btn-active-bg', '#289f47');

    document.getElementById("option1-color").style.setProperty('--bs-btn-bg', '#a1101f');
    document.getElementById("option1-color").style.setProperty('--bs-btn-active-bg', '#a1101f');

    document.getElementById("option3-color").style.setProperty('--bs-btn-bg', '#a1101f');
    document.getElementById("option3-color").style.setProperty('--bs-btn-active-bg', '#a1101f');

  }
  else {
    document.getElementById("option3-color").style.setProperty('--bs-btn-bg', '#289f47');
    document.getElementById("option3-color").style.setProperty('--bs-btn-active-bg', '#289f47');

    document.getElementById("option1-color").style.setProperty('--bs-btn-bg', '#a1101f');
    document.getElementById("option1-color").style.setProperty('--bs-btn-active-bg', '#a1101f');

    document.getElementById("option2-color").style.setProperty('--bs-btn-bg', '#a1101f');
    document.getElementById("option2-color").style.setProperty('--bs-btn-active-bg', '#a1101f');
  }
}


