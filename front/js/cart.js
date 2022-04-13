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

            if (products === null) {
                  const emptyCart = (document.querySelector("#card_setting").innerHTML = "Votre panier <br> est vide");
                  console.log("Panier vide");
            } else {
                  //   loopToSearchId(products, kanapData);
            }
      })
      .catch(function (err) {
            console.log(err);
      });

function loopToSearchId(products, kanapData) {
      for (let product of products) {
            if (product.id === kanapData[0]._id) {
                  createProductCard(products, kanapData);
            } else {
                  console.log(kanapData._id);
                  console.log("Aucun id trouvé");
            }
      }
}

function createProductCard(localStorage, api) {
      const article = document.createElement("article");
      article.classList.add("cart__item");
      cart__items.appendChild(article);

      const divImg = document.createElement("div");
      divImg.classList.add("cart__item__img");
      article.appendChild(divImg);

      const img = document.createElement("img");
      divImg.appendChild(img);
      img.src = api[0].imageUrl;

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
      price.innerText = `${api.price} €`;

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

// EVENT LISTENER =================== DELETE THIS PRODUCT

// const deleteItem = document.getElementsByClassName("deleteItem");
// console.log(deleteItem);
// deleteItem.addEventListener("click", function () {
//       if ((deleteItem[i] = products[i])) deleteProduct();
// });

// function deleteProduct() {
//       let products = JSON.parse(localStorage.getItem("products"));
//       localStorage.clear(products[i]);
// }
