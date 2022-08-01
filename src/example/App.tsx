import { jsx } from "../jsx-runtime";
import { renderApp } from "../core";

function App() {
  return (
    <div>
      <div>123</div>

      <button onClick={() => console.log(34)}>reverse</button>
    </div>
  );
}

type a = JSX.Element;

renderApp(<App />, document.getElementById("app")!);
