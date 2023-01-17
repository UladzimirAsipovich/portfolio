class NATIVE_SLIDER {
  constructor(SLIDER_ID_SELECTOR) {
    let _slider = document.getElementById(SLIDER_ID_SELECTOR);

    if (_slider === null) {
      _slider = document.getElementById('native-slider'); // default
      if (_slider === null) {
        alert(`SLIDER IS NOT EXISTS ANYWHERE`);
        return;
      }
    }

    this._slide_index = 1;
    this.SLIDER = _slider;

    this.SLIDES = this.SLIDER.getElementsByClassName('native-slider__slide');
    this.TEXT_COUNTER = this.SLIDER.getElementsByClassName(
      'native-slider__text-counter'
    );
    this.PREV_BTN = this.SLIDER.getElementsByClassName('native-slider__prev');
    this.NEXT_BTN = this.SLIDER.getElementsByClassName('native-slider__next');
    this.DOTS_CONTAINER = this.SLIDER.getElementsByClassName(
      'native-slider__dots'
    );
    this.DOTS = this.SLIDER.getElementsByClassName('native-slider__dot');

    NATIVE_SLIDER.Initialize(this);
  }

  /**
   * Контролирует текущий слайд по нажатию на кнопки управления
   * "Далее" или "Назад".
   * Принимает в себя ТОЛЬКО числа "-1" или "1". Если "-1", то слайд
   * листается "назад", иначе - "далее".
   * @param { number } indicator Число "-1" или "1".
   */
  slideController(indicator) {
    this.showSlides((this._slide_index += indicator));
  }

  /**
   * Контролирует текущий слайд по нажатию на кнопки управления типа "Точки".
   * Принимает в себя ТОЛЬКО числа от "1" и до индекса конечного слайда.
   * @param { number } current Числовой индекс от "1" текущего слайда.
   */
  currentSlide(current) {
    this.showSlides((this._slide_index = current));
  }

  /**
   * Инициализирует (показывает) текущий слайд, скрывает неиспользуемые слайды,
   * переключает "Точки".
   * Не используется в явном виде.
   * @param {*} current Числовой индекс от "1" текущего слайда.
   */
  showSlides(current) {
    if (current > this.SLIDES.length) {
      this._slide_index = 1;
    }

    if (current < 1) {
      this._slide_index = this.SLIDES.length;
    }

    for (let i = 0; i < this.SLIDES.length; i++) {
      this.SLIDES[i].style.display = 'none';
    }

    if (this.TEXT_COUNTER.length) {
      this.TEXT_COUNTER[0].innerHTML = `${this._slide_index} из ${this.SLIDES.length}`;
    }

    for (let i = 0; i < this.DOTS.length; i++) {
      this.DOTS[i].className = this.DOTS[i].className.replace(' active', '');
    }

    this.SLIDES[this._slide_index - 1].style.display = 'block';
    this.DOTS[this._slide_index - 1].className += ' active';
  }

  static Initialize(that) {
    const { PREV_BTN, NEXT_BTN } = that;

    if (PREV_BTN.length && NEXT_BTN.length) {
      PREV_BTN[0].addEventListener(
        'click',
        that.slideController.bind(that, -1),
        false
      );
      NEXT_BTN[0].addEventListener(
        'click',
        that.slideController.bind(that, 1),
        false
      );
    }

    if (that.DOTS_CONTAINER.length) {
      if (that.SLIDES.length) {
        Array.prototype.forEach.call(that.SLIDES, (el, ind) => {
          const dot = document.createElement('span');
          dot.setAttribute('title', 'Слайд ' + (ind + 1));
          dot.classList.add('native-slider__dot');
          dot.addEventListener(
            'click',
            that.currentSlide.bind(that, ind + 1),
            false
          );
          that.DOTS_CONTAINER[0].appendChild(dot);
        });
      }
    }

    that.showSlides.bind(that, 1)();
  }
}

export default NATIVE_SLIDER;
