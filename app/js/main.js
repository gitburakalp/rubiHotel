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