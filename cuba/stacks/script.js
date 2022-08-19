
$(function () {

/* <!-- Burger --> */

$(document).ready(function () {
    $('.burger').click(function (event) {
        $('.burger,.menu').toggleClass('active'); $('.burger');
        $('body').toggleClass('lock');
    });
    $('.menu__item a').click(function (event) {
        $('.burger,.menu').removeClass('active');
        $('body').removeClass('lock');
    });
});

 //====================================================================================================================================================================================================================================================================


//Back To Top Btn
$(function () {
    'use strict';
    function trackScroll() {
        var scrolled = window.pageYOffset;
        var coords = document.documentElement.clientHeight;

        if (scrolled > coords) {
            goTopBtn.classList.add('back_to_top-show');
        }
        if (scrolled < coords) {
            goTopBtn.classList.remove('back_to_top-show');
        }
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -70);
            setTimeout(backToTop, 0);
        }
    }

    var goTopBtn = document.querySelector('.back_to_top');

    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
});



 //====================================================================================================================================================================================================================================================================


    // - All
    //Scroll #
    $('.go-scroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 71)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });



    //====================================================================================================================================================================================================================================================================


    //Parallax bg

    $(window).scroll(function () {
        $('.header').bgscroll({
            direction: 'top', // направление bottom или top
            bgpositionx: 0, // x позиция фонового изображения, от 0 до 100, размерность в %, 50 - означает по центру
            debug: false, // Режим отладки
            min: 0, // минимальное положение (в %) на которое может смещаться фон
            max: 100 // максимальное положение (в %) на которое может смещаться фон
        });
    })


});

