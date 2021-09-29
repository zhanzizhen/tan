import { createVNode } from "../utils/vnode";

export function unmount(node: HTMLElement) {
  const parentNode = node.parentNode;
  if (parentNode) {
    parentNode.removeChild(node);
  }
}

export const EMPTY_VNODE = createVNode(null, null, null, null);
