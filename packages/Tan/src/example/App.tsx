import { h } from "preact";
import Component from "./Component";

export default class App extends Component<any, { msg: string }> {
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
