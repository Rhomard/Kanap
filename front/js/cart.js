// Call the API
fetch("http://localhost:3000/api/products/")
      // First promise : if we get a response
      .then(function (res) {
            if (res.ok) {
                  // Get the data in JSON
                  return res.json();
            }
      })
      // Second promise : get the js object
      .then(function getKanapData(kanapData) {
            let products = JSON.parse(localStorage.getItem("products"));
            loopToSearchId(kanapData, products);
            loopForTotalQty(products);
            loopForTotalPrice(kanapData, products);
      })
      // If the API cannot be called
      .catch(function (err) {
            console.log(err);

            const emptyCart = document.querySelector("#card_setting");
            emptyCart.innerHTML = "Votre panier <br> est vide";

            const messageExcuses = document.createElement("p");
            messageExcuses.innerText = "Toutes nos excuses, la base de données des Kanaps n'est pas accessible :(";
            emptyCart.appendChild(messageExcuses);
            messageExcuses.style.fontSize = "20px";
      });

// Function that search product by id
function loopToSearchId(api, products) {
      // If there is no corresponding product, cart empty and redirect to home
      if (products === null || products.length === 0) {
            const emptyCart = document.querySelector("#card_setting");
            emptyCart.innerHTML = "Votre panier <br> est vide";
            const voirAccueil = document.createElement("p");
            voirAccueil.innerText = "Vous pouvez trouver notre gamme d'articles exclusifs sur l'accueil :)";
            emptyCart.appendChild(voirAccueil);
            voirAccueil.style.fontSize = "20px";
            // If there is corresponding product, create a product card for each
      } else {
            for (let product of products) {
                  for (let data of api) {
                        if (product.id === data._id) {
                              createProductCard(product, data);
                        }
                  }
            }
            changeQty(api, products);
            deleteItem(api, products);
      }
}

// Function that create a product card in the cart
function createProductCard(localStorage, api) {
      const article = document.createElement("article");
      article.classList.add("cart__item");
      cart__items.appendChild(article);
      article.setAttribute("data-id", api._id);
      article.setAttribute("data-color", localStorage.color);

      const divImg = document.createElement("div");
      divImg.classList.add("cart__item__img");
      article.appendChild(divImg);

      const img = document.createElement("img");
      divImg.appendChild(img);
      img.src = api.imageUrl;

      const divItemContent = document.createElement("div");
      divItemContent.classList.add("cart__item__content");
      article.appendChild(divItemContent);

      const divContentDescription = document.createElement("div");
      divContentDescription.classList.add("cart__item__content__description");
      divItemContent.appendChild(divContentDescription);

      const title = document.createElement("h2");
      divContentDescription.appendChild(title);
      title.innerText = api.name;

      const color = document.createElement("p");
      divContentDescription.appendChild(color);
      color.innerText = localStorage.color;

      const price = document.createElement("p");
      divContentDescription.appendChild(price);
      price.innerText = nombresAvecEspaces(`${api.price} €`);

      const divContentSettings = document.createElement("div");
      divContentSettings.classList.add("cart__item__content__settings");
      divItemContent.appendChild(divContentSettings);

      const divContentSettingsQuantity = document.createElement("div");
      divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
      divContentSettings.appendChild(divContentSettingsQuantity);

      const quantity = document.createElement("p");
      divContentSettingsQuantity.appendChild(quantity);
      quantity.innerText = "Qté :";

      const input = document.createElement("input");
      divContentSettingsQuantity.appendChild(input);
      input.type = "number";
      input.classList.add("itemQuantity");
      input.min = "1";
      input.max = "100";
      input.value = localStorage.quantity;

      const divContentSettingsDelete = document.createElement("div");
      divContentSettingsDelete.classList.add("cart__item__content__settings__delete");
      divContentSettings.appendChild(divContentSettingsDelete);

      const suppr = document.createElement("p");
      suppr.classList.add("deleteItem");
      divContentSettingsDelete.appendChild(suppr);
      suppr.innerHTML = "Supprimer";
}

// TOTAL QUANTITY ===================

// Function that calculate the total quantity of products
function loopForTotalQty(products) {
      document.getElementById("totalQuantity").innerText = "";
      let sumQty = 0;
      if (products === null) {
            document.getElementById("totalQuantity").innerText = "";
      } else {
            for (let product of products) {
                  sumQty = sumQty + product.quantity;
            }
            if (sumQty === 1) {
                  document.getElementById("totalQuantity").innerText = `Total de ${sumQty} article :`;
                  document.querySelector("#card_setting").innerHTML = `Votre panier <br> de ${sumQty} article`;
                  cart = document.getElementById("cart");
                  cart.innerText = `Panier (${sumQty})`;
            } else if (sumQty > 1) {
                  document.getElementById("totalQuantity").innerText = `Total des ${sumQty} articles :`;
                  document.querySelector("#card_setting").innerHTML = `Votre panier <br> de ${sumQty} articles`;
                  cart = document.getElementById("cart");
                  cart.innerText = `Panier (${sumQty})`;
            } else {
                  const emptyCart = document.querySelector("#card_setting");
                  emptyCart.innerHTML = "Votre panier <br> est vide";
                  const voirAccueil = document.createElement("p");
                  voirAccueil.innerText = "Vous pourrez trouver notre gamme d'articles exclusifs sur l'accueil :)";
                  emptyCart.appendChild(voirAccueil);
                  voirAccueil.style.fontSize = "20px";
                  cart = document.getElementById("cart");
                  cart.innerText = `Panier`;
            }
      }
}

// FUNCTION FOR NUMBERS =================== Create for the price number a space after the thousand number

function nombresAvecEspaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// TOTAL PRICE ===================

// Function that calculate the total price of products
function loopForTotalPrice(api, products) {
      let sumPrice = 0;
      if (products !== null) {
            api.forEach((data) => {
                  if (products.some((e) => e.id === data._id)) {
                        let objIndex = products.findIndex((product) => product.id === data._id);
                        sumPrice = sumPrice + data.price * products[objIndex].quantity;
                  }
                  if (products.length >= 1) {
                        document.getElementById("totalPrice").innerText = `${nombresAvecEspaces(sumPrice)} €`;
                  } else {
                        document.getElementById("totalPrice").innerText = "";
                  }
            });
      }
}

// EVENT LISTENER =================== CHANGE PRODUCT QUANTITY

// Function that change the quantity in the local storage
function changeQty(api, products) {
      const inputs = document.querySelectorAll(".itemQuantity");
      inputs.forEach((input) => {
            input.addEventListener("change", function () {
                  const product = input.closest("article");
                  const productId = product.dataset.id;
                  const productColor = product.dataset.color;
                  if (products.some((e) => e.id === productId && e.color === productColor)) {
                        let objIndex = products.findIndex((product) => product.id === productId && product.color === productColor);
                        products[objIndex].quantity = input.valueAsNumber;
                  }
                  let productsJson = JSON.stringify(products);
                  localStorage.setItem("products", productsJson);
                  loopForTotalQty(products);
                  loopForTotalPrice(api, products);
            });
      });
}

// EVENT LISTENER =================== DELETE THIS PRODUCT

// Function that delete an item in the local storage and in the cart
function deleteItem(api, products) {
      const itemDelete = document.querySelectorAll(".deleteItem");
      itemDelete.forEach((item) => {
            item.addEventListener("click", function () {
                  const product = item.closest("article");
                  product.remove();
                  const productId = product.dataset.id;
                  const productColor = product.dataset.color;
                  if (products.some((e) => e.id === productId && e.color === productColor)) {
                        let objIndex = products.findIndex((product) => product.id === productId && product.color === productColor);
                        products.splice(objIndex, 1);
                        let productsJson = JSON.stringify(products);
                        localStorage.setItem("products", productsJson);
                        loopForTotalQty(products);
                        loopForTotalPrice(api, products);
                  }
            });
      });
}

// LISTENING CHANGES ON INPUT =================== FIRSTNAME

let firstName = document.getElementById("firstName");
firstName.addEventListener("change", function () {
      validFirstName(this);
});

// Function that return true or false if the regexp for the first name is respected
function validFirstName(inputFirstName) {
      const firstNameRegExp = new RegExp("^([A-Z][a-z]+ ?-?)*$");

      if (!firstNameRegExp.test(inputFirstName.value)) {
            document.getElementById("firstNameErrorMsg").innerText = "Votre prénom doit commencer par une majuscule et ne pas contenir de chiffre.";
            return false;
      } else if (inputFirstName.value.length < 3) {
            document.getElementById("firstNameErrorMsg").innerText = "Votre prénom doit contenir au moins 3 caractères.";
            return false;
      } else {
            document.getElementById("firstNameErrorMsg").innerText = "";
            return true;
      }
}

// LISTENING CHANGES ON INPUT =================== LASTNAME

let lastName = document.getElementById("lastName");
lastName.addEventListener("change", function () {
      validLastName(this);
});

// Function that return true or false if the regexp for the last name is respected
function validLastName(inputLastName) {
      const lastNameRegExp = new RegExp("^([A-Z][a-z]+ ?-?)*$");

      if (!lastNameRegExp.test(inputLastName.value)) {
            document.getElementById("lastNameErrorMsg").innerText = "Votre nom doit commencer par une majuscule et ne pas contenir de chiffre.";
            return false;
      } else if (inputLastName.value.length < 3) {
            document.getElementById("lastNameErrorMsg").innerText = "Votre nom doit contenir au moins 3 caractères.";
            return false;
      } else {
            document.getElementById("lastNameErrorMsg").innerText = "";
            return true;
      }
}

// LISTENING CHANGES ON INPUT =================== ADRESS

let address = document.getElementById("address");
address.addEventListener("change", function () {
      validAddress(this);
});

// Function that return true or false if the regexp for the address is respected
function validAddress(inputAddress) {
      const addressRegExp = new RegExp("^[0-9]{1,5} [A-Za-z -]+$");

      if (!addressRegExp.test(inputAddress.value)) {
            document.getElementById("addressErrorMsg").innerText = "Exemple : 436 avenue fleurie";
            return false;
      } else if (inputAddress.value.length < 7) {
            document.getElementById("addressErrorMsg").innerText = "Vérifiez votre adresse, elle semble incomplète.";
            return false;
      } else {
            document.getElementById("addressErrorMsg").innerText = "";
            return true;
      }
}

// LISTENING CHANGES ON INPUT =================== CITY

let city = document.getElementById("city");
city.addEventListener("change", function () {
      validCity(this);
});

// Function that return true or false if the regexp for the city is respected
function validCity(inputCity) {
      const cityRegExp = new RegExp("^[0-9]{5} ([A-Z][a-z]+ ?-?)+$");

      if (!cityRegExp.test(inputCity.value)) {
            document.getElementById("cityErrorMsg").innerText = "Exemple : 06100 Nice";
            return false;
      } else if (inputCity.value.length < 6) {
            document.getElementById("cityErrorMsg").innerText = "Vérifiez votre adresse, elle semble incomplète";
            return false;
      } else {
            document.getElementById("cityErrorMsg").innerText = "";
            return true;
      }
}

// LISTENING CHANGES ON INPUT =================== EMAIL

let email = document.getElementById("email");
email.addEventListener("change", function () {
      validEmail(this);
});

// Function that return true or false if the regexp for the email is respected
function validEmail(inputEmail) {
      let emailRegExp = new RegExp("^[A-Za-z-_]+@[A-Za-z]+.[A-Za-z]+$");

      if (!emailRegExp.test(inputEmail.value)) {
            document.getElementById("emailErrorMsg").innerText = "Exemple : contact@kanap.fr";
            return false;
      } else if (inputEmail.value.length < 6) {
            document.getElementById("emailErrorMsg").innerText = "Vérifiez votre email, elle semble incomplète";
            return false;
      } else {
            document.getElementById("emailErrorMsg").innerText = "";
            return true;
      }
}

// EVENT LISTENER =================== ORDER

const order = document.getElementById("order");
order.addEventListener("click", function (e) {
      e.preventDefault();
      let products = JSON.parse(localStorage.getItem("products"));
      // If there is no product, give an alert
      if (products === null || products.length < 1) {
            alert("Votre panier est vide, veuillez ajouter des articles pour les commander.");
      }
      // If all my inputs are true, create the object that I will send to the API with the details of the command and the contact infos
      else if (validFirstName(firstName) && validLastName(lastName) && validAddress(address) && validCity(city) && validEmail(email)) {
            const productsId = [];
            products.forEach((product) => {
                  productsId.push(product.id);
            });
            const order = {
                  contact: {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        address: address.value,
                        city: city.value,
                        email: email.value,
                  },
                  products: productsId,
            };
            orderProduct(order);
      }
});

// Function that send my command and contact infos
function orderProduct(order) {
      // Call the API with method POST
      fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            // Tell to the API that I will give it json object
            headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
            },
            // Send my json object
            body: JSON.stringify(order),
      })
            .then(function (res) {
                  if (res.ok) {
                        return res.json();
                  }
            })
            // Retrieve my order id thanks to the response
            .then(function (value) {
                  window.location = `./confirmation.html?orderId=${value.orderId}`;
                  localStorage.clear();
            })
            // If the API cannot be called
            .catch(function (err) {
                  console.log(err);

                  alert("Veuillez nous excuser, votre commande n'a pas pu être transmise.");
            });
}
