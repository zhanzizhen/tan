export interface FunctionComponent<P = {}> {
  (props: RenderableProps<P>, context?: any): VNode<any> | null;
  displayName?: string;
  defaultProps?: Partial<P>;
}
export interface VNode<P = {}> {
  type: Function | string;
  props: P & { children: ComponentChildren };
  key: Key;
  /**
   * ref is not guaranteed by React.ReactElement, for compatibility reasons
   * with popular react libs we define it as optional too
   */
  ref?: Ref<any> | null;
  _dom?: HTMLElement | null;
}

export type Key = string | number | null;

export type RefObject<T> = { current: T | null };
export type RefCallback<T> = (instance: T | null) => void;
export type Ref<T> = RefObject<T> | RefCallback<T>;

export type ComponentChild =
  | VNode<any>
  | object
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;
export type ComponentChildren = ComponentChild[] | ComponentChild;

export interface Attributes {
  key?: Key;
  jsx?: boolean;
}

export interface ClassAttributes<T> extends Attributes {
  ref?: Ref<T>;
}

export interface PreactDOMAttributes {
  children?: ComponentChildren;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

export type RenderableProps<P, RefType = any> = P &
  Readonly<Attributes & { children?: ComponentChildren; ref?: Ref<RefType> }>;

export interface FunctionComponent<P = {}> {
  (props: RenderableProps<P>, context?: any): VNode<any> | null;
  displayName?: string;
  defaultProps?: Partial<P>;
}
export interface FunctionalComponent<P = {}> extends FunctionComponent<P> {}

//
// Preact render
// -----------------------------------

//
// Preact options
// -----------------------------------

/**
 * Global options for preact
 */
export interface Options {
  /** Attach a hook that is invoked whenever a VNode is created. */
  vnode?(vnode: VNode): void;
  /** Attach a hook that is invoked immediately before a vnode is unmounted. */
  unmount?(vnode: VNode): void;
  /** Attach a hook that is invoked after a vnode has rendered. */
  diffed?(vnode: VNode): void;
  event?(e: Event): any;
  requestAnimationFrame?: typeof requestAnimationFrame;
  debounceRendering?(cb: () => void): void;
  useDebugValue?(value: string | number): void;
  _addHookName?(name: string | number): void;
  __suspenseDidResolve?(vnode: VNode, cb: () => void): void;
  // __canSuspenseResolve?(vnode: VNode, cb: () => void): void;
}

export const options: Options;
