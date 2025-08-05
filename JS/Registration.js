const SubmitData = async (e) => {
  e.preventDefault();

  const loginAPI = `http://localhost:3000/register`;

  const username = document.querySelector("#username").value;
  const pass = document.querySelector("#pass").value;

  let loginData = {
    email: username,
    password: pass,
  };

  try {
    let res = await fetch(loginAPI, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    });
    let data = await res.json();

    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
    if (data.accessToken) {
      window.location = "Login.html";
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

/* 
    johnd -> username
    m38rmF$ -> pass    
*/
