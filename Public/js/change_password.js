const form = document.getElementById("change_password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const password = formData.get("signup-password");
  const confirm_password = formData.get("confirm_password");
  const strongPasswordTest = strongPassword.test(password);
  if (password != confirm_password) {
    SwalFunction(
      "warning",
      "Info",
      "Password and confirm password not matched!!",
      "Try Again!!!",
      ""
    );
  } 
  else if(!strongPasswordTest){
    SwalFunction(
        "warning",
        "Info",
        "Password must contain more than 8 letters containing number, lowercase letter, uppercase letter,special character!!!",
        "Try Again!!!",
        ""
      );
  }
  else {
    const email = localStorage.getItem("email");
    const data = {
      email: email,
      password: password,
    };
    Change(data);
  }
});
function Change(data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/change_password", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    const response = JSON.parse(this.responseText);
    if (response.status) {
      SwalFunction("success", "Success!!", response.message,"Login" , "/");
    } else {
      SwalFunction("error", "Failure!!", response.message,"Try Again!!!" ,"");
    }
  };
}
