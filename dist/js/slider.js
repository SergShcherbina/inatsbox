import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'

const slider = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        // stretch: 0,
        // depth: 100,
        modifier: 10,
        // slideShadows: true
    },
    keyboard: {
        enabled: true,
    },
    // mousewheel: {
    //     thresholdDelta: 70
    // },
    // loop: true,
    slideToClickedSlide: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1560: {
            slidesPerView: 2
        }
    },
});