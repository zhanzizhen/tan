import { jsx as h } from "./jsx-runtime";
import App from "./example/App";
import { renderApp } from "./core";

renderApp(<App />, document.getElementById("app")!);
