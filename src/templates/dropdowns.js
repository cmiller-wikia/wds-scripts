import * as utils from '../utils';
import {src as icon} from '../svg/wds-icons-dropdown';

export function newImageDropdown(image, title, rows, opts) {
    return template(image, title, rows, opts);
}

export function newTextDropdown(heading, rows, opts) {
  return template("<span>" + heading + "</span>", "", rows, opts);
}

function template(heading, title, rows, opts) {
  var options = opts || {};
  var titleAttr = title ? " title=\"" + title + "\"" : ""
  return `<div class="${utils.classes("wds-dropdown", options.mainClasses)}">
  	<div class="${utils.classes("wds-dropdown__toggle", options.toggleClasses)}${titleAttr}">
  		<span>${heading}</span>
      ${utils.svg(icon, utils.classes("wds-icon wds-dropdown__toggle-chevron", options.iconClasses))}
  	</div>
    <div class="${utils.classes("wds-dropdown__content", options.contentClasses)}">
      <ul class="${utils.classes("wds-list", options.listClasses)}">
        ${templateRows(rows)}
      </ul>
    </div>
  </div>`
}

function templateRows(rows) {
  var result = ""
  for (var i = 0, l = rows.length; i < l; i++) {
    result += `<li>${rows[i]}</li>\n`
  }

  return result;
}

export function templateRow(contents, classes) {
  return { 'contents': contents, 'classes': classes }
}
