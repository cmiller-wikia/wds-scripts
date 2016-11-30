// Quick polyfill for Array.isArray
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// Find nearest ancestor of element ele (inclusive) with class className. Returns null
// if none found.
export function ancestorByClass(ele, className) {
  if (!ele || ele.classList.contains(className)) {
    return ele;
  } else if (ele.parentElement) {
    return ancestorByClass(ele.parentElement, className);
  } else {
    return null;
  }
}

// Add event-handler f(event) to the global escape-handling hook. Ordering of
// handlers is undefined.
export function addEscapeListener(f) {
  window.addEventListener("keydown", (ev) => {
    if (event.defaultPrevented) {
      return;
    }

    if (ev.key == "Escape" || ev.keyIdentifier == "U+001B") {
      f(ev);
    }
  });
}

export function svg(src, classes) {
  return src.replace("<svg ", "<svg class=\"" + classes + "\" ");
}

// Helper function for combining custom class attributes with a defaults
export function classes(main, additional) {
  if (Array.isArray(additional)) {
    return [ main ].concat(additional).join(" ");
  } else {
    return main;
  }
}

// Convert an HTML string into a DOM node using the supplied document object.
export function asDOM(str, doc) {
  var ele = doc.createElement("div");
  ele.innerHTML = str;
  return ele.firstChild()
}
