// import React from 'react';
// import renderer from 'react-test-renderer';
import modalResetPlugin from '../index.tsx';

it('it is a function and return a reactdom', () => {
  expect(typeof modalResetPlugin).toBe('function');
});

// test('Link changes the class when hovered', () => {
//   const component = renderer.create(<div>1234</div>);
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
