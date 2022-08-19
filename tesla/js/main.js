$(document).ready(function () {
    $('.burger').click(function (event) {
        $('.burger,.menu__list,.slick-dots').toggleClass('active'); $('.burger');
        $('body').toggleClass('lock');
    });
    $('.menu__item a').click(function (event) {
        $('.burger,.menu__list').removeClass('active');
        $('body').removeClass('lock');
    });

    $('.slider').slick({
        autoplay:true,
        autoplaySpeed:3000,
        arrows:false,
        dots:true,
        fade:true
    });

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
});