window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2020-03-09';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60)),
            days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {

            let t = getTimeRemaining(endtime);
            if (t.total > 0) {
                hours.textContent = t.hours >= 10 ? t.hours : '0' + t.hours;
                minutes.textContent = t.minutes >= 10 ? t.minutes : '0' + t.minutes;
                seconds.textContent = t.seconds >= 10 ? t.seconds : '0' + t.seconds;
            } else {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }

        }

    }

    setClock('timer', deadline);

    // Modal window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        container = document.getElementById('about');

    // more.addEventListener('click', () => {
    //     showModalWindow();
    // });

    close.addEventListener('click', () => closeModalWindow());

    container.addEventListener('click', (event) => {
        let target = event.target;
        console.log('Произошло событие' + event.type + " на элементе " + target);
        if (target.className == 'more' || target.className == 'description-btn') {
            showModalWindow();
        }
    });


    function showModalWindow() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    function closeModalWindow() {
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    // Обратная связь

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    // Переделываю это блок кода, используя промисы


    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');


    function sendForm(element) {
        element.addEventListener('submit', (event) => {
            event.preventDefault();
            element.appendChild(statusMessage);
            let formData = new FormData(element);


            // JSON converter
            // let obj = {};

            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });

            // let json = JSON.stringify(obj);


            function postData(data) {
                return new Promise((resolve, reject) => {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                        request.onreadystatechange = () => {
                            if (request.readyState < 4) {
                                resolve();
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 3) {
                                    resolve()
                                } else {
                                    reject();
                                }
                            }
                        }
                        request.send(data);
                    }

                )

            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => {
                    statusMessage.innerHTML = message.success;
                })
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(() => clearInput())
        });
    }

    sendForm(form);
    sendForm(contactForm);

    console.log(contactForm);

});