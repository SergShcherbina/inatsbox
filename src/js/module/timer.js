export function timer(id, deadline) {

    function getZiro(num) {                                             //ф-я по добавлению нуля перед цифрой
        if (num >= 0 && num < 10) {                                                //если число из аргумента > 0 и < 10
            return `0${num}`;                                                      //возвращаем 0 + это число
        } else {
            return num;
        }
    }

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
        updateClock();                  //вызываем один раз без счетчика чтобы значения отображались сразу, а не через сек

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
