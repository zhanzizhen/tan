import { h } from "preact";
import { renderApp } from "../core";
import Component from "../core/Component";

class App extends Component<any, { todoList: string[] }> {
  refs: any;
  constructor() {
    super();
  }

  state = {
    msg: "hello tan",
  };

  reverse = () => {
    this.setState({
      msg: this.state.msg.split("").reverse().join(""),
    });
  };

  render() {
    const { msg } = this.state;
    return (
      <div>
        <div>{msg}</div>

        <button onClick={this.reverse}>reverse</button>
      </div>
    );
  }
}

renderApp(<App />, document.getElementById("app")!);
