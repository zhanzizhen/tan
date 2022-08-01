import { VNode } from "../types";
import removeNode from "../utils/removeNode";
import { diffChildren } from "./diffChildren";
import diffProps, { setProperty } from "./diffProps";

export default function diffElementNodes(
  dom: VNode["_dom"],
  newVNode: VNode<any>,
  oldVNode: VNode<any>,
  excessDomChildren: (HTMLElement | null)[] | null
) {
  let oldProps = oldVNode.props;
  let newProps = newVNode.props;
  let nodeType = newVNode.type;
  let i = 0;

  if (dom == null) {
    dom = document.createElement(
      // @ts-ignore We know `newVNode.type` is a string
      nodeType,
      newProps.is && newProps
    );
  }

  oldProps = oldVNode.props || {};

  diffProps(dom, newProps, oldProps, false);

  i = newVNode.props.children;
  diffChildren(Array.isArray(i) ? i : [i], newVNode, oldVNode, dom);

  if (
    "value" in newProps &&
    (i = newProps.value) !== undefined &&
    i !== dom.value
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

  return dom;
}
