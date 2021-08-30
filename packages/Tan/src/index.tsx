import { h } from "preact";
import App from "./example/App";
import { renderApp } from "./core";

renderApp(<App />, document.getElementById("app")!);
