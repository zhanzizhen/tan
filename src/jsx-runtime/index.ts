import { VNode } from "../types";

let vnodeId = 0;

function createVNode(
  type: VNode<any>["type"],
  props: VNode<any>["props"],
  key: VNode<any>["key"],
  __source: string,
  __self: string
): VNode<any> {
  // We'll want to preserve `ref` in props to get rid of the need for
  // forwardRef components in the future, but that should happen via
  // a separate PR.
  let normalizedProps: VNode<any>["props"] = {},
    ref,
    i;
  for (i in props) {
    if (i == "ref") {
      ref = props[i];
    } else {
      normalizedProps[i] = props[i];
    }
  }

  const vnode: VNode<any> = {
    type,
    props: normalizedProps,
    key,
    ref,
    _dom: null,
  };

  return vnode;
}

export { createVNode as jsx };
