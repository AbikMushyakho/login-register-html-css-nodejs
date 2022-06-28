const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


//signup

let signUpPassword = document.querySelector("#signup-password");
let signUpPasswordEye = document.querySelector("#signup-password-eye");
let signUpConfirmPassword = document.querySelector("#signup-confirmpassword");
let signUpConfirmPasswordEye = document.querySelector(
  "#signup-confirmpassword-eye"
);

//sign up password toggle
function signupPasswordToggle() {
  if (isVisible) {
    signUpPassword.setAttribute("type", "password");
    isVisible = false;
    signUpPasswordEye.style.color = "#acacac";
  } else {
    signUpPassword.setAttribute("type", "text");
    isVisible = true;
    signUpPasswordEye.style.color = "black";
  }
}
signUpPasswordEye.addEventListener("click", () => {
  signupPasswordToggle();
});

// sign up  confirm password toggle

function signupConfirmPasswordToggle() {
  if (isVisible) {
    signUpConfirmPassword.setAttribute("type", "password");
    isVisible = false;
    signUpConfirmPasswordEye.style.color = "#acacac";
  } else {
    signUpConfirmPassword.setAttribute("type", "text");
    isVisible = true;
    signUpConfirmPasswordEye.style.color = "black";
  }
}
signUpConfirmPasswordEye.addEventListener("click", () => {
  signupConfirmPasswordToggle();
});

// sign in password toggle

let signInPassword = document.querySelector("#signin-password");
let signInPasswordEye = document.querySelector("#signin-password-eye");

let isVisible = false;
function signinPasswordToggle() {
  if (isVisible) {
    signInPassword.setAttribute("type", "password");
    isVisible = false;
    signInPasswordEye.style.color = "#acacac";
  } else {
    signInPassword.setAttribute("type", "text");
    isVisible = true;
    signInPasswordEye.style.color = "black";
  }
}
signInPasswordEye.addEventListener("click", () => {
  signinPasswordToggle();
});



