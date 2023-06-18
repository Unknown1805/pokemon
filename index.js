let search_inp = document.querySelector(".search_inp");
let arrow = document.createElement("div");

arrow.innerHTML = "▼";
arrow.style.position = "absolute";
arrow.style.right = "15px";
arrow.style.top = "15px";
arrow.style.cursor = "pointer";
search_inp.parentNode.appendChild(arrow);
arrow.style.color = "white";
arrow.style.top = "50%";
arrow.style.transform = "translateY(-50%)";

let poke_list = document.createElement("ul");
poke_list.style.listStyle = "none";
poke_list.style.padding = "0";
poke_list.style.margin = "0";
poke_list.style.position = "absolute";
poke_list.style.top = "45px";
poke_list.style.width = "100%";
poke_list.style.backgroundColor = "#172c28";
poke_list.style.display = "none";
poke_list.style.zIndex = "9999";
poke_list.style.maxHeight = "400px";
poke_list.style.overflowY = "scroll";
poke_list.style.top = "100%";
poke_list.style.top = "100%";
search_inp.addEventListener("focus", function () {
  arrow.style.display = "block";
});
search_inp.addEventListener("blur", function () {
  arrow.style.display = "none";
});
poke_list.addEventListener("mouseover", function () {
  poke_list.style.display = "block";
});
poke_list.addEventListener("mouseout", function () {
  poke_list.style.display = "none";
});
arrow.removeEventListener("mouseout", function () {});

fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let results = data.results;
    for (let i = 0; i < results.length; i++) {
      let poke_name = results[i].name;
      let first_letter = poke_name.charAt(0).toUpperCase();
      let last = poke_name.slice(1);
      poke_name = first_letter + last;
      let poke_item = document.createElement("li");
      poke_item.innerHTML = poke_name;
      poke_item.style.padding = "10px";
      poke_item.style.color = "white";
      poke_item.style.fontFamily = '"Open Sans", sans-serif';
      poke_item.addEventListener("click", function () {
        search_inp.value = poke_name.toLowerCase();
        poke_form.dispatchEvent(new Event("submit"));
        poke_list.style.display = "none";
      });
      search_inp.addEventListener("input", function () {
        let inp_value = search_inp.value.toLowerCase();
        let poke_items = poke_list.querySelectorAll("li");
        for (let i = 0; i < poke_items.length; i++) {
          let poke_item = poke_items[i];
          let poke_name = poke_item.innerHTML.toLowerCase();
          if (poke_name.includes(inp_value)) {
            poke_item.style.display = "block";
          } else {
            poke_item.style.display = "none";
          }
        }
      });
      poke_list.appendChild(poke_item);
      poke_item.addEventListener("mouseover", function () {
        poke_item.style.backgroundColor = "#2a3c35";
      });
      poke_item.addEventListener("mouseout", function () {
        poke_item.style.backgroundColor = "transparent";
      });
    }
  })
  .catch(function (e) {
    console.log(e);
  });

search_inp.parentNode.appendChild(poke_list);

arrow.addEventListener("mouseover", function () {
  poke_list.style.display = "block";
});

let poke_form = document.querySelector(".search_form");
poke_form.addEventListener("submit", function (event) {
  event.preventDefault();
  let inp = document.querySelector(".search_inp").value;
  fetch(`https://pokeapi.co/api/v2/pokemon/${inp}`)
    .then(function (poke) {
      return poke.json();
    })
    .then(function (data) {
      let name = data.name;
      let first = name.charAt(0).toUpperCase();
      let after = name.slice(1);
      name = first + after;
      let name_title = document.querySelector(".title_name");
      name_title.innerHTML = name;
      let weight = data.weight;
      let weight_title = document.querySelector(".title_weight");
      let height_title = document.querySelector(".title_height");
      let type_title = document.querySelector(".title_type");
      let height = data.height;
      height = Number(height) / 10;
      weight = Number(weight) / 10;
      weight_title.innerHTML = weight + "kg";
      height_title.innerHTML = height + "m";
      let picture_dis = document.querySelector(".img_poke");
      let picture = data.sprites.front_default;
      picture_dis.style.backgroundImage = `url(${picture})`;
      picture_dis.style.backgroundSize = "cover";
      picture_dis.style.backgroundRepeat = "no-repeat";
      let types = data.types;
      let type_dis = "";
      for (let i = 0; i < types.length; i++) {
        if (i == types.length - 1) {
          type_dis += types[i].type.name;
        } else type_dis += types[i].type.name + "<br>";
      }
      type_title.innerHTML = type_dis;
    })
    .catch(function (e) {
      console.log(e);
    });
});
