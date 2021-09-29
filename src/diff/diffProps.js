import { IS_NON_DIMENSIONAL } from "../constants";

/**
 * Diff the old and new properties of a VNode and apply changes to the DOM node
 * @param {import('../internal').PreactElement} dom The DOM node to apply
 * changes to
 * @param {object} newProps The new props
 * @param {object} oldProps The old props
 * @param {boolean} hydrate Whether or not we are in hydration mode
 */
export default function diffProps(dom, newProps, oldProps,  hydrate) {
  let i;

  for (i in oldProps) {
    if (i !== "children" && i !== "key" && !(i in newProps)) {
      setProperty(dom, i, null, oldProps[i]);
    }
  }

  for (i in newProps) {
    if (
      (!hydrate || typeof newProps[i] == "function") &&
      i !== "children" &&
      i !== "key" &&
      i !== "value" &&
      i !== "checked" &&
      oldProps[i] !== newProps[i]
    ) {
      setProperty(dom, i, newProps[i], oldProps[i]);
    }
  }
}

function setStyle(style, key, value) {
  if (key[0] === "-") {
    style.setProperty(key, value);
  } else if (value == null) {
    style[key] = "";
  } else if (typeof value != "number" || IS_NON_DIMENSIONAL.test(key)) {
    style[key] = value;
  } else {
    style[key] = value + "px";
  }
}

/**
 * Set a property value on a DOM node
 * @param {import('../internal').PreactElement} dom The DOM node to modify
 * @param {string} name The name of the property to set
 * @param {*} value The value to set the property to
 * @param {*} oldValue The old value the property had
 */
export function setProperty(dom, name, value, oldValue) {
  let useCapture;

  o: if (name === "style") {
    if (typeof value == "string") {
      dom.style.cssText = value;
    } else {
      if (typeof oldValue == "string") {
        dom.style.cssText = oldValue = "";
      }

      if (oldValue) {
        for (name in oldValue) {
          if (!(value && name in value)) {
            setStyle(dom.style, name, "");
          }
        }
      }

      if (value) {
        for (name in value) {
          if (!oldValue || value[name] !== oldValue[name]) {
            setStyle(dom.style, name, value[name]);
          }
        }
      }
    }
  }
  // Benchmark for comparison: https://esbench.com/bench/574c954bdb965b9a00965ac6
  else if (name[0] === "o" && name[1] === "n") {
    useCapture = name !== (name = name.replace(/Capture$/, ""));

    // Infer correct casing for DOM built-in events:
    if (name.toLowerCase() in dom) name = name.toLowerCase().slice(2);
    else name = name.slice(2);

    if (!dom._listeners) dom._listeners = {};
    dom._listeners[name + useCapture] = value;

    if (value) {
      if (!oldValue) {
        const handler = useCapture ? eventProxyCapture : eventProxy;
        dom.addEventListener(name, handler, useCapture);
      }
    } else {
      const handler = useCapture ? eventProxyCapture : eventProxy;
      dom.removeEventListener(name, handler, useCapture);
    }
  } else if (name !== "dangerouslySetInnerHTML") {
    if (
      name !== "href" &&
      name !== "list" &&
      name !== "form" &&
      // Default value in browsers is `-1` and an empty string is
      // cast to `0` instead
      name !== "tabIndex" &&
      name !== "download" &&
      name in dom
    ) {
      try {
        dom[name] = value == null ? "" : value;
        // labelled break is 1b smaller here than a return statement (sorry)
        break o;
      } catch (e) {}
    }

    // ARIA-attributes have a different notion of boolean values.
    // The value `false` is different from the attribute not
    // existing on the DOM, so we can't remove it. For non-boolean
    // ARIA-attributes we could treat false as a removal, but the
    // amount of exceptions would cost us too many bytes. On top of
    // that other VDOM frameworks also always stringify `false`.

    if (typeof value === "function") {
      // never serialize functions as attribute values
    } else if (
      value != null &&
      (value !== false || (name[0] === "a" && name[1] === "r"))
    ) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}

/**
 * Proxy an event to hooked event handlers
 * @param {Event} e The event object from the browser
 * @private
 */
function eventProxy(e) {
  this._listeners[e.type + false](e);
}

function eventProxyCapture(e) {
  this._listeners[e.type + true](e);
}
