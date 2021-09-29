import { Fragment } from "../core";
import Component from "../core/Component";
import { VNode } from "../types/internal";
import { diffChildren } from "./diffChildren";
import diffElementNodes from "./diffElementNodes";

export function diffVnode(
  newVnode: VNode<any>,
  oldVnode: VNode<any>,
  parentDom: HTMLElement
) {
  const newVType = newVnode.type;

  // TODO: 处理这个逻辑
  if (typeof newVType === "function") {
    var c: Component<any, any> = (newVnode._component = new newVType());

    let newProps = newVnode.props;
    c.props = newProps;

    const tmp = (c._vnode = c.render(c.props, c.state, c.context));

    let isTopLevelFragment =
      tmp != null && tmp.type === Fragment && tmp.key == null;
    let renderResult = isTopLevelFragment ? tmp!.props.children : tmp;

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
    );
  }
}
