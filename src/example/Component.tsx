import { RenderableProps, ComponentChild } from "preact";
import { addChildren } from "../core";
import { VNode } from "../typings/internal";

export default abstract class Component<P, S> {
  state = {};
  props = {};
  context = {};
  refs: any = null;
  private __vnode__: null | VNode<any> = null;

  setState(state: { [key: string]: any }) {
    this.state = {
      ...this.state,
      ...state,
    };

    const newVnode = this.render();

    const oldVnode = this.__vnode__!;
    
    this.__vnode__ = newVnode;

    const parentElement = oldVnode._dom!.parentElement!;
    oldVnode._dom!.remove();

    addChildren(newVnode, parentElement);
  }

  forceUpdate() {}

  abstract render(
    props?: RenderableProps<P>,
    state?: Readonly<S>,
    context?: any
  ): null | VNode<any>;
}
