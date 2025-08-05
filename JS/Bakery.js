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
    })
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

    cardDiv.className = "card_div";
    title.className = "title";
    rating.className = "rating";
    price.className = "price";
    description.className = "description";
    category.className = "category";
    rate.className = "rate";
    count.className = "count";
    img.className = "div_image";

    img.src = element.image;
    title.innerText = element.title;
    id.innerHTML = `<b><u>ID</u>: ${element.id}</b>`;
    price.innerHTML = `<b><u>Price</u>: ₹${element.price}</b>`;
    description.innerHTML = `<b><u>Description</u>: ${element.description}</b>`;
    category.innerHTML = `<b><u>Category</u>: ${element.category}</b>`;
    rate.innerHTML = `<b><u>Rate</u>: ${element.rating.rate} Stars</b>`;
    count.innerHTML = `<b><u>Count</u>: ${element.rating.count}</b>`;

    rating.append(price, rate, count);
    cardDiv.append(img, title, id, description, category, rating);
    dataShow.append(cardDiv);
  });
};

const searchFunc = async () => {
  let search = document.querySelector("#search").value;
  try {
    let res = await fetch(api);
    let data = await res.json;
    let searchArr = data.filter((el) => {
      return search === el.category || search === el.title;
      appendsFunc(searchArr);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
