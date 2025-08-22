let tokenStorage = sessionStorage.getItem("token");
if (!tokenStorage) {
  window.location = "Registration.html";
}

let cartArr = JSON.parse(sessionStorage.getItem("cartItem")) || [];

const countCategory = () => {
  if (!cartArr) return;
  let filterSelect = document.querySelector("#filter");
  filterSelect.innerHTML = ""; // Clear previous options if needed
  Object.keys(cartArr).map((key) => {
    let options = document.createElement("option");
    // options.value = key;
    options.innerText = key;
    filterSelect.append(options);
  });
};

const DataCheck = () => {
  const dataCart = document.querySelector(".dataCart");
  dataCart.innerHTML = "";

  if (cartArr.length === 0) {
    dataCart.innerHTML = `<p>Your Cart Is Empty</p>`;
    costUpdate();
    return;
  }

  cartArr.forEach((el, i) => {
    const id = document.createElement("h3");
    const finalDiv = document.createElement("div");
    const divQuanty = document.createElement("div");
    const divDetails = document.createElement("div");
    const button_1 = document.createElement("button");
    const button_2 = document.createElement("button");
    const heading = document.createElement("h3");
    const img = document.createElement("img");
    const count = document.createElement("p");
    const price = document.createElement("p");

    divDetails.classList.add("details");
    divQuanty.classList.add("quantity");
    finalDiv.classList.add("final");
    button_1.classList.add("button_1");
    button_2.classList.add("button_2");

    id.innerText = i + 1;

    button_1.innerHTML = "-";
    button_2.innerHTML = "+";

    heading.innerHTML = el.title;
    img.src = el.image;
    count.innerHTML = el.quantity;
    price.innerHTML = `Price: ₹${el.price}`;

    button_2.addEventListener("click", () => {
      cartArr = cartArr.map((item) =>
        item.id === el.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      sessionStorage.setItem("cartItem", JSON.stringify(cartArr));
      DataCheck();
      costUpdate();
    });

    button_1.addEventListener("click", () => {
      if (el.quantity <= 1) {
        alert("Minimum Quantity Reached");
        return;
      }
      cartArr = cartArr.map((item) =>
        item.id === el.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      sessionStorage.setItem("cartItem", JSON.stringify(cartArr));
      DataCheck();
      costUpdate();
    });

    divQuanty.append(button_1, count, button_2);
    divDetails.append(id, img, heading, price, divQuanty);
    finalDiv.append(divDetails);
    dataCart.append(finalDiv);
  });
};

const costUpdate = () => {
  let totalPrice = document.querySelector("#totalPrice");
  let tax = document.querySelector("#tax");
  let finalGT = document.querySelector("#final_GT");

  totalPrice.innerHTML = "";
  tax.innerHTML = "";
  finalGT.innerHTML = "";

  let shipping = 50;
  let total = 0;

  cartArr.forEach((item) => {
    total += item.quantity * item.price;
  });

  totalPrice.append(`₹${total}`);
  tax.append(`₹${shipping}`);
  finalGT.append(`₹${total + shipping}`);
};

const openModal = () => {
  const modal = document.querySelector("#modal");
  modal?.classList.add("show");
};

const closeModal = () => {
  const modal = document.querySelector("#modal");
  modal?.classList.remove("show");
};

const closeModalHome = () => {
  const modal = document.querySelector("#modal");
  modal?.classList.remove("show");
  window.location = "Bakery.html";
};

const fetchCart = () => {
  fetch(`http://localhost:3500/cart`)
    .then((res) => res.json())
    .then((data) => {
      cartArr = data;
      DataCheck();
      costUpdate();
    });
};

const searchFunc = async () => {
  console.log("I Am Invoked: ");

  let search = document.querySelector("#search").value.trim().toLowerCase();
  // if (!search) return;
  console.log("Search: ", search);

  try {
    let res = await fetch(api);
    let data = await res.json();
    let searchArr = data.filter((el) => {
      return (
        search === el.category.toLowerCase() ||
        search === el.title.toLowerCase()
      );
    });
    console.log("SearchArr: ", searchArr);
    DataCheck(searchArr);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const filterFunc = async () => {
  // console.log("I Am Filtered: ");

  let filter = document.querySelector("#filter").value;
  // console.log("Filter: ", filter);

  try {
    let res = await fetch(`http://localhost:3500/cart`);
    let data = await res.json();
    let filterArr = data.filter((el) => {
      return filter === el.category;
      console.log("FilterArr: ", filterArr);
    });
    DataCheck(filterArr);
  } catch (error) {
    console.log("Error: ", error);
  }
};

let text = "🔍  Search For What You Want...";
let input;
let i = 0;

const typePlaceholder = () => {
  if (!input) return;
  if (i <= text.length) {
    input.setAttribute("placeholder", text.substring(0, i));
    i++;
    setTimeout(typePlaceholder, 100);
  } else {
    i = 0;
    setTimeout(typePlaceholder, 1100);
  }
};

const changeToHome = () => {
  window.location = "Bakery.html";
};

const changeToCart = () => {
  window.location = "CartB.html";
};

const changeToLogin = () => {
  window.location = "Registration.html";
};

window.onload = () => {
  input = document.querySelector("#search");

  const def_avatar =
    "https://raw.githubusercontent.com/hetuk2005/Anime-Website/760ad3d3e4a658d8ef9e8a29af795e5cb0e7da25/utils/Profile.svg";

  const avatarEl = document.querySelector("#avatar");

  const save = sessionStorage.getItem("Avatar");
  avatarEl.src = save || def_avatar;

  avatarEl.addEventListener("click", () => {
    sessionStorage.clear();
    avatarEl.src = def_avatar;
    window.location.href = "Bakery.html";
  });

  DataCheck();
  costUpdate();
  typePlaceholder();
};
