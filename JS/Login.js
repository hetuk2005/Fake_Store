let storage = JSON.parse(sessionStorage.getItem("token"));

const SubmitData = async (e) => {
  e.preventDefault();

  const loginAPI = `http://localhost:3000/users`;

  const username = document.querySelector("#username").value;
  const pass = document.querySelector("#pass").value;

  let loginData = {
    email: username,
    password: pass,
  };

  try {
    let res = await fetch(loginAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    let data = await res.json();
    console.log(data);

    if (storage) {
      window.location = "Bakery.html";
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

/* 
    johnd -> username
    m38rmF$ -> pass    
*/
