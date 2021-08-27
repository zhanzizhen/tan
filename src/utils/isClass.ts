export default function isClass(fn: Function) {
  return fn.toString().startsWith("class");
}
