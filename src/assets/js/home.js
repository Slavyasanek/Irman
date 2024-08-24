import 'normalize.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import '@styles/index.scss';
import Swiper from 'swiper';
import { Pagination, Thumbs } from 'swiper/modules';

/**
 *
 *
 * @class tabsSwitcher
 */
class tabsSwitcher {
    /**
     * Creates an instance of tabsSwitcher.
     * @param {element} tabs
     * @param {string} tabListClass
     * @param {string} tabTogglerClass
     * @param {string} tabActiveClass
     * @memberof tabsSwitcher
     */

    constructor(tab, tabListClass, tabTogglerClass, signleTabClass, tabActiveClass) {
        this.tab = tab;
        this.tabList = tab.querySelector(tabListClass);
        this.tabToggler = tab.querySelector(tabTogglerClass);
        this.signleTabClass = signleTabClass;
        this.tabActiveClass = tabActiveClass;
        this.init()
    }

    setTogglerWidth = (activeItem) => {
        let reduceCount;

        if (window.matchMedia('(min-width: 960px)').matches) {
            reduceCount = 50
        } else {
           reduceCount = 5;
        }

        const newWidth = (activeItem.offsetWidth * 100) / window.innerWidth;
        const reductPercentage = (newWidth * reduceCount) / 100;
        
        this.tabToggler.style.width = `${(newWidth - reductPercentage).toFixed(1)}vw`;
    }

    setTogglerLeft = (activeItem) => {
        this.tabToggler.style.left = `${((activeItem.offsetLeft * 100) / window.innerWidth).toFixed(1)}vw`;
    }

    init = () => {
        if (this.tabList) {
            new Swiper(this.tab, {
                slidesPerView: 'auto',
                freeMode: true,
            })
        
            const activeSelection = this.tabList.querySelector(`.${this.tabActiveClass}`);

            this.setTogglerWidth(activeSelection);
            this.setTogglerLeft(activeSelection);

            this.tab.addEventListener("click", e => {

                if (e.target.closest(this.signleTabClass)) {
                    const target = e.target.closest(this.signleTabClass);
                    const activeSelection = this.tabList.querySelector(`.${this.tabActiveClass}`);

                    if (target === activeSelection) return;

                    activeSelection.classList.remove(this.tabActiveClass);
                    target.classList.add(this.tabActiveClass);
                    this.setTogglerWidth(target);
                    this.setTogglerLeft(target);
                }
            })
        }
    }
}

const tabs = Array.from(document.querySelectorAll('.tabs'));
if (tabs.length > 0) {
    tabs.forEach(tab => new tabsSwitcher(tab, '.tabs__list', '.tabs__toggler', '.tabs__item', 'active'));
}
// End TYPE TOGGLER

if (document.querySelector('.product-page')) {
    const thumbnails = new Swiper('#productThumbnails', {
        slidesPerView: 5,
        spaceBetween: 24,
        watchSlidesProgress: true,
    })

    new Swiper('#productMainSlider', {
        slidesPerView: 1,
        modules: [Pagination, Thumbs],
        spaceBetween: 24,
        pagination: {
            el: '.product-slider__pagination',
        },
        thumbs: {
            swiper: thumbnails
        }
    })
}


if (document.querySelector('.related')) {
    new Swiper('.related__swiper', {
        slidesPerView: 2, 
        spaceBetween: 16,
        modules: [Pagination],
        pagination: {
            el: '.related__pagination',
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
            },
            960: {
                slidesPerView: 4,
                spaceBetween: 24,
            }
        }
    })
}
/**
 *
 *
 * @class Cart
 */
class Cart {
    cart = document.querySelector('.backdrop--cart');
    headerCartOpenButton = document.querySelector('.header__cart-btn');
    closeCartButton = document.querySelector('.cart-heading__close-btn');

    constructor() {
        this.init();
    }

    openCart = () => {
        this.cart.classList.add('active');
    }

    closeCart = () => {
        this.cart.classList.remove('active');
    }

    init = () => {
        this.headerCartOpenButton.addEventListener("click", () => this.openCart());
        this.closeCartButton.addEventListener("click", () => this.closeCart())
        this.cart.addEventListener("click", e => {
            if (e.target === e.currentTarget) this.closeCart();
        })
    }
}

new Cart();


/**
 *
 *
 * @class CustomSelect
 */
class CustomSelect {
    /**
 * Creates an instance of CustomSelect.
 * @param {node} selectWrapper
 * @memberof CustomSelect
 */ 
    constructor(selectWrapper) {
        this.select = selectWrapper;

        this.chosenOption = `.custom-field__selected`;
        // this.selectedTitle = `.custom-select__chosen`;
        // this.selectBtn = `.custom-select__btn`;
        this.selectList = `.custom-field__dropdown`;
        this.activeClass = `active`;
        this.init();
    }

    closeOnBackdropClick = e => {
        if (e.target !== this.select && !e.target.closest(`.custom-field--type_select.${this.activeClass}`)) this.closeDropdown();
    }

    openDropdown = () => {
        this.select.classList.add(this.activeClass);
        window.addEventListener("click", this.closeOnBackdropClick);
    }

    closeDropdown = () => {
        this.select.classList.remove(this.activeClass);
        window.removeEventListener("click", this.closeOnBackdropClick);
    }

    toggleDropdown = () => {        
        if (this.select.classList.contains(this.activeClass)) {
            this.closeDropdown();
        } else {
            if (document.querySelector(`.custom-field--type_select.${this.activeClass}`)) document.querySelector(`.custom-field--type_select.${this.activeClass}`).classList.remove(this.activeClass)
            this.openDropdown();
        }
    }

    selectItem = (e) => {
        if (e.target.closest('li')) {
            const selected = this.select.querySelector(this.chosenOption);
            if (selected) {
                if (selected.nodeName === 'INPUT') {
                    selected.value = e.target.closest('li').textContent;
                    this.select.querySelector('input').value = e.target.closest('li').textContent;
                } else {
                    selected.textContent = e.target.closest('li').textContent;
                    selected.classList.add('chosen');
                }
            }
            this.closeDropdown();
        }
    }

    init = () => {
        this.select.querySelector(this.chosenOption).addEventListener("click", this.toggleDropdown);
        this.select.querySelector(this.selectList).addEventListener("click", this.selectItem);
    }
}


Array.from(document.querySelectorAll('.custom-field--type_select')).forEach(sel => new CustomSelect(sel));

if (document.querySelector('.faq')) {
    document.querySelector('.faq').addEventListener("click", e => {
        if (document.querySelector('.faq-item.active')) document.querySelector('.faq-item.active').classList.remove('active');
        if (e.target.closest('.faq-item')) {
            e.target.closest('.faq-item').classList.toggle('active')
        }
    })
}
