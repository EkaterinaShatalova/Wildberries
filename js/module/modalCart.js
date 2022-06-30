/*jshint esversion: 8 */

const modalCart = () => {
  const buttonCart = document.querySelector(".button-cart");
  const modalCart = document.querySelector("#modal-cart");
  const modalClose = document.querySelector(".modal-close");
  const scrollLinks = document.querySelectorAll("a.scroll-link");

  for (let i = 0; i < scrollLinks.length; i++) {
    scrollLinks[i].addEventListener("click", (e) => {
      e.preventDefault();
      const id = scrollLinks[i].getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  const openModal = () => {
    modalCart.classList.add("show");
  };
  const closeModal = () => {
    modalCart.classList.remove("show");
  };

  buttonCart.addEventListener("click", openModal);

  modalCart.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay") || e.target.classList.contains("modal-close")) {
      closeModal();
    }
  });
};

export default modalCart;
