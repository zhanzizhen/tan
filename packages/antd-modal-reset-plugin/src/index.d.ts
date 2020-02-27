declare module 'antd-modal-reset-plugin' {
  interface IWapperProps {
    visible: boolean;
    disableReset?: boolean;
  }
  interface IWapperState {
    key: number;
  }
  const modalRest: <P>(
    c: React.ComponentType<P>,
  ) => React.ComponentClass<P & IWapperProps, IWapperState>;
  export default modalRest;
}
