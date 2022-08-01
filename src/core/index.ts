/**
 * 1. 类型从types/interval引入
 */

import { diffVnode } from "../diff/diffVNodes";
import { EMPTY_VNODE } from "../diff/unmount";
import { VNode } from "../types";

export const renderApp = (app: VNode, target: HTMLElement) => {
  diffVnode(app, EMPTY_VNODE, target);
};

export function Fragment(props: VNode["props"]) {
  return props.children;
}
