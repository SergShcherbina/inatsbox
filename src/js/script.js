import {menuToggle} from "./module/menuToggle.js";
import {hideHeader} from "./module/hideHeader.js";
import {scrollAnimation} from "./module/scrollAnimation.js";
import {timer} from "./module/timer.js";
import {modal} from "./module/modal.js"

document.addEventListener("DOMContentLoaded", () => {
    menuToggle()
    hideHeader()
    modal();
    scrollAnimation()

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    deadline.setHours(deadline.getHours() - 5);
    deadline.setMinutes(deadline.getMinutes() - 23);
    timer('.timer', deadline);
});