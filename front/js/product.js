let onPageUrl = window.location;
let url = new URL(onPageUrl);
let id = url.searchParams.get("id");

// Call the API for one object by id
fetch(`http://localhost:3000/api/products/${id}`)
      .then(function (res) {
            if (res.ok) {
                  // Call the API in JSON format
                  return res.json();
            }
      })
      .then(function getOneKanapData(oneKanapData) {
            let products = JSON.parse(localStorage.getItem("products"));
            createProductCard(oneKanapData);
            loopForTitles(oneKanapData);
            loopForOptions(oneKanapData);
            addToLocalStorage(oneKanapData);
            loopForTotalQty(products);
      })
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

// FUNCTION FOR NUMBERS ===================

function nombresAvecEspaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

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

function loopForTitles(oneKanapData) {
      const title = document.getElementsByClassName("title");
      for (let i = 0; i < title.length; i++) {
            title[i].innerText = oneKanapData.name;
      }
}

function loopForOptions(oneKanapData) {
      for (let i = 0; i < oneKanapData.colors.length; i++) {
            const option = document.createElement("option");
            colors.appendChild(option);
            option.value = oneKanapData.colors[i];
            option.innerText = oneKanapData.colors[i];
      }
}

// EVENT LISTENER =================== ADD TO CART

function addDataToCart(oneKanapData) {
      let color = document.querySelector("#colors").value;
      let qty = document.querySelector("#quantity").valueAsNumber; //   let qtyNumber = parseInt(qty, 10);
      let addProduct = { color: color, id: id, quantity: qty };
      let products = JSON.parse(localStorage.getItem("products"));

      if (color == "" || qty == "" || isNaN(qty) == true) {
            alert("Vous devez obligatoirement choisir une couleur et indiquer une quantité.");
      } else if (products === null) {
            products = [];
            products.push(addProduct);
            let productsJson = JSON.stringify(products);
            localStorage.setItem("products", productsJson);
            console.log("Je crée le tableau");
            alert(`Vous avez ajouté ${addProduct.quantity} ${oneKanapData.name} en ${addProduct.color} à votre panier.}`);
      } else {
            if (products.some((e) => e.id === addProduct.id && e.color === addProduct.color)) {
                  let objIndex = products.findIndex((product) => product.id === addProduct.id && product.color === addProduct.color);
                  products[objIndex].quantity = products[objIndex].quantity += addProduct.quantity;
                  console.log("J'ajoute la quantité");
                  alert(`Vous avez ajouté ${addProduct.quantity} ${oneKanapData.name} en ${addProduct.color} à votre panier.`);
            } else {
                  products.unshift(addProduct);
                  console.log("Je crée un objet en plus");
                  alert(`Vous avez ajouté ${addProduct.quantity} ${oneKanapData.name} en ${addProduct.color} à votre panier.`);
            }
            let productsJson = JSON.stringify(products);
            localStorage.setItem("products", productsJson);
      }

      //         let itemAlreadyInCart = false;
      //         for (product of products) {
      //               if (addProduct.id === product.id && addProduct.color === product.color) {
      //                     itemAlreadyInCart = true;
      //                     product.quantity = product.quantity + addProduct.quantity;
      //                     console.log("J'ajoute la quantité");
      //               }
      //         }
      //         if (itemAlreadyInCart == false) {
      //               products.unshift(addProduct);
      //               console.log("Je crée un objet en plus");
      //         }
      //         let productsJson = JSON.stringify(products);
      //         localStorage.setItem("products", productsJson);
      //   }
}

function addToLocalStorage(oneKanapData) {
      const addToCart = document.getElementById("addToCart");
      addToCart.addEventListener("click", function () {
            addDataToCart(oneKanapData);

            let products = JSON.parse(localStorage.getItem("products"));
            loopForTotalQty(products);
      });
}

// TOTAL QUANTITY ===================

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
