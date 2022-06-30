/*jshint esversion: 8 */
const goods = () => {
  const more = document.querySelector(".more");
  const navigationLink = document.querySelectorAll(".navigation-link");
  const longGoodsList = document.querySelector(".long-goods-list");

  const delay = (ms) => {
    return new Promise((r) => setTimeout(() => r(), ms));
  };

  const getGoods = async function () {
    // await delay(5000);
    const result = await fetch("./db/db.json");
    if (!result.ok) {
      throw "Ошибка" + result.status;
    }
    return await result.json();
  };

  const createCard = (obj) => {
    const card = document.createElement("div");
    card.className = "col-lg-3 col-sm-6";
    card.innerHTML = `<div class="goods-card">
              ${obj.label ? `<span class="label">${obj.label}</span>` : ""}
              <img
                src="/db/${obj.img}"
                alt="${obj.name}"
                class="goods-image"
              />
              <h3 class="goods-title">Embroidered Hoodie</h3>
              <p class="goods-description">${obj.description}</p>
              <button class="button goods-card-btn add-to-cart" data-id="007">
                <span class="button-price">$89</span>
              </button>
            </div>`;
    return card;
  };

  function renderCards(data) {
    longGoodsList.textContent = "";
    document.body.classList.add("show-goods");
    const cards = data.map(createCard);
    cards.forEach((elem) => {
      longGoodsList.append(elem);
    });
  }
  more.addEventListener("click", function (e) {
    e.preventDefault();
    const id = more.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    getGoods().then(renderCards);
  });

  const filterCards = (field, value) => {
    getGoods()
      .then((data) => {
        const filteredGoods = data.filter((good) => {
          return good[field] === value;
        });
        return filteredGoods;
      })
      .then(renderCards);
  };

  navigationLink.forEach((link) => [
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const field = link.dataset.field;
      const value = link.textContent;
      if (value === "All") {
        getGoods().then(renderCards);
      } else {
        filterCards(field, value);
      }
    }),
  ]);

  const viewAll = document.querySelectorAll(".viewall");
  viewAll.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const id = item.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      if (i === 0) {
        filterCards("category", "Accessories");
      } else {
        filterCards("category", "Shoes");
      }
    });
  });
};

export default goods;
