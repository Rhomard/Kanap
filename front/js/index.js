// Fonction pour créer mes cartes
// const kanapData = () => {
//       fetch("http://localhost:3000/api/products")
//             .then(function (res) {
//                   if (res.ok) {
//                         return res.json();
//                   }
//             })
//             .then(function (data) {
//                   // Boucle de création de Kanap (for each)
//                   console.log(data.name);
//                   document.getElementById("items").innerText = data.name;
//             })
//             .catch(function (err) {
//                   console.log("Error with Kanap API.");
//             });
// };
// kanapData();

const getKanapData = () => {
      fetch("http://localhost:3000/api/products")
            .then(function (res) {
                  if (res.ok) {
                        return res.json();
                  }
            })
            .then(function (kanapData) {
                  console.log(kanapData);

                  const createKanapCard = () => {
                        const items = document.getElementById("items");

                        const link = document.createElement("a");
                        items.appendChild(link);

                        const article = document.createElement("article");
                        link.appendChild(article);

                        const img = document.createElement("img");
                        article.appendChild(img);
                        img.src = kanapData[i].imageUrl;
                        img.alt = kanapData[i].altTxt;

                        const title = document.createElement("h3");
                        article.appendChild(title);
                        title.innerText = kanapData[i].name;

                        const description = document.createElement("p");
                        article.appendChild(description);
                        description.innerText = kanapData[i].description;
                  };
                  for (var i = 0; i < kanapData.length; i++) {
                        createKanapCard();
                  }
            })
            .catch(function (err) {
                  console.log(err);
            });
};

getKanapData();

// const run = () => {
//       for (let i = 0; i < kanapData.length; i++) {
//             KanapData();
//       }
//       run();

// // Je crée ma carte
// const createKanapCard = () => {
//       const items = document.getElementById("items");

//       const link = document.createElement("a");
//       items.appendChild(link);

//       const article = document.createElement("article");
//       link.appendChild(article);

//       const img = document.createElement("img");
//       article.appendChild(img);
//       img.src = "http://localhost:3000/images/kanap01.jpeg";
//       img.alt = "Photo d'un canapé bleu, deux places";

//       const title = document.createElement("h3");
//       article.appendChild(title);
//       title.innerText = getDataKanap[i].name;

//       const description = document.createElement("p");
//       article.appendChild(description);
//       description.innerHTML = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nullanisl arcu.";
// };
