let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

// Call the API for one object by id
fetch(`http://localhost:3000/api/products/${id}`)
      .then(function (res) {
            if (res.ok) {
                  // Call the API in JSON format
                  return res.json();
            }
      })
      .then(function (oneKanapData) {
            const itemImg = document.getElementsByClassName("item__img")[0];
            const img = document.createElement("img");
            itemImg.appendChild(img);
            img.src = oneKanapData.imageUrl;

            const title = document.getElementsByClassName("title");
            for (let i = 0; i < title.length; i++) {
                  title[i].innerText = oneKanapData.name;
            }

            const price = (document.getElementById("price").innerText = oneKanapData.price);

            const description = (document.getElementById("description").innerText = oneKanapData.description);

            const colors = document.getElementById("colors");
            for (let i = 0; i < oneKanapData.colors.length; i++) {
                  const option = document.createElement("option");
                  colors.appendChild(option);
                  option.value = oneKanapData.colors[i];
                  option.innerText = oneKanapData.colors[i];
            }
      });
