import { Component } from "preact";
import { setProperty } from "../diff/props";
import { ComponentChild, ComponentChildren, VNode } from "../typings/internal";

export const renderApp = (app: JSX.Element, target: HTMLElement) => {
  addComponent(app.type, target);
};

export function addChildren(content: ComponentChildren, target: HTMLElement) {
  if (content === null) return;

  if (Array.isArray(content)) {
    for (let child of content) {
      addChildren(child, target);
    }
    return;
  }

  switch (typeof content) {
    case "string": // text
      target.append(content);
      break;
    case "number":
    case "boolean":
      target.append(String(content));
      break;
    case "undefined":
      break;
    default:
      // vnode
      mount(content, target);
  }
}

function addComponent(comp: Component, target: HTMLElement) {
  // @ts-ignore
  const component = new comp();
  const vnode2 = component.render();
  component.__vnode__ = vnode2;
  mount(vnode2, target);
}

function mount(vnode: VNode<any>, target: HTMLElement) {
  const creator = vnode.type;
  if (typeof creator === "function") {
    if (creator instanceof Component) {
      addComponent(creator, target);
    }
  } else {
    const { props } = vnode;

    const elem = document.createElement(creator);
    vnode._dom = elem;
    for (let key in props) {
      if (key === "children") {
        addChildren(props.children, elem);
      } else {
        setProperty(elem, key, props[key], null, false);
        // // @ts-ignore
        // const value = props[key];
        // if (typeof value === "function") {
        //   // debugger;
        //   elem.addEventListener(key.slice(2).toLowerCase(), value);
        // } else {
        //   elem.setAttribute(key, value);
        // }
      }
    }
    target.appendChild(elem);
  }
}
