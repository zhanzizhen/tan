import { VNode } from "../types/internal";

var vnodeId = 0;

export function createVNode(
  type: any,
  props: any,
  key: any,
  ref: any,
): VNode<any> {
  // V8 seems to be better at detecting type shapes if the object is allocated from the same call site
  // Do not inline into createElement and coerceToVNode!
  const vnode: VNode = {
    type,
    props,
    key,
    ref,
    _children: [],
    _parent: null,
    _depth: 0,
    _dom: null,
    // _nextDom must be initialized to undefined b/c it will eventually
    // be set to dom.nextSibling which can return `null` and it is important
    // to be able to distinguish between an uninitialized _nextDom and
    // a _nextDom that has been set to `null`
    _nextDom: null,
    _component: null,
    _hydrating: null,
    constructor: undefined,
  };

  return vnode;
}
