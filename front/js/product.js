// Get the product id thanks to the url
let onPageUrl = window.location;
let url = new URL(onPageUrl);
let id = url.searchParams.get("id");

// Call the API for one object by id
fetch(`http://localhost:3000/api/products/${id}`)
      // First promise : if we get a response
      .then(function (res) {
            if (res.ok) {
                  // Get the data in JSON
                  return res.json();
            }
      })
      // Second promise : get the js object
      .then(function getOneKanapData(oneKanapData) {
            let products = JSON.parse(localStorage.getItem("products"));
            createProductCard(oneKanapData);
            loopForTitles(oneKanapData);
            loopForOptions(oneKanapData);
            addToLocalStorage(oneKanapData);
            loopForTotalQty(products);
      })
      // If the API cannot be called
      .catch(function (err) {
            console.log(err);
            const itemPrice = document.querySelector("#price");
            const article = itemPrice.closest("article");
            article.remove();

            const item = document.querySelector(".item");
            const messageExcuses = document.createElement("p");
            messageExcuses.innerText = "Toutes nos excuses, la base de données des Kanaps n'est pas accessible :(";
            item.appendChild(messageExcuses);
            messageExcuses.style.textAlign = "center";
      });

// FUNCTION FOR NUMBERS =================== Create for the price number a space after the thousand number

function nombresAvecEspaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Function that create the Kanap card
function createProductCard(oneKanapData) {
      const itemImg = document.getElementsByClassName("item__img")[0];
      const img = document.createElement("img");
      itemImg.appendChild(img);
      img.src = oneKanapData.imageUrl;
      img.alt = oneKanapData.altTxt;

      const price = (document.getElementById("price").innerText = nombresAvecEspaces(oneKanapData.price));

      const description = (document.getElementById("description").innerText = oneKanapData.description);

      const colors = document.getElementById("colors");
}

// Function that replace the title page and create title product
function loopForTitles(oneKanapData) {
      const title = document.getElementsByClassName("title");
      for (let i = 0; i < title.length; i++) {
            title[i].innerText = oneKanapData.name;
      }
}

// Function that create the color options
function loopForOptions(oneKanapData) {
      for (let i = 0; i < oneKanapData.colors.length; i++) {
            const option = document.createElement("option");
            colors.appendChild(option);
            option.value = oneKanapData.colors[i];
            option.innerText = oneKanapData.colors[i];
      }
}

// Function that create the local storage and add new products in
function addDataToCart(oneKanapData) {
      let color = document.querySelector("#colors").value;
      let qty = document.querySelector("#quantity").valueAsNumber; //   let qtyNumber = parseInt(qty, 10);
      let addProduct = { color: color, id: id, quantity: qty };
      let products = JSON.parse(localStorage.getItem("products"));

      // If the color or the quantity are not given, create an alert
      if (color == "" || qty == "" || isNaN(qty) == true) {
            alert("Vous devez obligatoirement choisir une couleur et indiquer une quantité.");
            // If there is no products in the local storage, create the array and push the new product
      } else if (products === null) {
            products = [];
            products.push(addProduct);
            let productsJson = JSON.stringify(products);
            localStorage.setItem("products", productsJson);
            alert(`Vous avez ajouté ${addProduct.quantity} ${oneKanapData.name} en ${addProduct.color} à votre panier.`);
            // If there is already a product with the same id and color just add the quantity
      } else {
            if (products.some((e) => e.id === addProduct.id && e.color === addProduct.color)) {
                  let objIndex = products.findIndex((product) => product.id === addProduct.id && product.color === addProduct.color);
                  products[objIndex].quantity = products[objIndex].quantity += addProduct.quantity;
                  alert(`Vous avez ajouté ${addProduct.quantity} ${oneKanapData.name} en ${addProduct.color} à votre panier.`);
                  // If there is already a product but not with the same id and color, push the new product in array in first position
            } else {
                  products.unshift(addProduct);
                  alert(`Vous avez ajouté ${addProduct.quantity} ${oneKanapData.name} en ${addProduct.color} à votre panier.`);
            }
            let productsJson = JSON.stringify(products);
            localStorage.setItem("products", productsJson);
      }

      // OLD METHOD
      //         let itemAlreadyInCart = false;
      //         for (product of products) {
      //               if (addProduct.id === product.id && addProduct.color === product.color) {
      //                     itemAlreadyInCart = true;
      //                     product.quantity = product.quantity + addProduct.quantity;
      //               }
      //         }
      //         if (itemAlreadyInCart == false) {
      //               products.unshift(addProduct);
      //         }
      //         let productsJson = JSON.stringify(products);
      //         localStorage.setItem("products", productsJson);
      //   }
}

// EVENT LISTENER =================== ADD TO CART
function addToLocalStorage(oneKanapData) {
      const addToCart = document.getElementById("addToCart");
      addToCart.addEventListener("click", function () {
            addDataToCart(oneKanapData);

            let products = JSON.parse(localStorage.getItem("products"));
            loopForTotalQty(products);
      });
}

// TOTAL QUANTITY =================== Function that refresh the total of products in the cart by the local storage
function loopForTotalQty(products) {
      let sumQty = 0;
      if (products === null) {
            cart.innerText = `Panier`;
      } else {
            for (let product of products) {
                  sumQty = sumQty + product.quantity;
            }
            if (sumQty >= 1) {
                  cart = document.getElementById("cart");
                  cart.innerText = `Panier (${sumQty})`;
            }
      }
}
