let storage = JSON.parse(localStorage.getItem("token"));

const SubmitData = async (e) => {
  e.preventDefault();

  const loginAPI = `https://fakestoreapi.com/auth/login`;

  const username = document.querySelector("#username").value;
  const pass = document.querySelector("#pass").value;

  let loginData = {
    username: username,
    password: pass,
  };

  try {
    let res = await fetch(loginAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    let data = await res.json();

    localStorage.setItem("token", JSON.stringify(data.token));
    if (storage) {
      window.location = "index.html";
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

/* 
    johnd -> username
    m38rmF$ -> pass    
*/
