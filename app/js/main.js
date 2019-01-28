$('[data-trigger=header]').on('click', function (e) {
    e.preventDefault();
    var $this = $(this),
        cssClass = "is-shown";

        $('header').toggleClass(cssClass);
        $('html,body').toggleClass('overflow-hidden');

    if ($('header').hasClass(cssClass)) {
        $('body,html').animate({
            scrollTop: 0
        }, 1500);
    }
});

$('[data-dismiss="header"]').on('click',function(e){
    e.preventDefault();
    var $this = $(this),
        cssClass = "is-shown";
    
    $('header').removeClass('is-shown');
});

$('.icon-more').on('click', function () {
    var top = $(this).parent('.full-bg-image').siblings('.section-main').offset().top;
    $('body,html').animate({
        scrollTop: top
    }, 1500);
});

var sliders = [];

$('[data-type="sliders"]').each(function () {
    var $this = $(this),
        mediaQuery = $this.data('media'),
        ww = $(window).width();

    function setAllSlider() {
        var props = "containerModifierClass: 'slider',wrapperClass: 'slider__wrapper',slideClass: 'slider__slide',slideActiveClass: 'slider__slide--active',slideNextClass: 'slider__slide--next',slidePrevClass: 'slider__slide--prev',navigation: {nextEl: '.slider__controls--next',prevEl: '.slider__controls--prev'},";
        var sliderProps = 'var sliderProperties = {' + props + $this.data('slider-props') + '}';

        if (sliderProps != undefined) {
            eval(sliderProps);
            sliders.push(new Swiper($this, sliderProperties));
        }
    }

    $(document).ready(function () {
        setAllSlider();
    });

    $(window).on({
        resize: function () {
            let ww = $(window).width();

            if (sliders != undefined) {
                for (var index = 0; index < sliders.length; index++) {
                    if (sliders[index].destroyed != true) {
                        if (mediaQuery != undefined && ww > mediaQuery) {
                            sliders[index].$el.data('media') != undefined && ww > mediaQuery ? sliders[index].destroy(true, true) : "";
                        }

                        sliders[index].update();
                    } else {
                        setAllSlider();
                    }
                }
            }
        }
    });
});

$('main > section[data-animate=true]').each(function () {
    var $this = $(this),
        activeCssClass = "active";

    function activeSections() {
        var thisY = $this.offset().top,
            winY = $(window).scrollTop(),
            thisH = $this.innerHeight(),
            winBottom = winY + thisH,
            amount = 0.75;

        if ((winBottom > thisY ) && winY < thisY + thisH) {
            $this.addClass(activeCssClass);
        } else {
            $this.removeClass(activeCssClass);
        }
    }

    document.addEventListener('scroll',function () {
        activeSections();
    });
});