# antd-modal-reset-plugin

一个帮助你 reset antd-modal 的高阶组件。

## introduction

我们在使用 antd-modal 的时候，经常需要在关闭的时候来清除这个 modal 里面的状态值。为了达到目的很多人会这样做：

```jsx
// App.jsx
{
  modalVisible && <MyModal />;
}
```

这样的缺点是，当 modalVisible 由 true 变为 false 的时候，MyModal 会立刻被销毁，从而没有退场动画，体验比较生硬。

antd-modal-reset-plugin 可以帮助我们解决这个问题。它的原理是在 props.visible 由 false 变为 true 的时候去自动 destroy antd-modal 然后重新 render 它。

## Usage

```bash
npm i --save antd-modal-reset-plugin
```

```js
// MyModal.jsx
import modalReset from 'antd-modal-reset-plugin';

@modalReset
class MyModal extends React.Component {}

// App.jsx
<MyModal visible={modalVisible} />;
```

你也可以控制某次 open modal 的时候不重置这个 modal，方式是给组件传一个 disableReset 的 props

```jsx
<Foo disableReset={true} />
```

## License

MIT
