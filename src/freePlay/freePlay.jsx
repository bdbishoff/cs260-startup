import React from 'react';
import './freePlay.css';
import { useEffect } from 'react';

export function FreePlay() {

    useEffect(() => {

        document.getElementById("changeUser").innerHTML = localStorage.getItem("userName");

    }, []);

    // document.getElementById("changeUser").innerHTML = localStorage.getItem("userName");

    // Function to shuffle the array randomly
    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    }

    async function getLies() {
        // Grab input prompt
        const prompt = document.getElementsByClassName("prompt-input")[0].value;

        // change options based off prompt
        const option1 = document.getElementsByClassName("option1")[0];
        const option2 = document.getElementsByClassName("option2")[0];
        const option3 = document.getElementsByClassName("option3")[0];

        document.getElementById("before-gen-options").style.visibility = "hidden";
        document.getElementById("before-gen-submit").style.visibility = "hidden";
        document.getElementById("spin-wait").style.visibility = "visible";
        document.getElementById("ExpHold").style.visibility = "hidden";

        let answerRes = await fetch('/api/Freetopic', {
            method: 'post',
            body: JSON.stringify({
                userPrompt: prompt
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8'
            }
        });

        let response = await answerRes.json();

        document.getElementById("spin-wait").style.visibility = "hidden";

        let topic = response.Topic;
        let truth1 = response.truth1;
        let truth2 = response.truth2;
        window.lie = response.lie;
        let explanation = response.explanation;


        const numbers = [truth1, truth2, lie];
        window.shuffled = shuffleArray(numbers);

        option1.innerHTML = shuffled[0];
        option2.innerHTML = shuffled[1];
        option3.innerHTML = shuffled[2];

        document.getElementById("before-gen-options").style.visibility = "visible";
        document.getElementById("before-gen-submit").style.visibility = "visible";

        document.getElementById("option1-color").style.setProperty('--bs-btn-bg', '#575a5d');
        document.getElementById("option1-color").style.setProperty('--bs-btn-active-bg', '#262628');

        document.getElementById("option2-color").style.setProperty('--bs-btn-bg', '#575a5d');
        document.getElementById("option2-color").style.setProperty('--bs-btn-active-bg', '#262628');

        document.getElementById("option3-color").style.setProperty('--bs-btn-bg', '#575a5d');
        document.getElementById("option3-color").style.setProperty('--bs-btn-active-bg', '#262628');

        document.getElementById("ExpText").innerHTML = explanation;

        let correctAnswer = document.getElementById("correctAnswer");
        correctAnswer.innerHTML = "Guess the Lie";
    }

    function checkAnswer() {

        if (document.getElementById("option1").checked) {
            if (window.shuffled[0] == window.lie) {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are right &#9989";
            }
            else {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are wrong &#10060;";
            }
        }

        else if (document.getElementById("option2").checked) {
            if (window.shuffled[1] == window.lie) {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are right &#9989";
            }
            else {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are wrong &#10060;";
            }
        }

        else if (document.getElementById("option3").checked) {
            if (window.shuffled[2] == window.lie) {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are right &#9989";
            }
            else {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are wrong &#10060;";
            }
        }

        revealAnswer();
        document.getElementById("before-gen-submit").style.visibility = "hidden";
    }

    function revealAnswer() {
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
        document.getElementById("ExpHold").style.visibility = "visible";
    }

    return (
        <main>
            <h1>Free Play</h1>
            <div className="prompt">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Enter a Topic</span>
                    </div>
                    <input type="text" className="form-control prompt-input" aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default" />
                </div>
                <button className="btn btn-primary" onClick={getLies}>Generate</button>
            </div>

            <div className="seperation"></div>
            {/* <script>
                document.getElementById("changeUser").innerHTML = localStorage.getItem("userName");
                document.getElementById("btn-highStreak").innerHTML = localStorage.getItem("highStreak");
                document.getElementById("btn-currStreak").innerHTML = localStorage.getItem("currStreak");
            </script> */}

            <div id="spin-wait" className="spinner-border text-danger" role="status" style={{ visibility: "hidden" }}>
                <span className="sr-only"></span>
            </div>

            <div id="before-gen-options" style={{ visibility: "hidden" }}>
                <div className="options">
                    <legend id="correctAnswer">Select the lie</legend>
                    <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" />
                    <label className="btn btn-secondary option1" id="option1-color" htmlFor="option1">The American Civil War was fought from
                        1861 to 1865.</label>

                    <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" />
                    <label className="btn btn-secondary option2" id="option2-color" htmlFor="option2">The Boston Tea Party occurred in 1773
                        and was a significant event leading up to the American Revolution.</label>

                    <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" />
                    <label className="btn btn-secondary option3" id="option3-color" htmlFor="option3">The United States Constitution was
                        signed in 1789 after the American Revolutionary War ended.</label>

                </div>
            </div>
            <div className="answer-submit" id="before-gen-submit" style={{ visibility: "hidden" }}>
                <button className="btn btn-primary" onClick={checkAnswer}>Submit</button>
            </div>

            <div style={{ visibility: "hidden" }} id="ExpHold">
                <legend>Explanation: <span id="ExpText"></span></legend>
            </div>
        </main>
    );
}