const api_cart = `http://localhost:3500/cart`;

let cartArr = [];

const storage = JSON.parse(sessionStorage.getItem("category"));

// let tokenStorage = JSON.parse(sessionStorage.getItem("token"));

// if (!tokenStorage) {
//   window.location = "Registration.html";
// }

const fetchCart = () => {
  fetch(api_cart)
    .then((res) => res.json())
    .then((data) => {
      cartArr = data;
      cartDisplay();
    });
};

const cartDisplay = () => {
  appendsFunc(cartArr);
};

const appendsFunc = (data) => {
  let dataShow = document.getElementById("info");
  dataShow.innerHTML = "";

  if (data.length === 0) {
    dataShow.innerHTML = "<h2>Your cart is empty!</h2>";
    return;
  }

  data.forEach((element) => {
    let cardDiv = document.createElement("div");
    let buttonDiv = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h5");
    let price = document.createElement("p");
    let description = document.createElement("p");
    let category = document.createElement("p");
    let rating = document.createElement("div");
    let rate = document.createElement("p");
    let count = document.createElement("p");
    let id = document.createElement("p");
    let cart_btn = document.createElement("button");
    let button = document.createElement("button");
    let add = document.createElement("button");

    cardDiv.className = "card_div";
    buttonDiv.className = "buttonDiv";
    title.className = "title placeholder";
    rating.className = "rating placeholder";
    price.className = "price";
    description.className = "description placeholder";
    category.className = "category placeholder";
    rate.className = "rate";
    count.className = "count";
    cart_btn.className = "cart_btn placeholder";
    img.className = "div_image placeholder";
    button.className = "checkout_btn placeholder";
    add.className = "checkout_btn placeholder";
    id.className = "placeholder";

    setTimeout(() => {
      img.src = element.image;
      cart_btn.innerText = "Remove";
      button.innerText = "Checkout";
      add.innerText = "Add";
      title.innerText = element.title;
      id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
      price.innerHTML = `<b><u>Price</u>: $${element.price}</b>`;
      description.innerHTML = `<b><u>Description</u>: ${element.description}</b>`;
      category.innerHTML = `<b><u>Category</u>: ${element.category}</b>`;
      rate.innerHTML = `<b><u>Rate</u>: ${element.rating.rate} Stars</b>`;
      count.innerHTML = `<b>${element.quantity}</b>`;

      img.classList.remove("placeholder");
      category.classList.remove("placeholder");
      title.classList.remove("placeholder");
      button.classList.remove("placeholder");
      cart_btn.classList.remove("placeholder");
      add.classList.remove("placeholder");
      id.classList.remove("placeholder");
      description.classList.remove("placeholder");
      rating.classList.remove("placeholder");
    }, 1000);

    cart_btn.addEventListener("click", function () {
      if (element.quantity > 1) {
        fetch(`${api_cart}/${element.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...element,
            quantity: element.quantity - 1,
          }),
        })
          .then(() => fetchCart())
          .catch((err) => console.log(err));
      } else {
        fetch(`${api_cart}/${element.id}`, { method: "DELETE" })
          .then(() => fetchCart())
          .catch((err) => console.log(err));
      }
    });
    // button.addEventListener("click", () => {
    //   window.location = "CheckOutB.html";
    // });

    add.addEventListener("click", () => {
      addToCart(element);
    });

    buttonDiv.append(cart_btn, count, add);
    rating.append(price, rate);
    cardDiv.append(
      img,
      title,
      id,
      description,
      category,
      rating,
      buttonDiv,
      button
    );
    dataShow.append(cardDiv);
  });
};

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

const filterFunc = async () => {
  // console.log("I Am Filtered: ");

  let filter = document.querySelector("#filter").value;
  // console.log("Filter: ", filter);

  try {
    let res = await fetch(api_cart);
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

const changeToHome = () => {
  window.location = "Bakery.html";
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

    // alert("Quantity Updated To Cart");
  } else {
    await fetch(api_cart, {
      method: "POST",
      body: JSON.stringify({ ...element, quantity: 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (countElement) countElement.innerHTML = `<b><u>Quantity</u>: 1</b>`;

    // alert("Item Added To Cart!");
  }
};
