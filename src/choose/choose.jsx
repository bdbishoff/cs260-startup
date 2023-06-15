import React from 'react';
import { useEffect } from 'react';
import { Competitive } from "../competitive/competitive";
import { FreePlay } from "../freePlay/freePlay";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './choose.css';

export function Choose() {

    const navigate = useNavigate();

    async function streak(userName) {
        const response = await fetch('/api/highStreak', {
            method: 'post',
            body: JSON.stringify({ user: userName }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let rep = await response.json();
        return rep.score;
    }

    function setDisplay(controlId, display) {
        const playControlEl = document.querySelector(`#${controlId}`);
        if (playControlEl) {
            playControlEl.style.display = display;
        }
    }

    useEffect(() => {
        (async function lgnChange() {
            const userName = localStorage.getItem('userName');
            console.log(userName);
            if (userName) {
                document.getElementById('changeUser').textContent = userName;
                setDisplay('loginControls', 'none');
                setDisplay('playControls', 'block');
                setDisplay('hidenav2', 'block');
                setDisplay('hidenav3', 'block');
                setDisplay('hidenav4', 'block');
                localStorage.setItem("highStreak", await streak(userName));

            } else {
                setDisplay('loginControls', 'block');
                setDisplay('playControls', 'none');
                setDisplay('hidenav2', 'none');
                setDisplay('hidenav3', 'none');
                setDisplay('hidenav4', 'none');
            }
        })();
    }, []);


    return (
        
            <main>
                <h1>Welcome</h1>
                <p>Choose a mode</p>
                <div id="buttons">
                    <form method="get" onSubmit={(e) => {e.preventDefault(); navigate('/Competitive')}}>
                        <button type="submit" className="btn btn-outline-danger">Competitive</button>
                    </form>
                    <form method="get" onSubmit={(e) => {e.preventDefault(); navigate('/FreePlay')}}>
                        <button type="submit" className="btn btn-outline-danger">Free Play</button>
                    </form>
                </div>
            </main>
    );
}