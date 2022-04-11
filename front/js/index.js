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
            loopForCards(kanapData);
      })
      .catch(function (err) {
            console.log(err);
      });

//Function that create the Kanap cards
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
