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

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function () {
      addDataToCart();
});

function addDataToCart() {
      const color = document.querySelector("#colors").value;
      const qty = document.querySelector("#quantity").valueAsNumber; //   const qtyNumber = parseInt(qty, 10);
      const addProduct = { id: id, quantity: qty, color: color };
      console.log(addProduct);

      let productsArray = JSON.parse(localStorage.getItem("products"));

      // IF productsArray already created add the addProduct ELSE create productsArray and add the addProduct
      if (productsArray) {
            productsArray.push(addProduct);
            let productsArrayJson = JSON.stringify(productsArray);
            localStorage.setItem("products", productsArrayJson);
            console.log(productsArray);
      } else {
            productsArray = [];
            productsArray.push(addProduct);
            let productsArrayJson = JSON.stringify(productsArray);
            localStorage.setItem("products", productsArrayJson);
            console.log(productsArray);
      }
}
