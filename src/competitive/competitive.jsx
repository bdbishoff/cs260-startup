import React, { useState } from 'react';
import { useEffect } from 'react';
import './competitive.css';

export function Competitive() {

    useEffect(() => {

        document.getElementById("changeUser").innerHTML = localStorage.getItem("userName");
        document.getElementById("btn-highStreak").innerHTML = localStorage.getItem("highStreak");
        document.getElementById("btn-currStreak").innerHTML = localStorage.getItem("currStreak");

    }, []);

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    (async () => {
        configureWebSocket();
    })();

    // Function to shuffle the array randomly
    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function updateScores(correct) {
        let currStreak = localStorage.getItem("currStreak");
        let highStreak = localStorage.getItem("highStreak");

        if (correct) {
            currStreak++
            localStorage.setItem("currStreak", currStreak);

            if (highStreak < currStreak) {
                highStreak = currStreak;
                localStorage.setItem("highStreak", highStreak);
                saveScore(highStreak);
                saveScoreDataBase(highStreak);
                let userName = localStorage.getItem('userName');
                let strk = localStorage.getItem('highStreak');
                broadcastEvent(userName, strk);
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

    function getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }

    function saveScore(score) {
        const userName = this.getPlayerName();
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }

        let found = false;

        for (const [i, prevPlayer] of scores.entries()) {
            if (userName == prevPlayer.name) {
                if (score == prevPlayer.score) {
                    found = true;
                    break;
                }


                for (const [i, prevScore] of scores.entries()) {
                    if (score > prevScore.score) {
                        const date = new Date().toLocaleDateString();
                        scores.splice(i, 0, { name: userName, score: score, date: date });
                        found = true;
                        break;
                    }
                }

                scores.splice(i + 1, 1);

                localStorage.setItem('scores', JSON.stringify(scores));
                found = true;
                break;
            }
        }

        if (!found) {
            scores = this.updateLeaderboard(userName, score, scores);
            localStorage.setItem('scores', JSON.stringify(scores));
        }
    }

    function updateLeaderboard(userName, score, scores) {
        const date = new Date().toLocaleDateString();
        const newScore = { name: userName, score: score, date: date };

        let found = false;
        for (const [i, prevScore] of scores.entries()) {
            if (score > prevScore.score) {
                scores.splice(i, 0, newScore);
                found = true;
                break;
            }
        }

        if (!found) {
            scores.push(newScore);
        }

        if (scores.length > 10) {
            scores.length = 10;
        }
        return scores;
    }

    async function getLies() {
        // Grab input prompt
        // const prompt = document.getElementsByClassName("prompt-input")[0].value;

        // change options based off prompt
        const option1 = document.getElementsByClassName("option1")[0];
        const option2 = document.getElementsByClassName("option2")[0];
        const option3 = document.getElementsByClassName("option3")[0];

        document.getElementById("before-gen-options").style.visibility = "hidden";
        document.getElementById("before-gen-submit").style.visibility = "hidden";
        document.getElementById("spin-wait").style.visibility = "visible";
        document.getElementById("topicText").innerHTML = "";
        document.getElementById("ExpHold").style.visibility = "hidden";


        let answerRes = await fetch('/api/Comptopic');
        let response = await answerRes.json();

        document.getElementById("spin-wait").style.visibility = "hidden";



        // use chat gpt api to generate 2 truths and a lie about the topic randomly selected
        // from backend

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

        document.getElementById("topicText").innerHTML = topic;
        document.getElementById("ExpText").innerHTML = explanation;

        let correctAnswer = document.getElementById("correctAnswer");
        correctAnswer.innerHTML = "Guess the Lie";
    }

    function checkAnswer() {

        if (document.getElementById("option1").checked) {
            if (window.shuffled[0] == window.lie) {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are right &#9989";
                updateScores(true);
            }
            else {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are wrong &#10060;";
                updateScores(false);
            }
        }

        else if (document.getElementById("option2").checked) {
            if (window.shuffled[1] == window.lie) {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are right &#9989";
                updateScores(true);
            }
            else {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are wrong &#10060;";
                updateScores(false);
            }
        }

        else if (document.getElementById("option3").checked) {
            if (window.shuffled[2] == window.lie) {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are right &#9989";
                updateScores(true);
            }
            else {
                let correctAnswer = document.getElementById("correctAnswer");
                correctAnswer.innerHTML = "You are wrong &#10060;";
                updateScores(false);
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

    async function saveScoreDataBase(score) {
        const userName = this.getPlayerName();
        const date = new Date().toLocaleDateString();
        const newScore = { name: userName, score: score, date: date };

        try {
            const response = await fetch('/api/updateScore', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newScore),
            });

            // Store what the service gave us as the high scores
            const scores = await response.json();
            localStorage.setItem('scores', JSON.stringify(scores));
        } catch {
            // If there was an error then just track scores locally
            // this.updateScoresLocal(newScore);
        }
    }

    // Functionality for peer communication using WebSocket


    function configureWebSocket() {


        socket.onopen = (event) => {
            displayMsg('system', 'game', 'connected');
        };
        socket.onclose = (event) => {
            displayMsg('system', 'game', 'disconnected');
        };
        socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            displayMsg('player', msg.from, `highest streak is now ${msg.value}`);
        };
    }

    function displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        chatText.innerHTML =
            `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
    }

    function broadcastEvent(from, value) {
        const event = {
            from: from,
            value: value,
        };
        socket.send(JSON.stringify(event));
    }

    return (
        <main>
            <div className="players">
                Player Feed:
                <span className="player-name"></span>
                <div id="player-messages"></div>
            </div>

            <h1>Competitive</h1>
            <div className="prompt">
                <button className="btn btn-primary" onClick={getLies}>New Question</button>
            </div>

            <div className="seperation">
                <button type="button" className="btn btn-light">Highest Streak&#128293;: <span id="btn-highStreak">0</span></button>
                <button type="button" className="btn btn-light">Current Streak&#128200;: <span id="btn-currStreak">0</span></button>
            </div>

            <div id="spin-wait" className="spinner-border text-danger" role="status" style={{ visibility: "hidden" }}>
                <span className="sr-only"></span>
            </div>

            <div>
                <legend>Topic: <span id="topicText"></span></legend>
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