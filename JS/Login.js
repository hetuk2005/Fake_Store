const loginApi = `http://localhost:3000/login`;

async function loginForm(e) {
  e.preventDefault();

  let password = document.querySelector("#pass").value;
  let email = document.querySelector("#email").value;

  // Email Validation

  if (email === "") {
    document.getElementById("email_message").innerHTML =
      "Please Fill The Email Field";
    return false;
  } else if (email.indexOf("@") <= 0) {
    document.getElementById("email_message").innerHTML = "Invalid Email";
    return false;
  } else if (
    email.charAt(email.length - 4) !== "." &&
    email.charAt(email.length - 3) !== "."
  ) {
    document.getElementById("email_message").innerHTML = "Invalid Email Domain";
    return false;
  }

  // Password Validation

  if (password !== null) {
    if (password.trim() === "") {
      document.getElementById("pass_message").innerHTML =
        "Please Enter The Value";
    } else if (password.length > 8 && password.length > 20) {
      document.getElementById("pass_message").innerHTML =
        "Please Enter The Corrected Length";
    } else {
      const UpperCase = /[A-Z]/.test(password);
      const LowerCase = /[a-z]/.test(password);
      const NumCase = /[0-9]/.test(password);
      // const SpecialCase = /[!@#$%^&*\,.?":{}|<>]/.test(password);
      if (!UpperCase) {
        document.getElementById("pass_message").innerHTML =
          "Please Enter The One Upper Case In Password";
      } else if (!LowerCase) {
        document.getElementById("pass_message").innerHTML =
          "Please Enter The One Lower Case In Password";
      } else if (!NumCase) {
        document.getElementById("pass_message").innerHTML =
          "Please Enter The One Number In Password";
      } // else if (!SpecialCase) {
      //   document.getElementById("pass_message").innerHTML =
      //     "Please Enter The One Special Charater Case In Password"
      // }
    }
  } else if (password != confirm_password) {
    document.getElementById("pass_message").innerHTML =
      "Password Not Matched With Confired Password";
    return false;
  } else {
    document.getElementById("pass_message").innerHTML = "Login Successful";
  }

  let formObject = {
    email,
    password,
  };

  try {
    let response = await fetch(loginApi, {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    console.log("🚀 ~ data:", data);
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));

    if (data.accessToken) {
      window.location = "Home.html";
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
}

const changeToRegistration = () => {
  window.location = "Registration.html";
};

const home = () => {
  window.location = "Bakery.html";
};
