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


//слайдер
/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider__dots-item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


//Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function (e) {
        e.preventDefault();

        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        // const topOffset = document.querySelector('.scrollto').offsetHeight;
        let topOffset = 0; // если не нужен отступ сверху
        const elementPosition = scrollTarget && scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition, behavior: 'smooth'
        });
    });
});


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
console.log(trigger)
trigger.forEach(btn => {
    btn.addEventListener('click', ()=> {
        modal.showModal()
    })
})


modal.addEventListener('click', ()=> {
    modal.close()
})