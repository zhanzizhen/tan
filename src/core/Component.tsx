import { RenderableProps } from "preact";
import { diffVnode } from "../diff/diffVNodes";
import { Component, PreactElement, VNode } from "../types/internal";

export default abstract class TanComponent<P = {}, S = {}> {
  state: S; // Override Component["state"] to not be readonly for internal use, specifically Hooks
  base?: PreactElement;
  props: P;

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
  context?: any;

  constructor() {
    this.state = {};
    this.props = {};
    this._dirty = false;
    this._renderCallbacks = [];
    this._parentDom = null;
  }

  setState(
    state: { [key: string]: any } | ((s: S) => Partial<S>),
    callback?: () => void
  ) {
    if (typeof state === "function") {
      state = state(this.state);
    }

    debugger

    this.state = {
      ...this.state,
      ...state,
    };

    diffVnode(this.render(), this._vnode, this._parentDom);
  }

  forceUpdate() {}

  abstract render(
    props?: RenderableProps<P>,
    state?: Readonly<S>,
    context?: any
  ): null | VNode<any>;
}
