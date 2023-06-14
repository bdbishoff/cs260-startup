import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
    return (
        <div class="app">
            <header>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Liar-GPT</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="freePlay.html">Free Play</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="competitive.html">Competitive</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="leaderboard.html">Leaderboard</a>
                            </li>
                            <li class="nav-item" id="userID">
                                <a class="nav-link disabled" href="#" id="changeUser">UserID</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>Components go here</main>

            <footer>
                <hr />
                <span class="text-reset">Author Name(s)</span>
                <a href="https://github.com/bdbishoff/cs260-startup">GitHub</a>
                <br />
            </footer>
        </div>
    );
}