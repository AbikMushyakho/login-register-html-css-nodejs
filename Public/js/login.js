const login_form = document.getElementById("login-form");
login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(login_form);
  const data = {
    email: formData.get("login-email"),
    password: formData.get("login-password"),
  };
  Login(data);
});

function Login(data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    const response = JSON.parse(this.responseText);
    if (response.status) {
      login_form.reset();
      SwalFunction("success", "Success!!!", response.message, "OK","");
    } else {
      login_form.reset();
      SwalFunction("warning", "Failure!!!", response.message, "Try Again!!!","");
    }
  };
}
