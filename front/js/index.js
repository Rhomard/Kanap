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
            loopForCards(kanapData);
            loopForTotalQty(products);
      })
      // If the API cannot be called
      .catch(function (err) {
            console.log(err);

            const titles = document.querySelector(".titles");
            titles.remove();

            const items = document.querySelector("#items");
            items.style.marginTop = "135px";

            const messageExcuses = document.createElement("p");
            messageExcuses.innerText = "Toutes nos excuses, la base de données des Kanaps n'est pas accessible :(";
            items.appendChild(messageExcuses);
            messageExcuses.style.textAlign = "center";
      });

// Function that create the Kanap cards
function createKanapCard(dataKanap) {
      const link = document.createElement("a");
      items.appendChild(link);
      link.setAttribute("href", `./product.html?id=${dataKanap._id}`);

      const article = document.createElement("article");
      link.appendChild(article);

      const img = document.createElement("img");
      article.appendChild(img);
      img.src = dataKanap.imageUrl;
      img.alt = dataKanap.altTxt;

      const title = document.createElement("h3");
      article.appendChild(title);
      title.innerText = dataKanap.name;

      const description = document.createElement("p");
      article.appendChild(description);
      description.innerText = dataKanap.description;
}

// Loop that create a card for each object of the data
function loopForCards(dataKanap) {
      for (let data of dataKanap) {
            createKanapCard(data);
      }
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
