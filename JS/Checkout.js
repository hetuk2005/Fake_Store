let cartArr = JSON.parse(localStorage.getItem("cartItem"));
// console.log("🚀 ~ cartArr:", cartArr);

let tokenStorage = JSON.parse(localStorage.getItem("token"));

if (!tokenStorage) {
  window.location = "Auth.html";
}

const DataCheckout = () => {
  const dataCart = document.querySelector(".dataCart");

  dataCart.innerHTML = "";

  cartArr.map((el, i) => {
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

    button_1.innerText = "-";
    button_2.innerText = "+";

    heading.innerText = el.title;

    img.src = el.image;

    count.innerText = el.count;

    price.innerText = `Price: ${Math.round(el.price * 83)}`;

    button_2.addEventListener("click", () => {
      let updateArr = cartArr.map((ll) => {
        if (el.id === ll.id) {
          return {
            ...ll,
            count: ll.count + 1,
          };
        }
        return ll;
      });
      cartArr = updateArr;
      localStorage.setItem("cartItem", JSON.stringify(cartArr));
      DataCheckout();
      costUpdate();
    });

    button_1.addEventListener("click", () => {
      if (el.count <= 1) {
        alert("Minimum Quantity Has Been Reached");
        return;
      }
      let updateArr = cartArr.map((ll) => {
        if (el.id === ll.id) {
          return {
            ...ll,
            count: ll.count - 1,
          };
        }
        return ll;
      });
      cartArr = updateArr;
      localStorage.setItem("cartItem", JSON.stringify(cartArr));
      DataCheckout();
      costUpdate();
    });

    divDetails.append(img, heading, price);

    divQuanty.append(button_1, count, button_2);
    finalDiv.append(id, divDetails, divQuanty);

    dataCart.append(finalDiv);
  });
};

function costUpdate() {
  let totalPrice = document.querySelector("#totalPrice");
  let tax = document.querySelector("#tax");
  let finalGT = document.querySelector("#final_GT");

  totalPrice.innerHTML = "";
  tax.innerHTML = "";
  finalGT.innerHTML = "";

  let shipping = 10;
  let total = 0;

  cartArr.map((ss) => {
    total += ss.count * Math.round(ss.price * 83);
  });
  // console.log("Total: ", total);

  totalPrice.append(`₹ ${total}`);
  tax.append(`₹ ${shipping * 83}`);
  // console.log(total + shipping);
  finalGT.append(`₹ ${total + shipping * 83}`);
}

const backFun = () => {
  window.location = "index.html";
};

function openModal() {
  const modal = document.querySelector("#modal");
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.querySelector("#modal");
  modal.classList.remove("show");
}

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
