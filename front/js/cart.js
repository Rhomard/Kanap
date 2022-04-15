// Call the API
fetch("http://localhost:3000/api/products/")
      .then(function (res) {
            if (res.ok) {
                  // Call the API in JSON format
                  return res.json();
            }
      })
      // Get the Kanap data
      .then(function getKanapData(kanapData) {
            let products = JSON.parse(localStorage.getItem("products"));
            loopToSearchId(kanapData, products);
            loopForTotalQty(products);
            loopForTotalPrice(kanapData, products);
      })
      .catch(function (err) {
            console.log(err);
            const emptyCart = (document.querySelector("#card_setting").innerHTML = "Votre panier <br> est vide");
      });

function loopToSearchId(api, products) {
      if (products === null || products.length === 0) {
            const emptyCart = (document.querySelector("#card_setting").innerHTML = "Votre panier <br> est vide");
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

function loopForTotalQty(products) {
      document.getElementById("totalQuantity").innerText = "";
      let sumQty = 0;
      for (let product of products) {
            sumQty = sumQty + product.quantity;
      }
      if (sumQty === 1) {
            document.getElementById("totalQuantity").innerText = `Total de ${sumQty} article :`;
            document.querySelector("#card_setting").innerHTML = `Votre panier <br> de ${sumQty} article`;
      } else if (sumQty > 1) {
            document.getElementById("totalQuantity").innerText = `Total des ${sumQty} articles :`;
            document.querySelector("#card_setting").innerHTML = `Votre panier <br> de ${sumQty} articles`;
      } else {
            document.querySelector("#card_setting").innerHTML = "Votre panier <br> est vide";
            console.log("Coucou");
      }
}

// FUNCTION FOR NUMBERS ===================

function nombresAvecEspaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// TOTAL PRICE ===================

function loopForTotalPrice(api, products) {
      let sumPrice = 0;
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

// EVENT LISTENER =================== CHANGE PRODUCT QUANTITY

function changeQty(api, products) {
      const inputs = document.querySelectorAll(".itemQuantity");
      inputs.forEach((input) => {
            input.addEventListener("click", function () {
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
