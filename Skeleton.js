setTimeout(removePlaceholder, 1000);

setTimeout(() => {
  img.src = element.image;
  title.innerText = element.title;
  id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
  price.innerHTML = `<b><u>Price</u>: ₹${element.price}</b>`;
  description.innerHTML = `<b><u>Description</u>: ${element.description}</b>`;
  category.innerHTML = `<b><u>Category</u>: ${element.category}</b>`;
  rate.innerHTML = `<b><u>Rate</u>: ${element.rating.rate} Stars</b>`;
  count.innerHTML = `<b><u>Quantity</u>: ${element.rating.count}</b>`;
  img.classList.remove("placeholder");
  title.classList.remove("placeholder");
  id.classList.remove("placeholder");
  price.classList.remove("placeholder");
  description.classList.remove("placeholder");
  category.classList.remove("placeholder");
  rating.classList.remove("placeholder");
  rate.classList.remove("placeholder");
  count.classList.remove("placeholder");
}, 1000);

const removePlaceholder = () => {
  const placeholder = document.querySelectorAll(".placeholder");
  placeholder.forEach((element) => {
    element.classList.remove("placeholder");
  });
};

// .placeholder,
// .div_image.placeholder {
//   background-color: #b3b3b3;
//   background-image: linear-gradient(to right, #999, #ccc);
//   background-size: 200% 100%;
//   animation: loading 1s linear infinite;
//   border-radius: 5px;
//   transition: all 0.3s ease-in-out;
//   padding: 0 10px;
// }

// @keyframes loading {
//   to {
//     background-position: -170% 0;
//   }
// }

// .placeholder * {
//   visibility: hidden;
// }
