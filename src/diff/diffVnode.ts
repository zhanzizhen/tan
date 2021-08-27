import { diffChildren } from "../core";
import { VNode } from "../types/internal";
import removeNode from "../utils/removeNode";
import diffProps, { setProperty } from "./diffProps";

export default function diffElementNodes(
  dom: HTMLElement,
  newVNode: VNode<any>,
  oldVNode: VNode<any>,
  excessDomChildren: (HTMLElement | null)[] | null,
  isSvg: boolean
) {
  let oldProps = oldVNode.props;
  let newProps = newVNode.props;
  let nodeType = newVNode.type;
  let i = 0;

  // Tracks entering and exiting SVG namespace when descending through the tree.
  if (nodeType === "svg") isSvg = true;

  if (excessDomChildren != null) {
    for (; i < excessDomChildren.length; i++) {
      const child = excessDomChildren[i];

      // if newVNode matches an element in excessDomChildren or the `dom`
      // argument matches an element in excessDomChildren, remove it from
      // excessDomChildren so it isn't later removed in diffChildren
      if (
        child &&
        (child === dom ||
          (nodeType ? child.localName == nodeType : child.nodeType == 3))
      ) {
        dom = child;
        excessDomChildren[i] = null;
        break;
      }
    }
  }

  if (dom == null) {
    if (nodeType === null) {
      // @ts-ignore createTextNode returns Text, we expect PreactElement
      return document.createTextNode(newProps);
    }

    if (isSvg) {
      dom = document.createElementNS(
        "http://www.w3.org/2000/svg",
        // @ts-ignore We know `newVNode.type` is a string
        nodeType
      );
    } else {
      dom = document.createElement(
        // @ts-ignore We know `newVNode.type` is a string
        nodeType,
        newProps.is && newProps
      );
    }

    // we created a new parent, so none of the previously attached children can be reused:
    excessDomChildren = null;
  }

  if (nodeType === null) {
    // During hydration, we still have to split merged text from SSR'd HTML.
    if (oldProps !== newProps && (dom.data !== newProps)) {
      dom.data = newProps;
    }
  } else {
    // If excessDomChildren was not null, repopulate it with the current element's children:
    excessDomChildren = excessDomChildren && [].slice.call(dom.childNodes);

    oldProps = oldVNode.props || {};

    let oldHtml = oldProps.dangerouslySetInnerHTML;
    let newHtml = newProps.dangerouslySetInnerHTML;

    // During hydration, props are not diffed at all (including dangerouslySetInnerHTML)
    // @TODO we should warn in debug mode when props don't match here.
    // if (!isHydrating) {
    // But, if we are in a situation where we are using existing DOM (e.g. replaceNode)
    // we should read the existing DOM attributes to diff them
    if (excessDomChildren != null) {
      oldProps = {};
      for (i = 0; i < dom.attributes.length; i++) {
        oldProps[dom.attributes[i].name] = dom.attributes[i].value;
      }
    }

    if (newHtml || oldHtml) {
      // Avoid re-applying the same '__html' if it did not changed between re-render
      if (
        !newHtml ||
        ((!oldHtml || newHtml.__html != oldHtml.__html) &&
          newHtml.__html !== dom.innerHTML)
      ) {
        dom.innerHTML = (newHtml && newHtml.__html) || "";
      }
    }
    // }

    diffProps(dom, newProps, oldProps, isSvg, false);

    // If the new vnode didn't have dangerouslySetInnerHTML, diff its children
    if (newHtml) {
      newVNode._children = [];
    } else {
      i = newVNode.props.children;
      diffChildren(Array.isArray(i) ? i : [i], newVNode, oldVNode, dom);

      // Remove children that are not part of any vnode.
      if (excessDomChildren != null) {
        for (i = excessDomChildren.length; i--; ) {
          if (excessDomChildren[i] != null) removeNode(excessDomChildren[i]!);
        }
      }
    }

    // (as above, don't diff props during hydration)
    // if (!isHydrating) {
    if (
      "value" in newProps &&
      (i = newProps.value) !== undefined &&
      // #2756 For the <progress>-element the initial value is 0,
      // despite the attribute not being present. When the attribute
      // is missing the progress bar is treated as indeterminate.
      // To fix that we'll always update it when it is 0 for progress elements
      (i !== dom.value || (nodeType === "progress" && !i))
    ) {
      setProperty(dom, "value", i, oldProps.value, false);
    }
    if (
      "checked" in newProps &&
      (i = newProps.checked) !== undefined &&
      i !== dom.checked
    ) {
      setProperty(dom, "checked", i, oldProps.checked, false);
    }
    // }
  }

  return dom;
}
