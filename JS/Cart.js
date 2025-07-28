let api = "https://fakestoreapi.com/carts";

const Calling = () => {
  fetch(api)
    .then((res) => res.json())
    .then((res) => Store(res))
    .catch((err) => console.log(err));
};

const Store = (data) => {
  let show = document.querySelector("#cart");
  show.innerHTML = "";

  data.forEach((element) => {
    let cardDiv = document.createElement("div");
    let product_div = document.createElement("div");
    let id = document.createElement("p");
    let user_id = document.createElement("p");
    let date = document.createElement("p");
    let product_id = document.createElement("p");
    let quantity = document.createElement("p");

    product_div.className = "product_div";
    cardDiv.className = "cardDiv";

    id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
    user_id.innerHTML = `<b><u>User ID</u>: ${element.userId}</b>`;
    date.innerHTML = `<b><u>Date</u>: ${element.date}</b>`;
    product_id.innerHTML = `<b><u>Product ID</u>: ${element.products.productId}</b>`;
    quantity.innerHTML = `<b><u>Quantity</u>: ${element.products.quantity}</b>`;

    product_div.append(product_id, quantity);
    cardDiv.append(id, user_id, date, product_div);
    show.append(cardDiv);
  });
};
