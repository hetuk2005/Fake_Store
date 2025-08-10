const api = "http://localhost:3500/products";

let page = 1;

let limit = 6;

let logo = document.querySelector("#logo");

logo = false;

let allProducts;

const storage = JSON.parse(sessionStorage.getItem("category"));

// const path = window.location.pathname;
// console.log(path);

// const cartLength = document.querySelector("span");
// if (path === "/Bakery.html") {
//   cartLength.style.display = cartArr.length < 0 ? "none" : "block";
//   cartLength.className = cartArr.length > 0 ? "cartLength-active" : "none";
//   cartLength.innerHTML = cartArr.length > 0 ? cartArr.length : "";
// }

const countCategory = () => {
  if (!storage) return;
  let filterSelect = document.querySelector("#filter");
  filterSelect.innerHTML = ""; // Clear previous options if needed
  Object.keys(storage).map((key) => {
    let options = document.createElement("option");
    options.value = key;
    options.innerText = key;
    filterSelect.append(options);
  });
};

const Apicalling = () => {
  fetch(api)
    .then((res) => res.json())
    .then((res) => {
      let category = res.map((el) => el.category);
      const countCategory = category.reduce((acc, fruit) => {
        acc[fruit] = (acc[fruit] || 0) + 1;
        return acc;
      }, {});

      sessionStorage.setItem("category", JSON.stringify(countCategory));
      appendsFunc(res);
      setTimeout(removePlaceholder, 1000);
    })
    .catch((err) => console.log(err));
};

const appendsFunc = async (data) => {
  let dataShow = document.getElementById("info");
  dataShow.innerHTML = "";

  allProducts = data;

  let cartData = [];

  try {
    let cartRes = await fetch("http://localhost:3500/cart");
    cartData = await cartRes.json();
  } catch (error) {
    cartData = [];
  }

  data.forEach((element) => {
    let cardDiv = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h5");
    let price = document.createElement("p");
    let description = document.createElement("p");
    let category = document.createElement("p");
    let rating = document.createElement("div");
    let rate = document.createElement("p");
    let count = document.createElement("p");
    let id = document.createElement("p");
    let cart = document.createElement("button");
    let cartItem = cartData.find((c) => c.id === element.id);
    let quantity = cartItem ? cartItem.quantity : 0;

    cardDiv.className = "card_div";
    title.className = "title placeholder";
    rating.className = "rating placeholder";
    price.className = "price placeholder";
    description.className = "description placeholder";
    category.className = "category placeholder";
    rate.className = "rate placeholder";
    count.className = "count placeholder";
    img.className = "div_image placeholder";
    cart.className = "cart placeholder";
    id.className = "placeholder";

    setTimeout(() => {
      img.src = element.image;
      title.innerText = element.title;
      id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
      price.innerHTML = `<b><u>Price</u>: ₹${element.price}</b>`;
      description.innerHTML = `<b><u>Description</u>: ${element.description}</b>`;
      category.innerHTML = `<b><u>Category</u>: ${element.category}</b>`;
      rate.innerHTML = `<b><u>Rate</u>: ${element.rating.rate} Stars</b>`;
      count.innerHTML = `<b><u>Quantity</u>: ${quantity}</b>`;
      cart.innerHTML = `Add To Cart`;
      img.classList.remove("placeholder");
      title.classList.remove("placeholder");
      id.classList.remove("placeholder");
      price.classList.remove("placeholder");
      description.classList.remove("placeholder");
      category.classList.remove("placeholder");
      rating.classList.remove("placeholder");
      rate.classList.remove("placeholder");
      count.classList.remove("placeholder");
      cart.classList.remove("placeholder");
    }, 1000);

    cart.addEventListener("click", () => addToCart(element, count));

    rating.append(price, rate, count);
    cardDiv.append(img, title, id, description, category, rating, cart);
    dataShow.append(cardDiv);
  });
};

const addToCart = async (element, countElement) => {
  // const product = allProducts.find((p) => p.id === id);
  // console.log(element);

  let api_cart = `http://localhost:3500/cart`;

  const res = await fetch(`${api_cart}?id=${element.id}`);
  const data = await res.json();

  if (data.length) {
    const updated = {
      ...data[0],
      quantity: (data[0].quantity || 1) + 1,
    };

    await fetch(`${api_cart}/${data[0].id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (countElement)
      countElement.innerHTML = `<b><u>Quantity</u>: ${updated.quantity}</b>`;

    alert("Added To Cart");
  } else {
    await fetch(api_cart, {
      method: "POST",
      body: JSON.stringify({ ...element, quantity: 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (countElement) countElement.innerHTML = `<b><u>Quantity</u>: 1</b>`;

    alert("Item Added To Cart!");
  }
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
    await appendsFunc(searchArr);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const filterFunc = async () => {
  // console.log("I Am Filtered: ");

  let filter = document.querySelector("#filter").value;
  // console.log("Filter: ", filter);

  try {
    let res = await fetch(api);
    let data = await res.json();
    let filterArr = data.filter((el) => {
      return filter === el.category;
      console.log("FilterArr: ", filterArr);
    });
    await appendsFunc(filterArr);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const removePlaceholder = () => {
  const placeholder = document.querySelectorAll(".placeholder");
  placeholder.forEach((element) => {
    element.classList.remove("placeholder");
  });
};

const sidebar = () => {
  const side = document.querySelector(".slide");
  // logo = !logo;
  // side.style.display = logo == false ? "none" : "block";
  side.classList.toggle("active");
};

const sortHigh = async () => {
  try {
    const res = await fetch(api);
    const data = await res.json();

    const sortedData = data.sort((a, b) => b.price - a.price);
    await appendsFunc(sortedData);

    const activeFilter = document.querySelector("#activeFilter");
    activeFilter.innerHTML = `
            <span>High To Low</span>
            <button onclick="clearFilter()"><img src="./Utils/Close.svg"></button>
            `;
    document.querySelector(".slide").classList.remove("active");
  } catch (error) {
    console.log("Error While Sorting High To Low: ", error);
  }
};

const sortLow = async () => {
  try {
    const res = await fetch(api);
    const data = await res.json();

    const sortedData1 = data.sort((a, b) => a.price - b.price);
    await appendsFunc(sortedData1);

    const activeFilter = document.querySelector("#activeFilter");
    activeFilter.innerHTML = `
            <span>Low To High</span>
            <button onclick="clearFilter()"><img src="./Utils/Close.svg"></button>
            `;
    document.querySelector(".slide").classList.remove("active");
  } catch (error) {
    console.log("Error While Sorting Low To High: ", error);
  }
};

const clearFilter = async () => {
  Apicalling();
  document.querySelector("#activeFilter").innerHTML = "";

  try {
    const res = await fetch(api);
    const data = await res.json();
    await appendsFunc(data);
    document.querySelector(".slide").classList.remove("active");
  } catch (error) {
    console.log("Error While Clearing Filter: ", error);
  }
};

const changeToCart = () => {
  window.location = "CartB.html";
};

const changeToLogin = () => {
  window.location = "Registration.html";
};

const changeToHome = () => {
  window.location = "Bakery.html";
};

//Fetch paginated data
const dataFetch = async () => {
  try {
    let res = await fetch(`${api}?_limit=${limit}&_page=${page}`);
    let data = await res.json();
    await appendsFunc(data);
    updateButtons(data.length);
  } catch (error) {
    console.log("Pagination Error:", error);
  }
};

// Update Prev / Next buttons
const updateButtons = (dataLength) => {
  document.getElementById("prev").disabled = page === 1;
  document.getElementById("next").disabled = dataLength < limit;
  document.querySelector(".numOfPage").innerText = `Page: ${page}`; // Show A Current Page
};

// Prev button click

const prevBtnInvokation = () => {
  if (page > 1) {
    page--;
    dataFetch();
  }
};

// Next button click

const nextBtnInvokation = () => {
  page++;
  dataFetch();
};

window.onload = () => {
  Apicalling(); // for category dropdown
  dataFetch(); // for initial paginated data
  countCategory();
};
