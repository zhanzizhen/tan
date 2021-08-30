import { diffVnode } from "../core";
import { RenderableProps } from "../types";
import { Component, PreactElement, VNode } from "../types/internal";

export default abstract class TanComponent<P = {}, S = {}>
  implements Component<P, S>
{
  props: RenderableProps<P>;
	context: any;
  state: S; // Override Component["state"] to not be readonly for internal use, specifically Hooks
  base?: PreactElement;

  _dirty: boolean;
  _force?: boolean;
  _renderCallbacks: Array<() => void>; // Only class components
  _globalContext?: any;
  _vnode?: VNode<P> | null;
  _nextState?: S | null; // Only class components
  /** Only used in the devtools to later dirty check if state has changed */
  _prevState?: S | null;
  /**
   * Pointer to the parent dom node. This is only needed for top-level Fragment
   * components or array returns.
   */
  _parentDom?: PreactElement | null;
  // Always read, set only when handling error
  _processingException?: Component<any, any> | null;
  // Always read, set only when handling error. This is used to indicate at diffTime to set _processingException
  _pendingError?: Component<any, any> | null;

  constructor() {
    this.state = {} as S;
    this.props = {} as P;
    this._dirty = false;
    this._renderCallbacks = [];
    this._parentDom = null;
  }

  setState(state: S | ((s: S) => S)) {
    if (typeof state === "function") {
      this.setState = {
        ...this.state,
        ...state(this.state),
      };
    } else {
      this.state = {
        ...this.state,
        ...state,
      };
    }

    const newNode = this.render();

    // if (!newNode || !this._vnode || !this._parentDom) {
    //   throw Error("还未实现");
    // }

    diffVnode(newNode, this._vnode, this._parentDom);
    this._vnode = newNode;
  }

  forceUpdate() {
    this.setState({});
  }

  abstract render(
    props?: RenderableProps<P>,
    state?: Readonly<S>,
    context?: any
  ): null | VNode<any>;
}