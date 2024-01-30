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
        deadline.setDate(deadline.getDate() + 1);
        deadline.setHours(deadline.getHours() - 23);
        deadline.setMinutes(deadline.getMinutes() - 59);

    const date = localStorage.getItem('timer')

    if( date == null || date === "null" ) {
        timer('.timer', deadline)
    } else {
        timer('.timer', date)
    }
});