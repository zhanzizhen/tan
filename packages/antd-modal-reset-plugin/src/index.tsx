import React, { ReactElement } from 'react';
import propTypes from 'prop-types';

const INITIAL_KEY = 0;

export default function modalResetPlugin<P>(
  WrappedComponent: React.ComponentClass | React.SFC,
) {
  interface IWapperProps {
    visible: boolean;
    disableReset?: boolean;
  }
  interface IWapperState {
    key: number;
  }
  return class Wrapper extends React.Component<IWapperProps, IWapperState> {
    state = {
      key: INITIAL_KEY,
    };

    componentDidUpdate(prevProps: IWapperProps) {
      if (this.props.disableReset === true) {
        return;
      }
      if (prevProps.visible === false && this.props.visible === true) {
        this.resetModal();
      }
    }

    resetModal = () => {
      this.setState({
        key: this.state.key + 1,
      });
    };

    render() {
      return <WrappedComponent key={this.state.key} {...this.props} />;
    }
  };
}

modalResetPlugin.propTypes = {
  visible: propTypes.bool.isRequired,
  disableReset: propTypes.bool,
};
modalResetPlugin.defaultProps = {
  disableReset: false,
};
