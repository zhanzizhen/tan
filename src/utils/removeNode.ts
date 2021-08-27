export default function removeNode(dom: HTMLElement) {
  dom.parentNode?.removeChild(dom);
}
