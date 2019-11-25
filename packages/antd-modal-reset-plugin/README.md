# antd-modal-reset-plugin

## introduction

我们在使用 antd-modal 的时候，经常需要在关闭的时候来清除这个 modal 里面的状态值。为了达到目的很多人会这样做：

```jsx
// App.jsx
{ modalVisible && <MyModal /> }
```

这样的缺点是，当modalVisible由true变为false的时候，MyModal会立刻被销毁，从而没有退场动画。

antd-modal-reset-plugin 可以帮助我们解决这个问题。

## Usage

```bash
npm i --save antd-modal-reset-plugin
```

```js
// MyModal.jsx
import modalReset from "antd-modal-reset-plugin";

@modalReset
class MyModal extends React.Component {}


// App.jsx
<MyModal  visible={modalVisible} />
```

你也可以控制某次 close modal 后不销毁这个 modal，方式是给传一个 disableReset 的 props

```jsx
<Foo disableReset={true} />
```

## License

MIT
