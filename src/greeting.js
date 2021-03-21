const greetingForm = document.querySelector(".js-greetingForm"),
  input = greetingForm.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USER_LS = "currUser",
  ACTIVE = "active";

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function paintGreeting(name) {
  greetingForm.classList.add(ACTIVE);
  greeting.innerText = `Hello, ${name}`;
}

function handleGreetingSubmit(event) {
  event.preventDefault();
  const currValue = input.value;
  paintGreeting(currValue);
  saveName(currValue);
}

function askUserName() {
  greetingForm.classList.remove(ACTIVE);
  greetingForm.addEventListener("submit", handleGreetingSubmit);
}

function loadUserName() {
  const currUserName = localStorage.getItem(USER_LS);
  if (currUserName === null) {
    // Ask
    askUserName();
  } else {
    // Paint
    paintGreeting(currUserName);
  }
}
loadUserName();
