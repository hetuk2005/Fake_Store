let tokenStorage = sessionStorage.getItem("token");
if (!tokenStorage) {
  window.location = "Registration.html";
}

let cartArr = JSON.parse(sessionStorage.getItem("cartItem")) || [];

const DataCheck = () => {
  const dataCart = (document.querySelector(".dataCart").innerHTML = "");

  if (cartArr.length === 0) {
    dataCart.innerHTML = `<p>Your Cart Is Empty</p>`;
    costUpdate();
    return;
  }

  cartArr.forEach((eli) => {
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

    divDetails.append(img, heading, price);
    divQuanty.append(button_1, count, button_2);
    finalDiv.append(id, divDetails, divQuanty);
    dataCart.append(finalDiv);
  });
};

const costUpdate = () => {
  let totalPrice = document.querySelector("#totalPrice");
  let tax = document.querySelector("#tax");
  let finalGT = document.querySelector("#finalGT");

  totalPrice.innerHTML = "";
  tax.innerHTML = "";
  finalGT.innerHTML = "";

  let shipping = 50;
  let total = 0;
};
