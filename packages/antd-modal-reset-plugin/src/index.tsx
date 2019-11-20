import React from "react";

interface wapperProps {
  visible: boolean;
}
interface wapperState {
  key: number;
}

export default function modalResetPlugin(
  WrappedComponent: React.Component | React.FunctionComponent
) {
  return class Wrapper extends React.Component<wapperProps, wapperState> {
    state = {
      key: 0
    };

    componentDidUpdate(prevProps) {
      if (prevProps.visible === true && this.props.visible === false) {
        this.resetModal();
      }
    }

    resetModal() {
      this.setState({
        key: this.state.key + 1
      });
    }

    render() {
      return <WrappedComponent key={this.state.key} {...this.props} />;
    }
  };
}
