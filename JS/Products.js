const api = "https://fakestoreapi.com/products";

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
    let cart_btn = document.createElement("img");
    let cart_btn_pag = document.createElement("div");
    let next = document.createElement("button");
    let num = document.createElement("button");
    let prev = document.createElement("button");

    cardDiv.className = "card_div";
    title.className = "title";
    rating.className = "rating";
    price.className = "price";
    description.className = "description";
    category.className = "category";
    rate.className = "rate";
    count.className = "count";
    cart_btn.className = "cart_btn";
    img.className = "div_image";
    cart_btn_pag.className = "cart_btn_pag";
    next.className = "next";
    prev.className = "prev";
    num.className = "num";
    let cart_visible = false;

    cart_btn.src = "./Utils/Cart.svg";
    img.src = element.image;
    title.innerText = element.title;
    id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
    price.innerHTML = `<b><u>Price</u>: $${element.price}</b>`;
    description.innerHTML = `<b><u>Description</u>: ${element.description}</b>`;
    category.innerHTML = `<b><u>Category</u>: ${element.category}</b>`;
    rate.innerHTML = `<b><u>Rate</u>: ${element.rating.rate} Stars</b>`;
    count.innerHTML = `<b><u>Count</u>: ${element.rating.count}</b>`;
    next.innerHTML = `+`;
    prev.innerHTML = `-`;
    num.innerHTML = ``;

    rating.append(price, rate, count);
    cart_btn_pag.append(prev, num, next);
    cardDiv.append(
      img,
      title,
      id,
      description,
      category,
      rating,
      cart_btn,
      cart_btn_pag
    );
    dataShow.append(cardDiv);

    cart_btn.addEventListener("click", () => {
      cart_visible = !cart_visible;
      if (cart_visible) {
        cart_btn.style.display = "none";
        cart_btn_pag.style.display = "flex";
      } else {
        cart_btn.style.display = "inline-block";
        cart_btn_pag.style.display = "none";
      }
    });
  });
};
