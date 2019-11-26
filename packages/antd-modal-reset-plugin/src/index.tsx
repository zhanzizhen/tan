import React from "react";
import propTypes from "prop-types";

interface wapperProps {
  visible: boolean;
  disableReset?: boolean;
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
      if (this.props.disableReset !== true) {
        if (prevProps.visible === true && this.props.visible === false) {
          this.timer = setTimeout(this.resetModal, 400);
        }
      }
    }

    componentWillUnmount() {
      window.clearTimeout(this.timer);
    }

    resetModal = () => {
      this.setState({
        key: this.state.key + 1
      });
    };

    render() {
      return <WrappedComponent key={this.state.key} {...this.props} />;
    }
  };
}

modalResetPlugin.propTypes = {
  visible: propTypes.bool.isRequired,
  disableReset: propTypes.bool
};
modalResetPlugin.defaultProps = {
  disableReset: false
};
