// window.addEventListener('DOMContentLoaded', () => {

const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');

function toggleMenu(e) {
    if (burger.contains(e.target) && !menu.classList.contains('menu_active')) {
        burger.classList.add('burger_active');
        menu.classList.add('menu_active');
        document.body.style.overflow = 'hidden'
        return
    }
    if (e.target !== menu && menu.classList.contains('menu_active')) {
        burger.classList.remove('burger_active');
        menu.classList.remove('menu_active');
        document.body.style.overflow = 'visible'
    }
}

document.addEventListener('click', (e) => toggleMenu(e))
document.removeEventListener('click', toggleMenu)


// //слайдер
// /* Индекс слайда по умолчанию */
// var slideIndex = 1;
// showSlides(slideIndex);
//
// /* Функция увеличивает индекс на 1, показывает следующй слайд*/
// function plusSlide() {
//     showSlides(slideIndex += 1);
// }
//
// /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
// function minusSlide() {
//     showSlides(slideIndex -= 1);
// }
//
// /* Устанавливает текущий слайд */
// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }
//
// /* Основная функция слайдера */
// function showSlides(n) {
//     var i;
//     var slides = document.getElementsByClassName("item");
//     var dots = document.getElementsByClassName("slider__dots-item");
//     if (n > slides.length) {
//         slideIndex = 1
//     }
//     if (n < 1) {
//         slideIndex = slides.length
//     }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex - 1].style.display = "block";
//     dots[slideIndex - 1].className += " active";
// }

//hide menu
let lastScroll = 0;
const defaultOffset = 100;
const header = document.querySelector('.header')

const scrollPosition = () => window.scrollY || document.documentElement
const containHide = () => header.classList.contains('hide')

window.addEventListener('scroll', () => {
    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        header.classList.add('hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
        header.classList.remove('hide')
    }

    lastScroll = scrollPosition();
})


//Timer
function getZiro(num) {                                             //ф-я по добавлению нуля перед цифрой
    if (num >= 0 && num < 10) {                                                //если число из аргумента > 0 и < 10
        return `0${num}`;                                                      //возвращаем 0 + это число
    } else {
        return num;
    }
}


//Timer
function timer(id, deadline) {

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date());       //кол-во времени до которого должно дойти - настоящее время

        if (t <= 0) {                                                          //если время чтетчика <= 0, то все значения 0
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),            //кол-во дней
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),     //кол-во часов
                minutes = Math.floor((t / 1000 / 60) % 60),          //кол-во минут
                seconds = Math.floor((t / 1000) % 60);               //кол-во секунд
        }

        return {
            'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds,
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),                       //получаем все значения
            days = timer.querySelector('#days'), hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'), seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);   //вызываем updateClock каждую секунду
        updateClock();                  //вызываем один раз без счетчикаб чтобы значения отображались сразу а не через сек

        function updateClock() {
            const t = getTimeRemaining(endtime);                        //записываем результат функции в перемкнную t

            days.innerHTML = getZiro(t.days);                                //записываем в верстку значения полученные из getTimeRemaining(endtime) и записанные в переменную t
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);
            if (t.total <= 0) {                                              //если счетчик прошел свое время,
                clearInterval(timeInterval);                                 //сбрасываем вызов функции updateClock
            }
        }
    }

    setClock(id, deadline);
}

const deadline = new Date();
deadline.setDate(deadline.getDate() + 3);
timer('.timer', deadline);


//modal
const modal = document.querySelector('.modal')
const trigger = document.querySelectorAll('[data-trigger]')
trigger.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.showModal()
        modal.classList.add('showModal')
        document.body.classList.add('modal-active')
    })
})

modal.addEventListener('click', () => {
    modal.close()
    modal.classList.remove('showModal')
    document.body.classList.remove('modal-active')
})

//modal 2
// const buttonModal = document.querySelector('.buttonModal')
// const modalContainer = document.getElementById('modal-container')
//
// buttonModal.addEventListener('click', ()=> {
//     modalContainer.classList.remove('out')
//     modalContainer.classList.add('one')
//     document.body.classList.add('modal-active')
// });
//
// modalContainer.addEventListener('click', () => {
//     // modalContainer.classList.remove('one')
//     modalContainer.classList.add('out');
//     document.body.classList.remove('modal-active')
// })


// slider
let slider = document.querySelector('.slider'),
    // sliderList = slider.querySelector('.slider-list'),
    sliderTrack = slider.querySelector('.slider-track'),
    slides = slider.querySelectorAll('.slide'),
    arrows = slider.querySelector('.slider-arrows'),
    prev = arrows.children[0],
    next = arrows.children[1],
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --slides.length * slideWidth,
    posThreshold = slides[0].offsetWidth * 0.35,
    trfRegExp = /([-0-9.]+(?=px))/,
    getEvent = () => {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function () {
        if (transition) {
            sliderTrack.style.transition = 'transform .5s';
        }
        sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

        prev.classList.toggle('disabled', slideIndex === 0);
        next.classList.toggle('disabled', slideIndex === --slides.length);
    },

    activeDots = (count = 0) => {
    const dots = slider.querySelectorAll('.dot')
        dots.forEach((el)=> {
            el.classList.remove('active');
        });

        if (dots) {
            dots[count].classList.add('active')
        }

    },

    addDots = () => {
        slides.forEach((el, i) => {
            const dot = document.createElement('span')
            dot.setAttribute('id', i)
            dot.classList.add('dot')
            arrows.append(dot)
        })
        activeDots()
    },

    swipeStart = () => {
        let evt = getEvent();

        if (allowSwipe) {

            transition = true;

            nextTrf = (slideIndex + 1) * -slideWidth;
            prevTrf = (slideIndex - 1) * -slideWidth;

            posInit = posX1 = evt.clientX;
            posY1 = evt.clientY;

            sliderTrack.style.transition = '';

            document.addEventListener('touchmove', swipeAction);
            document.addEventListener('mousemove', swipeAction);
            document.addEventListener('touchend', swipeEnd);
            document.addEventListener('mouseup', swipeEnd);

            // sliderList.classList.remove('grab');
            // sliderList.classList.add('grabbing');
        }
    },
    swipeAction = () => {
        let evt = getEvent(),
            style = sliderTrack.style.transform,
            transform = +style.match(trfRegExp)[0];

        posX2 = posX1 - evt.clientX;
        posX1 = evt.clientX;

        posY2 = posY1 - evt.clientY;
        posY1 = evt.clientY;

        // определение действия свайп или скролл
        if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2);
            if (posY > 7 || posX2 === 0) {
                isScroll = true;
                allowSwipe = false;
            } else if (posY < 7) {
                isSwipe = true;
            }
        }

        if (isSwipe) {
            // запрет ухода влево на первом слайде
            if (slideIndex === 0) {
                if (posInit < posX1) {
                    setTransform(transform, 0);
                    return;
                } else {
                    allowSwipe = true;
                }
            }

            // запрет ухода вправо на последнем слайде
            if (slideIndex === --slides.length) {
                if (posInit > posX1) {
                    setTransform(transform, lastTrf);
                    return;
                } else {
                    allowSwipe = true;
                }
            }

            // запрет протаскивания дальше одного слайда
            if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                reachEdge();
                return;
            }

            // двигаем слайд
            sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
        }

    },
    swipeEnd = function () {
        posFinal = posInit - posX1;

        isScroll = false;
        isSwipe = false;

        document.removeEventListener('touchmove', swipeAction);
        document.removeEventListener('mousemove', swipeAction);
        document.removeEventListener('touchend', swipeEnd);
        document.removeEventListener('mouseup', swipeEnd);

        // sliderList.classList.add('grab');
        // sliderList.classList.remove('grabbing');

        if (allowSwipe) {
            if (Math.abs(posFinal) > posThreshold) {
                if (posInit < posX1) {
                    slideIndex--;
                } else if (posInit > posX1) {
                    slideIndex++;
                }
            }

            if (posInit !== posX1) {
                allowSwipe = false;
                slide();
            } else {
                allowSwipe = true;
            }

        } else {
            allowSwipe = true;
        }

    },
    setTransform = function (transform, comapreTransform) {
        if (transform >= comapreTransform) {
            if (transform > comapreTransform) {
                sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
            }
        }
        allowSwipe = false;
    },
    reachEdge = function () {
        transition = false;
        swipeEnd();
        allowSwipe = true;
    };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
// sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function () {
    let target = event.target;

    if (target.classList.contains('next')) {
        slideIndex++;
        activeDots(slideIndex)
    } else if (target.classList.contains('prev')) {
        slideIndex--;
        activeDots(slideIndex)
    } else if (target.classList.contains('dot')) {
        slideIndex = +target.id
        activeDots(slideIndex)
    } else {
        return
    }
    slide();
});
addDots()
// swipeStart()


//scroll animation
const options = {
    threshold: [.4],
};
const callback =  (entries, observer) => {
    entries.forEach((change) => {
        if(change.isIntersecting === true){
            change.target.classList.add('element-show')
        // } else if (change.isIntersecting === false) {
            // change.target.classList.remove('element-show')
        }
    })
};
const observer = new IntersectionObserver(callback, options);
const items = document.querySelectorAll(".element-animation")

for (let i of items) {
    observer.observe(i)
}