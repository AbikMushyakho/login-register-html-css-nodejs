const form = document.getElementById("forget_pw");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.clear();
  const formData = new FormData(form);
  const data = {
    email: formData.get("email"),
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/forget_password", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    const response = JSON.parse(this.responseText);
    if (response.status) {
      form.reset();
      localStorage.setItem('email',data.email);
      SwalFunction("info", "Plese verify!!!", response.message, "Enter code","/verify_code");
    } else {
      SwalFunction("warning", "Failure!!!", response.message, "Try Again!!!","");
    }
  };
});
