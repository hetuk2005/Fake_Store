const api = "https://fakestoreapi.com/products";

let cartArr = JSON.parse(localStorage.getItem("cartItem")) || [];
console.log("cartArr: ", cartArr.length);

const path = window.location.pathname;
// console.log(path);

const cartLength = document.querySelector("span");
if (path === "/index.html") {
  cartLength.style.display = cartArr.length < 0 ? "none" : "block";
  cartLength.className = cartArr.length > 0 ? "cartLength-active" : "none";
  cartLength.innerHTML = cartArr.length > 0 ? cartArr.length : "";
}

const Apicalling = () => {
  fetch(api)
    .then((res) => res.json())
    .then((res) => appendsFunc(res))
    .catch((err) => console.log(err));
};

const appendsFunc = (data) => {
  let dataShow = document.getElementById("info");

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
    let cart_btn1 = document.createElement("img");

    cardDiv.className = "card_div";
    title.className = "title";
    rating.className = "rating";
    price.className = "price";
    description.className = "description";
    category.className = "category";
    rate.className = "rate";
    count.className = "count";
    cart_btn1.className = "cart_btn";
    img.className = "div_image";

    cart_btn1.src = "./Utils/Cart.svg";
    img.src = element.image;
    title.innerText = element.title;
    id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
    price.innerHTML = `<b><u>Price</u>: $${element.price}</b>`;
    description.innerHTML = `<b><u>Description</u>: ${element.description}</b>`;
    category.innerHTML = `<b><u>Category</u>: ${element.category}</b>`;
    rate.innerHTML = `<b><u>Rate</u>: ${element.rating.rate} Stars</b>`;
    count.innerHTML = `<b><u>Count</u>: ${element.rating.count}</b>`;

    cart_btn1.addEventListener("click", function () {
      cartArr.push(element);
      localStorage.setItem("cartItem", JSON.stringify(cartArr));
      if (cartArr.length && path === "/index.html") {
        cartLength.style.display = "block";
        cartLength.className = "cartLength-active";
        cartLength.innerHTML = cartArr.length;
      }
    });

    rating.append(price, rate, count);
    cardDiv.append(img, title, id, description, category, rating, cart_btn1);
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
