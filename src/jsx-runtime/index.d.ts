import { ComponentChild, VNode, ComponentType, Attributes, ComponentChildren } from "preact";
import { JSXInternal } from "preact/src/jsx";


export function jsx(
	type: string,
	props: JSXInternal.HTMLAttributes &
		JSXInternal.SVGAttributes &
		Record<string, any> & { children?: ComponentChild },
	key?: string
): VNode<any>;
export function jsx<P>(
	type: ComponentType<P>,
	props: Attributes & P & { children?: ComponentChild },
	key?: string
): VNode<any>;

export function jsxs(
	type: string,
	props: JSXInternal.HTMLAttributes &
		JSXInternal.SVGAttributes &
		Record<string, any> & { children?: ComponentChild[] },
	key?: string
): VNode<any>;
export function jsxs<P>(
	type: ComponentType<P>,
	props: Attributes & P & { children?: ComponentChild[] },
	key?: string
): VNode<any>;

export function jsxDEV(
	type: string,
	props: JSXInternal.HTMLAttributes &
		JSXInternal.SVGAttributes &
		Record<string, any> & { children?: ComponentChildren },
	key?: string
): VNode<any>;
export function jsxDEV<P>(
	type: ComponentType<P>,
	props: Attributes & P & { children?: ComponentChildren },
	key?: string
): VNode<any>;

export { JSXInternal as JSX };
