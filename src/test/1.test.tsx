import { h } from "preact";
import Component from "../core/Component";
import { shallow } from "enzyme";

class App extends Component {
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
        <div id="msg">{msg}</div>

        <button onClick={this.reverse}>reverse</button>
      </div>
    );
  }
}

describe("test reverse", () => {
  test("msg", () => {
    const app = shallow(<App />);

    expect(app.find("#msg").text()).toBe("hello tan");
  });

  test("reverse msg", () => {
    const app = shallow(<App />);

    app.find("button").simulate("click");
    expect(app.find("#msg").text()).toBe("nat olleh");
  });
});
