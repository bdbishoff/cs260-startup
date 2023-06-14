import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Login } from "./login/login";
import { Competitive } from "./competitive/competitive";
import { FreePlay } from "./freePlay/freePlay";
import { Leaderboard } from "./leaderboard/leaderboard";

function NotFound () {
    return <main>404: Return to sender. Address unknown</main>;
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Liar-GPT</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <NavLink className="nav-link" to=''>Home</NavLink> 
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='FreePlay'>Free Play</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='Competitive'>Competitive</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='Leaderboard'>Leaderboard</NavLink>
                                </li>
                                <li className="nav-item" id="userID">
                                    <NavLink className="nav-link disabled" to='#' id="changeUser">UserID</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/FreePlay' element={<FreePlay />} />
                    <Route path='/Competitive' element={<Competitive />} />
                    <Route path='/Leaderboard' element={<Leaderboard />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <hr />
                    <span className="text-reset">Author Name(s): Brent Bishoff</span>
                    <a href="https://github.com/bdbishoff/cs260-startup">GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}