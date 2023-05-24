function login() {
    console.log("SDfsadfa");
    const nameEl = document.getElementsByClassName("form-control");
    console.log(nameEl[0].value);
    localStorage.setItem("userName", nameEl[0].value);
    localStorage.setItem("highStreak", 0);
    localStorage.setItem("currStreak", 0);
    console.log(document.getElementById("changeUser"));
    document.getElementById("changeUser").innerHTML = nameEl[0].value;
    window.location.href = "choose.html";
  }
  