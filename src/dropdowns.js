import * as utils from './utils';

const cls_dropdown = "wds-dropdown";
const cls_active = "wds-is-active";
const selector_dropdown = "." + cls_dropdown;

function closeAllBut(ele) {
  var dds = document.querySelectorAll(selector_dropdown);
  for (var i = 0, l = dds.length; i < l; i++) {
    if (dds[i] != ele) {
      dds[i].classList.remove(cls_active);
    }
  }
}

export function init() {
  document.addEventListener('click', (ev) => {
    var dd = utils.ancestorByClass(ev.target, cls_dropdown);
    if (dd) {
      closeAllBut(dd);
      dd.classList.toggle(cls_active);
    } else {
      closeAllBut(null);
    }
  });

  utils.addEscapeListener(() => {
    closeAllBut(null);
  });
}
