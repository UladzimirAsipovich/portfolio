class NAVBAR {
  constructor() {
    this._mobile_screen = 768;
    this._navbar_is_open = false;

    this.NAVBAR = document.getElementById('navbar');
    this.NAVBAR__START = document.getElementById('navbar__start');
    this.NAVBAR__BURGER = document.getElementById('navbar__burger');
    this.NAVBAR__LINK_ITEMS =
      document.getElementsByClassName('navbar__link_item');
    this.NAVBAR__UP_BUTTON = document.getElementById('navbar__up_button');

    NAVBAR.Initialize(this);
  }

  /**
   * Переключает классы (открывает / закрывает) NAVBAR по клику на бургер.
   * @returns void
   */
  toggleBurger() {
    if (this.NAVBAR__BURGER.classList.contains('active')) {
      this.closeNavbar();
      return;
    }
    this.openNavbar();
  }

  /**
   * Закрывает NAVBAR по клику на бэкдроп-меню из мобильного вида.
   * @param {Event} e Событие бэкдроп-меню.
   * @returns void
   */
  closeNavbarFromBackdropMenu(e) {
    if (e.target === e.currentTarget) {
      this.closeNavbar();
      return;
    }
    return;
  }

  /**
   * Закрывает NAVBAR по клику на ссылку из меню мобильного вида.
   * @param {Event} e Событие клика на ссылку.
   * @returns void
   */
  closeNavbarByClickedLink(e) {
    this.closeNavbar();
    return;
  }

  /**
   * Закрывает NAVBAR.
   * Не используется в явном виде.
   * @returns void
   */
  closeNavbar() {
    if (!this._navbar_is_open) return;

    document.body.style.overflowY = 'scroll';
    this.NAVBAR.classList.remove('active');
    this.NAVBAR__START.classList.remove('active');
    this.NAVBAR__BURGER.classList.remove('active');
    this._navbar_is_open = false;
  }

  /**
   * Открывает NAVBAR.
   * Не используется в явном виде.
   * @returns void
   */
  openNavbar() {
    if (this._navbar_is_open) return;

    document.body.style.overflowY = 'hidden';
    this.NAVBAR.classList.add('active');
    this.NAVBAR__START.classList.add('active');
    this.NAVBAR__BURGER.classList.add('active');
    this._navbar_is_open = true;
  }

  /**
   * Срабатывает на изменение ширины пользовательского окна.
   * Если ширина окна больше мобильной версии то при необходимости
   * NAVBAR закрывается и возвращается к положению по-умолчанию.
   * @param {Event} e Событие на изменение ширины пользовательского окна.
   * @returns void
   */
  resizeController(e) {
    const { innerWidth } = e.currentTarget;
    if (innerWidth > this._mobile_screen && this._navbar_is_open) {
      this.closeNavbar();
      return;
    }
  }

  /**
   * Срабатывает на изменение высоты прокрутки пользовательского окна.
   * Если высота прокрутки больше высоты окна то показывается кнопка "В ВЕРХ"
   * иначе - скрывается.
   * @returns void
   */
  scrollController() {
    const scrolled = window.pageYOffset < document.documentElement.clientHeight;
    this.showUpButton(scrolled);
  }

  /**
   * Показывает или скрывает кнопку "В ВЕРХ".
   * Не используется в явном виде.
   * @returns void
   */
  showUpButton(isScrolled) {
    this.NAVBAR__UP_BUTTON.style.opacity = Number(!isScrolled).toString();
  }

  /**
   * "Поднимает" страницу вверх по нажатии на кнопку "В ВЕРХ".
   * @returns void
   */
  scrollUp() {
    window.scrollTo(0, 0);
  }

  static Initialize(that) {
    window.addEventListener('resize', that.resizeController.bind(that), false);

    window.addEventListener('scroll', that.scrollController.bind(that), false);

    const {
      NAVBAR__BURGER,
      NAVBAR__START,
      NAVBAR__LINK_ITEMS,
      NAVBAR__UP_BUTTON,
    } = that;

    if (NAVBAR__BURGER !== null) {
      NAVBAR__BURGER.addEventListener(
        'click',
        that.toggleBurger.bind(that),
        false
      );
    }

    if (NAVBAR__START !== null) {
      NAVBAR__START.addEventListener(
        'click',
        that.closeNavbarFromBackdropMenu.bind(that),
        false
      );
    }

    if (NAVBAR__LINK_ITEMS.length > 0) {
      Array.prototype.forEach.call(NAVBAR__LINK_ITEMS, (link_item) => {
        link_item.addEventListener(
          'click',
          that.closeNavbarByClickedLink.bind(that),
          false
        );
      });
    }

    if (NAVBAR__UP_BUTTON !== null) {
      NAVBAR__UP_BUTTON.addEventListener(
        'click',
        that.scrollUp.bind(that),
        false
      );
    }
  }
}

export default NAVBAR;
