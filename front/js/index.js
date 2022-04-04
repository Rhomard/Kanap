fetch("http://localhost:3000/api/products")
      .then(function (res) {
            if (res.ok) {
                  return res.json();
            }
      })
      .then(function (kanapData) {
            for (let data of kanapData) {
                  const link = document.createElement("a");
                  items.appendChild(link);

                  const article = document.createElement("article");
                  link.appendChild(article);

                  const img = document.createElement("img");
                  article.appendChild(img);
                  img.src = data.imageUrl;
                  img.alt = data.altTxt;

                  const title = document.createElement("h3");
                  article.appendChild(title);
                  title.innerText = data.name;

                  const description = document.createElement("p");
                  article.appendChild(description);
                  description.innerText = data.description;
            }
      })
      .catch(function (err) {
            console.log(err);
      });
