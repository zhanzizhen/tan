import React from 'react';
import propTypes from 'prop-types';

interface IWapperProps {
  visible: boolean;
  disableReset?: boolean;
}
interface IWapperState {
  key: number;
}

const INITIAL_KEY = 0;

export default function modalResetPlugin(
  WrappedComponent: React.Component | React.FunctionComponent,
) {
  return class Wrapper extends React.Component<IWapperProps, IWapperState> {
    state = {
      key: INITIAL_KEY,
    };

    isFirstRender = true;

    componentDidUpdate(prevProps: IWapperProps) {
      if (this.props.disableReset === true) {
        return;
      }
      if (prevProps.visible === false && this.props.visible === true) {
        if (this.isFirstRender === true) {
          this.isFirstRender = false;
          return;
        }
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
