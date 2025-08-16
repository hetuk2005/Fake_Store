const registerApi = `http://localhost:3500/register`;

document.querySelector("#loginPage").addEventListener("click", function () {
  window.location = "Login.html";
});

async function formData(e) {
  e.preventDefault();

  let username = document.querySelector("#user").value;
  let password = document.querySelector("#pass").value;
  let confirm_password = document.querySelector("#confirmpass").value;
  let email = document.querySelector("#email").value;

  document.getElementById("user_message").innerHTML = "";
  document.getElementById("email_message").innerHTML = "";
  document.getElementById("pass_message").innerHTML = "";
  document.getElementById("confirmpass_message").innerHTML = "";

  // Username Validation

  if (username == "") {
    document.getElementById("user_message").innerHTML =
      "Please Fill The Full Name Field";
    return false;
  } else if (!isNaN(username)) {
    document.getElementById("user_message").innerHTML =
      "Only Charaters Allowed";
    return false;
  }

  // Email Validation

  if (email === "") {
    document.getElementById("email_message").innerHTML =
      "Please Fill The Email Field";
    return false;
  } else if (
    email.charAt(email.length - 4) !== "." &&
    email.charAt(email.length - 3) !== "."
  ) {
    document.getElementById("email_message").innerHTML = "Invalid Email Domain";
    return false;
  } else if (email.indexOf("@") <= 0) {
    document.getElementById("email_message").innerHTML = "Invalid Email";
    return false;
  }

  // Password Validation

  if (password !== null) {
    if (password.trim() === "") {
      document.getElementById("pass_message").innerHTML =
        "Please Enter Password";
      return false;
    } else if (password.length > 8 && password.length > 20) {
      document.getElementById("pass_message").innerHTML =
        "Please Enter The Corrected Length";
      return false;
    } else {
      const UpperCase = /[A-Z]/.test(password);
      const LowerCase = /[a-z]/.test(password);
      const NumCase = /[0-9]/.test(password);
      const SpecialCase = /[!@#$%^&*\,.?":{}|<>]/.test(password);
      if (!UpperCase) {
        document.getElementById("pass_message").innerHTML =
          "Please Enter The One Upper Case In Password";
        return false;
      } else if (!LowerCase) {
        document.getElementById("pass_message").innerHTML =
          "Please Enter The One Lower Case In Password";
        return false;
      } else if (!NumCase) {
        document.getElementById("pass_message").innerHTML =
          "Please Enter The One Number In Password";
        return false;
      } else if (!SpecialCase) {
        document.getElementById("pass_message").innerHTML =
          "Please Enter The One Special Charater Case In Password";
        return false;
      }
    }
  }

  // Confirm Password Validation

  if (confirm_password == "") {
    document.getElementById("confirmpass_message").innerHTML =
      "Please Fill The Confirm Password Field";
    return false;
  } else if (password != confirm_password) {
    document.getElementById("confirmpass_message").innerHTML =
      "Password Not Matched With Confired Password";
    return false;
  } else {
    document.getElementById("confirmpass_message").innerHTML =
      "Register Successful";

    let formObject = {
      email,
      password,
    };

    try {
      let response = await fetch(registerApi, {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();

      if (data.accessToken) {
        window.location = "Login.html";
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }

    let submit = document.querySelector("#submit");

    submit = window.location = "Login.html";
  }
}
