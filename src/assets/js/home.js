import 'normalize.css';
import '@styles/index.scss';

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

        this.chosenOption = `.custom-select__selected`;
        this.selectedTitle = `.custom-select__chosen`;
        this.selectBtn = `.custom-select__btn`;
        this.selectList = `.custom-select__list`;
        this.activeClass = `active`;
    }

    closeOnBackdropClick = e => {
        if (e.target !== this.select && !e.target.closest('.custom-select.active')) this.closeDropdown();
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
            if (document.querySelector('.custom-select.active')) document.querySelector('.custom-select.active').classList.remove('active')
            this.openDropdown();
        }
    }

    selectItem = (e) => {
        if (e.target.closest('li')) {
            this.select.querySelector(this.selectedTitle).textContent = e.target.closest('li').textContent;
            this.select.querySelector('input').value = e.target.closest('li').textContent;
            this.closeDropdown();
        }
    }

    init = () => {
        this.select.querySelector(this.chosenOption).addEventListener("click", this.toggleDropdown);
        this.select.querySelector(this.selectList).addEventListener("click", this.selectItem)
    }
}


Array.from(document.querySelectorAll('.custom-select')).forEach(sel => new CustomSelect(sel).init());


/**
 *
 *
 * @class SubmitForm
 */

class SubmitForm {
    selecteValues = {
        category: '',
        name: '',
        language: '',
    }

    fields = {
        category: document.querySelector('input[name="category"]'),
        name: document.querySelector('input[name="name"]'),
        language: document.querySelector('input[name="language"]'), 
    }

    form = document.querySelector('.sign-form__form');

    validateForm = () => {
        let validate = true;

        if (!this.selecteValues.category) {
            this.fields.category.closest('.sign-form__field').classList.add('error');
            validate = false;
        } else {
            this.fields.category.closest('.sign-form__field').classList.remove('error');
        }

        if (!this.selecteValues.name) {
            this.fields.name.closest('.sign-form__field').classList.add('error');
            validate = false;
        } else {
            this.fields.name.closest('.sign-form__field').classList.remove('error');
        }

        if (!this.selecteValues.language) {
            this.fields.language.closest('.sign-form__field').classList.add('error');
            validate = false;
        } else {
            this.fields.language.closest('.sign-form__field').classList.remove('error');
        }

        return validate;
    }

    onChange = () => {
        this.form.addEventListener("click", e => {
            if (e.target.closest('li')) {
                const targetValue = e.target.closest('.custom-select').querySelector('input').name;
                this.selecteValues[targetValue] = e.target.closest('li').textContent;
                e.target.closest('.custom-select').closest('.sign-form__field').querySelector('.sign-form__note').style.display = 'none';
            }
        })

        this.form.addEventListener("submit", this.submitForm)
    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            console.log(this.selecteValues);
        } else {
            console.log(`Form didn't pass validation`);
        }
        
    }
}

const form = new SubmitForm();
form.onChange();
// End FORM

const textBlock = document.querySelectorAll('.sign-page__welcome-block > *');
const formBlock = document.querySelector('.sign-form__form');
const backgroundImage = document.querySelector('.sign-form__bg img');

const mm = gsap.matchMedia();
mm.add("(min-width: 960px)", () => {
    gsap.from(textBlock, {
        x: -120,
        opacity: 0,
        duration: 1.6,
        stagger: .4,
        // ease: ''
    })
    const tt = gsap.timeline()

    tt.from(backgroundImage, {
        x: 150,
        duration: 1,
    }).from(formBlock, {
        // x: 250,
        opacity: 0,
        duration: 1.2,
    })
})