# antd-modal-reset-plugin

## introduction

我们在使用 antd-modal 的时候，经常需要在关闭的时候来清除这个 modal 里面的状态值。
antd-modal-reset-plugin 可以帮助我们简单的实现这一点

## Usage

```bash
npm i --save antd-modal-reset-plugin
```

```js
import modalReset from "antd-modal-reset-plugin";

@modalReset
class Foo extends React.Component {}
```

你也可以选择在某个 close modal 后不销毁这个 modal，方式是给 antd-modal-reset-plugin 传一个 disableReset 的 props

```jsx
<Foo disableReset={true} />
```

## License

MIT
