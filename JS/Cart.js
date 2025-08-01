let cartArr = JSON.parse(localStorage.getItem("cartItem")) || [];

let tokenStorage = JSON.parse(sessionStorage.getItem("token"));

if (!tokenStorage) {
  window.location = "Auth.html";
}

const path = window.location.pathname;
// console.log(path);

const cartLength = document.querySelector("span");
if (path === "/index.html") {
  cartLength.style.display = cartArr.length < 0 ? "none" : "block";
  cartLength.className = cartArr.length > 0 ? "cartLength-active" : "none";
  cartLength.innerHTML = cartArr.length > 0 ? cartArr.length : "";
}

const result = cartArr.reduce((acc, item) => {
  const existing = acc.find((el) => el.id === item.id);
  if (existing) {
    existing.count += 1; // increment count
  } else {
    acc.push({ ...item }); // clone item
  }
  return acc;
}, []);

cartArr = result;

localStorage.setItem("cartItem", JSON.stringify(cartArr));

const Apicalling = () => {
  fetch(api)
    .then((res) => res.json())
    .then((res) => appendsFunc(res))
    .catch((err) => console.log(err));
};

const appendsFunc = (data) => {
  let dataShow = document.getElementById("info");
  dataShow.innerHTML = "";

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

    cardDiv.className = "card_div";
    buttonDiv.className = "buttonDiv";
    title.className = "title";
    rating.className = "rating";
    price.className = "price";
    description.className = "description";
    category.className = "category";
    rate.className = "rate";
    count.className = "count";
    cart_btn.className = "cart_btn";
    img.className = "div_image";
    button.className = "checkout_btn";

    img.src = element.image;
    cart_btn.innerText = "Remove";
    button.innerText = "Checkout";
    title.innerText = element.title;
    id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
    price.innerHTML = `<b><u>Price</u>: $${element.price}</b>`;
    description.innerHTML = `<b><u>Description</u>: ${element.description}</b>`;
    category.innerHTML = `<b><u>Category</u>: ${element.category}</b>`;
    rate.innerHTML = `<b><u>Rate</u>: ${element.rating.rate} Stars</b>`;
    count.innerHTML = `<b><u>Count</u>: ${element.rating.count}</b>`;

    cart_btn.addEventListener("click", function () {
      // cartArr.push(element);

      let deleteData = cartArr.filter((dl) => {
        return dl.id !== element.id;
      });
      cartArr = deleteData;

      localStorage.setItem("cartItem", JSON.stringify(cartArr));
      appendsFunc(cartArr);
    });

    button.addEventListener("click", () => {
      window.location = "Checkout.html";
    });

    buttonDiv.append(cart_btn, button);
    rating.append(price, rate, count);
    cardDiv.append(img, title, id, description, category, rating, buttonDiv);
    dataShow.append(cardDiv);
  });
};

const cartDisplay = () => {
  appendsFunc(cartArr);
};

const home = () => {
  window.location = "index.html";
};

const checkout = () => {
  window.location = "Checkout.html";
};

const cart = () => {
  window.location = "Cart.html";
};

const auth = () => {
  window.location = "Auth.html";
};
