import diffElementNodes from "../diff/diffVnode";
import { ComponentChildren, VNode } from "../types/internal";
import { createVNode } from "../utils/vnode";

export const renderApp = (app: VNode, target: HTMLElement) => {
  diffVnode(app, {}, target);
};

export function Fragment(props: VNode["props"]) {
  return props.children;
}

export function diffChildren(
  renderResult: ComponentChildren[],
  newParentVnode: VNode,
  oldParentVnode: VNode,
  parentDom: HTMLElement
) {
  if (!newParentVnode._children) newParentVnode._children = [];

  let oldChildren = (oldParentVnode && oldParentVnode._children) || [];

  for (let i = 0; i < renderResult.length; i++) {
    let childVnode = renderResult[i];

    if (childVnode == null || typeof childVnode == "boolean") {
      childVnode = newParentVnode._children[i] = null;
    } else if (
      typeof childVnode == "string" ||
      typeof childVnode == "number" ||
      // eslint-disable-next-line valid-typeof
      typeof childVnode == "bigint"
    ) {
      childVnode = newParentVnode._children[i] = createVNode(
        null,
        childVnode,
        null,
        null,
        childVnode
      );
    } else if (Array.isArray(childVnode)) {
      childVnode = newParentVnode._children[i] = createVNode(
        Fragment,
        { children: childVnode },
        null,
        null,
        null
      );
    } else if (childVnode._depth > 0) {
      // VNode is already in use, clone it. This can happen in the following
      // scenario:
      //   const reuse = <div />
      //   <div>{reuse}<span />{reuse}</div>
      childVnode = newParentVnode._children[i] = createVNode(
        childVnode.type,
        childVnode.props,
        childVnode.key,
        null,
        childVnode._original
      );
    } else {
      childVnode = newParentVnode._children[i] = childVnode;
    }

    if (childVnode == null) {
      continue;
    }

    childVnode._parent = newParentVnode;
    childVnode._depth = (newParentVnode._depth ?? 0) + 1;

    // Check if we find a corresponding element in oldChildren.
    // If found, delete the array item by setting to `undefined`.
    // We use `undefined`, as `null` is reserved for empty placeholders
    // (holes).
    let oldVnode = oldChildren[i];

    if (
      oldVnode === null ||
      (oldVnode &&
        childVnode.key == oldVnode.key &&
        childVnode.type === oldVnode.type)
    ) {
      oldChildren[i] = undefined;
    } else {
      // Either oldVnode === undefined or oldChildrenLength > 0,
      // so after this loop oldVnode == null or oldVnode is a valid value.
      for (let j = 0; j < oldChildren.length; j++) {
        oldVnode = oldChildren[j];
        // If childVnode is unkeyed, we only match similarly unkeyed nodes, otherwise we match by key.
        // We always match by type (in either case).
        if (
          oldVnode &&
          childVnode.key == oldVnode.key &&
          childVnode.type === oldVnode.type
        ) {
          oldChildren[j] = undefined;
          break;
        }
        oldVnode = null;
      }
    }

    oldVnode = oldVnode || {};

    // Morph the old element into the new one, but don't append it to the dom yet
    diffVnode(childVnode, oldVnode, parentDom);

    const newDom = childVnode._dom;
    if (newDom && !oldVnode._dom) {
      parentDom.appendChild(newDom);
    }
  }
}

export function diffVnode(
  newVnode: VNode<any>,
  oldVnode: VNode<any>,
  parentDom: HTMLElement
) {
  const newVType = newVnode.type;

  // TODO: 处理这个逻辑
  if (typeof newVType === "function") {
    var c = (newVnode._component = new newVType());

    let newProps = newVnode.props;
    c.props = newProps;

    const tmp = (c._vnode = c.render(c.props, c.state, c.context));

    let isTopLevelFragment =
      tmp != null && tmp.type === Fragment && tmp.key == null;
    let renderResult = isTopLevelFragment ? tmp.props.children : tmp;

    diffChildren(
      Array.isArray(renderResult) ? renderResult : [renderResult],
      newVnode,
      oldVnode,
      parentDom
    );
  } else {
    newVnode._dom = diffElementNodes(
      oldVnode._dom,
      newVnode,
      oldVnode,
      null,
      false
    );
  }
}
