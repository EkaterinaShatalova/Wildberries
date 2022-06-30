/*jshint esversion: 8 */
const swiper = () => {
  const mySwiper = new Swiper(".swiper-container", {
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
  });
};

export default swiper;
