import React from 'react';
import { useEffect } from 'react';
import { Choose } from '../choose/choose';
import { useNavigate } from 'react-router-dom';
import './login.css';




export function Login() {

    const navigate = useNavigate();

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

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const userName = document.querySelector('#userName')?.value;
        const password = document.querySelector('#userPassword')?.value;
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            localStorage.setItem('userName', userName);
            localStorage.setItem("highStreak", await streak(localStorage.getItem('userName')));
            navigate('/Choose');
        } else {
            const body = await response.json();
            const modalEl = document.querySelector('#msgModal');
            modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
            const msgModal = new bootstrap.Modal(modalEl, {});
            msgModal.show();
        }
    }

    async function play() {
        navigate('/Choose');
    }

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

    function logout() {
        localStorage.removeItem('userName');
        fetch(`/api/auth/logout`, {
            method: 'delete',
        }).then(() => (window.location.href = '/'));
    }

    async function getUser(email) {
        let scores = [];
        // See if we have a user with the given email.
        const response = await fetch(`/api/user/${email}`);
        if (response.status === 200) {
            return response.json();
        }

        return null;
    }

    function setDisplay(controlId, display) {
        const playControlEl = document.querySelector(`#${controlId}`);
        if (playControlEl) {
            playControlEl.style.display = display;
        }
    }

    return (
        <main>
            <img src="logo.png" width="50" />
            <h1>Welcome</h1>

            <div id="loginControls" style={{ visibility: "none" }}>
                <p>Login to play</p>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                    </div>
                    <input id="userName" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                    </div>
                    <input id="userPassword" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="btn-space">
                    <button type="button" className="btn btn-primary" onClick={loginUser}>Login</button>
                    <button type="button" className="btn btn-primary" onClick={createUser}>Create</button>
                </div>
            </div>


            <div id="playControls" style={{ visibility: "none" }}>
                <button type="button" className="btn btn-primary" onClick={play}>Play</button>
                <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>


            <div className="modal fade" id="msgModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <div className="modal-body">error message here</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
