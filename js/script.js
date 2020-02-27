window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'), 
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++ ) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    } 

    hideTabContent(1);

    console.log('test');
});



