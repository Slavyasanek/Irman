import 'normalize.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import '@styles/index.scss';
import Swiper from 'swiper';
import { Pagination, Thumbs } from 'swiper/modules';
import gsap from 'gsap';

const disableScroll = () => document.body.classList.add('lock');

const enableScroll = () => document.body.classList.remove('lock');

/**
 *
 *
 * @class MobileMenu
 */
class MobileMenu {
/**
 * Creates an instance of MobileMenu.
 * @param {string} mobMenuClass
 * @param {string} activeClass
 * @param {string} openButtonClass
 * @param {string} closeButtonClass
 * @memberof MobileMenu
 */
constructor(mobMenuClass, activeClass, openButtonClass, closeButtonClass) {
        this.mobMenuClass = mobMenuClass;
        this.mobMenu = document.querySelector(mobMenuClass);
        this.activeClass = activeClass;
        this.openButtonClass = openButtonClass;
        this.openButton = document.querySelector(openButtonClass);
        this.closeButton = document.querySelector(closeButtonClass);

        this.init();
    }
    

    closeOnBackdropClick = e => {
        if (e.target !== this.mobMenu && !e.target.closest(`${this.mobMenuClass}.${this.activeClass}`) && !e.target.closest(this.openButtonClass)) this.closeMenu();
    }

    openMenu = () => {
        this.mobMenu.classList.add(this.activeClass);
        disableScroll();
        document.addEventListener("click", this.closeOnBackdropClick);

        // odd code
        document.querySelector('.header').classList.add('menu-open');
    }

    closeMenu = () => {
        this.mobMenu.classList.remove(this.activeClass);
        enableScroll();
        document.removeEventListener("click", this.closeOnBackdropClick);

        // odd code
        document.querySelector('.header').classList.remove('menu-open');
    }

    init = () => {
        this.openButton.addEventListener("click", this.openMenu);
        this.closeButton.addEventListener("click", this.closeMenu);   
    }
}

new MobileMenu('.mob-menu', 'open', '.header__hamburger', '.mob-menu__close-btn')

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

class Modal {
    /**
     * Creates an instance of Modal.
     * @param {string} modalClass
     * @param {string} modalOpenButtonClass
     * @param {string} modalCloseBtnClass
     * @param {string} [activeClass='active']
     * @memberof Modal
     */

    constructor(modalClass, modalOpenButtonClass, modalCloseBtnClass, activeClass = 'active') {
        this.modalClass = modalClass;
        this.modal = document.querySelector(modalClass);

        this.modalOpenButtonClass = modalOpenButtonClass;
        this.modalOpenButton = document.querySelector(modalOpenButtonClass);

        this.modalCloseBtnClass = modalCloseBtnClass;
        this.modalCloseBtn = document.querySelector(modalCloseBtnClass);
        this.activeClass = activeClass;

        this.init();
    }

    openModal = () => {
        this.modal.classList.add(this.activeClass);
        disableScroll();
    }

    closeModal = () => {
        this.modal.classList.remove(this.activeClass);
        enableScroll();
    }

    init = () => {
        this.modalOpenButton.addEventListener("click", this.openModal);
        this.modalCloseBtn.addEventListener("click", this.closeModal);
        this.modal.addEventListener("click", e => {
            if (e.target === e.currentTarget) this.closeModal();
        })
    }
}

new Modal('.backdrop--cart', '.header__cart-btn', '.cart-heading__close-btn')
new Modal('.backdrop--modal', '.header__order-btn', '.modal__close-btn')

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

if (document.querySelector('.hero')) {
    const heroRefs = {
        contentBlock: '.hero__content-block',
        img: '.hero__img',
        grid: '.hero__grid',
        title: '.hero__title p',
        subtitle: '.hero__subtitle p',
        button: '.hero__link',
    }
    
    let mm = gsap.matchMedia();

    mm.add('(min-width: 960px)', () => {
        gsap.set([heroRefs.title, heroRefs.subtitle], {
            yPercent: -110,
        })
    
        gsap.set(heroRefs.button, {
            autoAlpha: 0,
        })
    
        gsap.set(heroRefs.grid, {
            xPercent: -52,
        })
    
        // --- LEFT SIDE
        gsap.set(`${heroRefs.img}:nth-child(2)`, {
            xPercent: -154,
        })
        gsap.set(`${heroRefs.img}:nth-child(4)`, {
            xPercent: -154,
        })
        gsap.set(`${heroRefs.img}:nth-child(7)`, {
            xPercent: -54
        })
    
        // -- RIGHT SIDE
        gsap.set(`${heroRefs.img}:nth-child(6)`, {
            xPercent: 146
        })
    
        gsap.set(`${heroRefs.img}:last-child`, {
            xPercent: 100
        })

        // ANIMATION
    
        const heroTl = gsap.timeline({
            delay: 0.8
        });
    
        heroTl.to(heroRefs.img, {
            xPercent: 0,
            duration: 1.2,
        }).to(heroRefs.grid, {
            xPercent: 0,
            duration: 1.2
        }, "<").to([heroRefs.title, heroRefs.subtitle, heroRefs.button], {
            yPercent: 0,
            duration: .7,
        }).to(heroRefs.button, {
            autoAlpha: 1,
            duration: .5
        })
    })
}