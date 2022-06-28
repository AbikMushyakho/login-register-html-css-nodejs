const form = document.getElementById("verify_code");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.target);
  const formData = new FormData(form);
  const code = formData.get("code");
  const email = localStorage.getItem("email");
  // console.log(code + email);
  if (email && code) {
    Verify_Code(email, code);
  } else {
    SwalFunction(
      "warning",
      "Failure!!!",
      "Must provide code ",
      "Try Again!!!",
      ""
    );
  }
});

function Verify_Code(email, code) {
  const data = {
    email: email,
    code: code,
  };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/verify_code", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    const response = JSON.parse(this.responseText);
    if (response.status) {
      if (document.referrer === "http://localhost:3000/forget_password") {
        localStorage.setItem("email", data.email);
        SwalFunction(
          "success",
          "Code Verified!!!",
          response.message,
          "Change password",
          "/change_password"
        );
      } else if (document.referrer === "http://localhost:3000/login_register") {
        localStorage.clear();
        SwalFunction(
          "success",
          "Code Verified!!!",
          response.message,
          "Login",
          "/login_register"
        );
      } else {
        SwalFunction(
          "warning",
          "Failure!!!",
          "Something went wrong",
          "Try Again!!!",
          ""
        );
      };
    } else {
      SwalFunction(
        "warning",
        "Failure!!!",
        response.message,
        "Try Again!!!",
        ""
      );
      };
  };
};
