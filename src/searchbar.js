import * as utils from './utils';

const cls_navbar = "wds-global-navigation";
const cls_search = "wds-global-navigation__search";
const cls_active = "wds-search-is-active";

function getInputField(elem) {
  return elem.querySelector('.wds-global-navigation__search-input');
}

function getSubmitButton(elem) {
  return elem.querySelector('.wds-global-navigation__search-submit');
}

function isEmpty(elem) {
  return elem.value.length == 0;
}

function activate(navbar) {
  var inputField = getInputField(navbar);
  var submitButton = getSubmitButton(navbar);

  navbar.classList.add(cls_active);
  submitButton.disabled = isEmpty(inputField);
  inputField.placeholder = inputField.getAttribute("data-placeholder-active");
}

function deactivate(navbar) {
  var inputField = getInputField(navbar);
  var submitButton = getSubmitButton(navbar);

  inputField.blur();
  navbar.classList.remove(cls_active);
  submitButton.disabled = true;
  inputField.placeholder = inputField.getAttribute("data-placeholder-inactive");
  inputField.value = "";
}

export function init() {
  document.addEventListener('click', (ev) => {
    var searchField = utils.ancestorByClass(ev.target, cls_search);
    var navbar = utils.ancestorByClass(searchField, cls_navbar);

    if (searchField && navbar && !navbar.classList.contains(cls_active)) {
      activate(navbar);
      ev.stopPropagation();
    }
  });

  utils.addEscapeListener(() => {
    var navbars = document.querySelectorAll("." + cls_navbar);
    for (var i = 0, l = navbars.length; i < l; i++) {
      if (navbars[i].classList.contains(cls_active)) {
        deactivate(navbars[i]);
      }
    }
  });
}
