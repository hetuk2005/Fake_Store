const api_cart = `http://localhost:3500/cart`;

let cartArr = [];

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
    add.className = "checkout_btn";

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

    cart_btn.addEventListener("click", function () {
      fetch(`${api_cart}/${element.id}`, {
        method: "DELETE",
      })
        .then(() => fetchCart())
        .catch((err) => console.log(err));
    });

    // button.addEventListener("click", () => {
    //   window.location = "CheckOutB.html";
    // });

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
