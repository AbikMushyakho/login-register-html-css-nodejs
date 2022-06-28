const form = document.getElementById("signup_form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const confirm_password = formData.get("signup_confirm_password");
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    phone_no: formData.get("phone_number"),
    password: formData.get("signup_password"),
  };
  const strongPasswordTest = strongPassword.test(data.password);
  if (confirm_password !== data.password) {
    SwalFunction(
      "warning",
      "Opps..",
      "Confim password must be same as password!!!",
      "Try Again!!!",
      ""
    );
  } else if (grecaptcha.getResponse() == 0) {
    SwalFunction("warning", "Opps..", "Captcha is null!!!", "Try Again!!!","");
  } else if (!strongPasswordTest) {
    SwalFunction(
      "warning",
      "Opps..",
      "Password must contain: Atleast one (8 characters,lowercase,uppercase,special_character)",
      "Try Again!!!",
      ""
    );
  } else {
    Register(data);
  }
});

// Sending data to server
function Register(data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/register", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    const response = JSON.parse(this.responseText);
    if (response.status) {
      form.reset();
      grecaptcha.reset();
      localStorage.setItem('email',data.email);
      SwalFunction("success", "Success!!!", response.message, "Verify","/verify_code");
      // setInterval(() => {
      //   container.classList.remove("right-panel-active");
      // }, 2000);
    } else {
      form.reset();
      grecaptcha.reset();
      SwalFunction("warning", "Failure!!!", response.message, "Try Again!!!","");
    }
  };
}
