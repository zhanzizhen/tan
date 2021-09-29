import { VNode } from "../types/internal";
import removeNode from "../utils/removeNode";
import { diffChildren } from "./diffChildren";
import diffProps, { setProperty } from "./diffProps";

export default function diffElementNodes(
  dom: HTMLElement,
  newVNode: VNode<any>,
  oldVNode: VNode<any>,
  excessDomChildren: (HTMLElement | null)[] | null
) {
  let oldProps = oldVNode.props;
  let newProps = newVNode.props;
  let nodeType = newVNode.type;
  let i = 0;

  if (dom == null) {
    if (nodeType === null) {
      // @ts-ignore createTextNode returns Text, we expect PreactElement
      return document.createTextNode(newProps);
    }

    dom = document.createElement(
      // @ts-ignore We know `newVNode.type` is a string
      nodeType,
      newProps.is && newProps
    );
  }

  if (nodeType === null) {
    // During hydration, we still have to split merged text from SSR'd HTML.
    if (oldProps !== newProps && dom.data !== newProps) {
      dom.data = newProps;
    }
  } else {
    oldProps = oldVNode.props || {};

    diffProps(dom, newProps, oldProps, false);

    i = newVNode.props.children;
    diffChildren(Array.isArray(i) ? i : [i], newVNode, oldVNode, dom);

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
      setProperty(dom, "value", i, oldProps.value);
    }
    if (
      "checked" in newProps &&
      (i = newProps.checked) !== undefined &&
      i !== dom.checked
    ) {
      setProperty(dom, "checked", i, oldProps.checked);
    }
    // }
  }

  return dom;
}
