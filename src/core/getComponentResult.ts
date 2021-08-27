import { VNode } from "../types/internal";
import isClass from "../utils/isClass";

export default function getComponentResult(type: Function): VNode {
  // @ts-ignore
  const component = new type();
  const vnode2 = component.render();
  component.__vnode__ = vnode2;

  return vnode2;
}
