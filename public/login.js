(async () => {
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
    
  }
})();



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
    window.location.href = 'choose.html';
  } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

async function play() {
  window.location.href = 'choose.html';
}

async function streak (userName) {
  const response = await fetch('/api/highStreak', {
  method: 'post',
  body: JSON.stringify({user: userName}),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
let rep = await response.json();
console.log(rep);
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

