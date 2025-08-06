const api = "http://localhost:3000/products";

const storage = JSON.parse(sessionStorage.getItem("category"));

const countCategory = () => {
  if (!storage) return;
  let filterSelect = document.querySelector("#filter");

  Object.keys(storage).map((key) => {
    let options = document.createElement("option");
    options.value = key;
    options.innerText = key;
    filterSelect.append(options);
  });
};

countCategory();

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

const appendsFunc = (data) => {
  let dataShow = document.getElementById("info");
  dataShow.innerHTML = "";

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

    cardDiv.className = "card_div";
    title.className = "title placeholder";
    rating.className = "rating placeholder";
    price.className = "price placeholder";
    description.className = "description placeholder";
    category.className = "category placeholder";
    rate.className = "rate placeholder";
    count.className = "count placeholder";
    img.className = "div_image placeholder";
    id.className = "placeholder";

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

    rating.append(price, rate, count);
    cardDiv.append(img, title, id, description, category, rating);
    dataShow.append(cardDiv);
  });
};

const searchFunc = async () => {
  console.log("I Am Invoked: ");

  let search = document.querySelector("#search").value;
  console.log("Search: ", search);

  try {
    let res = await fetch(api);
    let data = await res.json();
    let searchArr = data.filter((el) => {
      return search === el.category || search === el.title;
      console.log("SearchArr: ", searchArr);
    });
    appendsFunc(searchArr);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const filterFunc = async () => {
  console.log("I Am Filtered: ");

  let filter = document.querySelector("#filter").value;
  console.log("Filter: ", filter);

  try {
    let res = await fetch(api);
    let data = await res.json();
    let filterArr = data.filter((el) => {
      return search === el.category;
      console.log("FilterArr: ", filterArr);
    });
    appendsFunc(filterArr);
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
