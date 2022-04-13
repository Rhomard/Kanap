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
            createProductCard(oneKanapData);
            loopForTitles(oneKanapData);
            loopForOptions(oneKanapData);
      })
      .catch(function (err) {
            console.log(err);
      });

function createProductCard(oneKanapData) {
      const itemImg = document.getElementsByClassName("item__img")[0];
      const img = document.createElement("img");
      itemImg.appendChild(img);
      img.src = oneKanapData.imageUrl;
      img.alt = oneKanapData.altTxt;

      const price = (document.getElementById("price").innerText = oneKanapData.price);

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

function addDataToCart() {
      let color = document.querySelector("#colors").value;
      let qty = document.querySelector("#quantity").valueAsNumber; //   let qtyNumber = parseInt(qty, 10);
      let addProduct = { color: color, id: id, quantity: qty };

      let products = JSON.parse(localStorage.getItem("products"));

      if (color == "" || qty == "") {
            alert("Vous devez obligatoirement choisir une couleur et indiquer une quantité.");
      } else if (products === null) {
            products = [];
            products.push(addProduct);
            let productsJson = JSON.stringify(products);
            localStorage.setItem("products", productsJson);
            console.log("Je crée le tableau");
      } else {
            let itemAlreadyInCart = false;
            for (product of products) {
                  if (addProduct.id === product.id && addProduct.color === product.color) {
                        itemAlreadyInCart = true;
                        product.quantity = product.quantity + addProduct.quantity;
                        console.log("J'ajoute la quantité");
                  }
            }
            if (itemAlreadyInCart == false) {
                  products.push(addProduct);
                  console.log("Je crée un objet en plus");
            }
            let productsJson = JSON.stringify(products);
            localStorage.setItem("products", productsJson);
      }
}

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function () {
      addDataToCart();
});
