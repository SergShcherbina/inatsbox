import {menuToggle} from "./module/menuToggle.js";
import {slider} from "./module/slider.js";
import {hideHeader} from "./module/hideHeader.js";
import {scrollAnimation} from "./module/scrollAnimation.js";
import {timer} from "./module/timer.js";
import {modal} from "./module/modal.js"

document.addEventListener("DOMContentLoaded", () => {

    menuToggle()
    hideHeader()
    modal();
    scrollAnimation()
    slider();

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    timer('.timer', deadline);
});