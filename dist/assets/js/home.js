(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,r(s.key),s)}}function o(e,o,s){return o&&t(e.prototype,o),s&&t(e,s),Object.defineProperty(e,"prototype",{writable:!1}),e}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t,o){return(t=r(t))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(t){var o=function(t,o){if("object"!=e(t)||!t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var n=s.call(t,"string");if("object"!=e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(o)?o:o+""}var c=o((function e(t){var o=this;s(this,e),n(this,"closeOnBackdropClick",(function(e){e.target===o.select||e.target.closest(".custom-select.active")||o.closeDropdown()})),n(this,"openDropdown",(function(){o.select.classList.add(o.activeClass),window.addEventListener("click",o.closeOnBackdropClick)})),n(this,"closeDropdown",(function(){o.select.classList.remove(o.activeClass),window.removeEventListener("click",o.closeOnBackdropClick)})),n(this,"toggleDropdown",(function(){o.select.classList.contains(o.activeClass)?o.closeDropdown():(document.querySelector(".custom-select.active")&&document.querySelector(".custom-select.active").classList.remove("active"),o.openDropdown())})),n(this,"selectItem",(function(e){e.target.closest("li")&&(o.select.querySelector(o.selectedTitle).textContent=e.target.closest("li").textContent,o.select.querySelector("input").value=e.target.closest("li").textContent,o.closeDropdown())})),n(this,"init",(function(){o.select.querySelector(o.chosenOption).addEventListener("click",o.toggleDropdown),o.select.querySelector(o.selectList).addEventListener("click",o.selectItem)})),this.select=t,this.chosenOption=".custom-select__selected",this.selectedTitle=".custom-select__chosen",this.selectBtn=".custom-select__btn",this.selectList=".custom-select__list",this.activeClass="active"}));Array.from(document.querySelectorAll(".custom-select")).forEach((function(e){return new c(e).init()})),(new(o((function e(){var t=this;s(this,e),n(this,"selecteValues",{category:"",name:"",language:""}),n(this,"fields",{category:document.querySelector('input[name="category"]'),name:document.querySelector('input[name="name"]'),language:document.querySelector('input[name="language"]')}),n(this,"form",document.querySelector(".sign-form__form")),n(this,"validateForm",(function(){var e=!0;return t.selecteValues.category?t.fields.category.closest(".sign-form__field").classList.remove("error"):(t.fields.category.closest(".sign-form__field").classList.add("error"),e=!1),t.selecteValues.name?t.fields.name.closest(".sign-form__field").classList.remove("error"):(t.fields.name.closest(".sign-form__field").classList.add("error"),e=!1),t.selecteValues.language?t.fields.language.closest(".sign-form__field").classList.remove("error"):(t.fields.language.closest(".sign-form__field").classList.add("error"),e=!1),e})),n(this,"onChange",(function(){t.form.addEventListener("click",(function(e){if(e.target.closest("li")){var o=e.target.closest(".custom-select").querySelector("input").name;t.selecteValues[o]=e.target.closest("li").textContent,e.target.closest(".custom-select").closest(".sign-form__field").querySelector(".sign-form__note").style.display="none"}})),t.form.addEventListener("submit",t.submitForm)})),n(this,"submitForm",(function(e){e.preventDefault(),t.validateForm()?console.log(t.selecteValues):console.log("Form didn't pass validation")}))})))).onChange();var i=document.querySelectorAll(".sign-page__welcome-block > *"),l=document.querySelector(".sign-form__form"),a=document.querySelector(".sign-form__bg img");gsap.matchMedia().add("(min-width: 960px)",(function(){gsap.from(i,{x:-120,opacity:0,duration:1.6,stagger:.4}),gsap.timeline().from(a,{x:150,duration:1}).from(l,{opacity:0,duration:1.2})}))})();