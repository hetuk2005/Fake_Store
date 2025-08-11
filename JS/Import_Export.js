export const navbar = ({ showCart = true } = {}) => {
  return `
        <h1 onclick="changeToHome()">Madhur Mithai</h1>
        <nav>
            <ul>
                <img src="./Utils/Bakery Logo.svg" alt="Logo"
                    onclick="sidebar()" id="logo">
                <input type="search" placeholder="🔍  Search"
                    onchange="searchFunc()" id="search">
                <li onclick="changeToHome()">Home</li>
                <li onclick="changeToCart()">
                          Cart
                    ${
                      showCart
                        ? `<span id="cart_num"></span>
                        </li>`
                        : ""
                    }
                <li onclick="changeToLogin()">Sign-Up/Login</li>
                <select name="Filter" id="filter" onclick="filterFunc()">
                </select>
            </ul>
        </nav>`;
};

export const style = () => {
  return `
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100%;
  text-transform: capitalize;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
}

a {
  color: inherit;
  text-decoration: none;
}

nav {
  border: 2px solid;
  border-radius: 15px;
}

ul > img {
  max-width: 70px;
  height: 65px;
  border-radius: 50%;
  object-fit: fill;
  margin: 5px 0;
  border: none;
}

ul > input {
  width: 270px;
  border: 2px solid;
}

ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  font-weight: 700;
  font-size: larger;
  cursor: pointer;
}

option,
select {
  font-size: large;
  font-weight: 700;
  width: 100px;
  height: 30px;
  cursor: pointer;
}

select {
  padding: 0 3px;
  padding-top: 2px;
  border-radius: 10px;
  border: 2px solid;
}
  
  #cart_num {
  text-align: center;
  font-size: small;
  font-weight: 900;
  padding: 2px 1.5px;
  position: absolute;
  top: 74.5px;
  border-radius: 50%;
  background: tomato;
  color: whitesmoke;
  height: 18px;
  width: 18px;
  left: 61.9%;
  cursor: pointer;
}
`;
};
