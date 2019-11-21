import React from "react";

interface wapperProps {
  visible: boolean;
  destroyOnClose?: boolean;
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

    timer: any;

    componentDidUpdate(prevProps: wapperProps) {
      if (this.props.destroyOnClose === true) {
        if (prevProps.visible === true && this.props.visible === false) {
          this.timer = setTimeout(this.resetModal, 400);
        }
      }
    }

    componentWillUnmount() {
      window.clearTimeout(this.timer);
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
