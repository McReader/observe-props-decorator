# Observe-props-decorator (DEPRECATED since React team announced the Effect Hook)
  - motivation;
  - overview;
  - usage proposals;
  - examples;
  - tests.

## Motivation
  While working with complex components you may often need to trigger side affects (such as function
  calls, data fething etc.) when the component's props are changed. It is not a big deal to watch a
  single prop and react to it's changes in "componentWillReceiveProps" or "componentDidUpdate".
  
  However, as the amount of such props grows, you will likely be trapped by a really huge annoying
  routine of growing your "componentWillReceiveProps" or "componentDidUpdate".
  Imagine, what it will look like when you have 10 such props? What a mess, isn't it?

## Overview
  **Observe-props-decorator** lets you get rid of all this routine! Just tell a component (class)
  that it's props will be observed. Then declare a method which will be invoked when the
  property's value has changed. And that's it!
  **See the example below!**

  > *You don't even have to warry whether you observe a PureComponent or a Component.*
  > *Observe-props-decorator will handle any case correctly!*

## Usage proposals
  ### As a Wrapper Function
  Do
  ```javascript
  import { observeProps } from 'observe-props-decorator';
  ```
  and give it your component as the first argument.

  ### Via Annotations '@annotation' (recommended)
  To use annotations you need to install *"@babel/plugin-proposal-decorators"*
  ```
  npm install --save-dev @babel/plugin-proposal-decorators
  ```
  and update your *.babelrc file*
  ```javascript
  "plugins": [
    [ "@babel/plugin-proposal-decorators", { "legacy": true } ],
    [ "@babel/plugin-proposal-class-properties", { "loose": true } ]
  ]
  ```
  Although it's not a requirement, you can see that we also use *"@babel/plugin-proposal-class-properties"*.

## Examples
### As a Wrapper Function
DropDown.jsx
```javascript
// DropDown declaration with a prop "isOpened"

observeProp('isOpened')(DropDown.prototype, 'onIsOpenedPropChange', Object.getOwnPropertyDescriptor(DropDown.prototype, 'onIsOpenedPropChange'));

export default observeProps(DropDown);
```
### Via annotations
DropDown.jsx
```javascript
@observeProps
export default class DropDown extends PureComponent {
  static propTypes = {
    isOpened: PropTypes.bool,
    onOpenedStateChange: PropTypes.func,
  };

  static defaultProps = {
    isOpened: false,
    onOpenedStateChange: null,
  };

  render() {
    const { children, isOpened } = this.props;

    if (!isOpened) return null;

    return (
      <ul>
        {children}
      </ul>
    )
  }

  @observeProp('isOpened')
  onIsOpenedPropChange(next, prev) {
    const { onOpenedStateChange } = this.props;
    if (onOpenedStateChange) onOpenedStateChange(next, prev);
  }
}
```

## Tests

```javascript
describe('DropDown observing "isOpened" prop. As soon as this prop changed, "onOpenedStateChange" callback should be called', () => {
  const onOpenedStateChange = sinon.spy();

  const wrapper = mount(
    <DropDown
      onOpenedStateChange={onOpenedStateChange}
    />
  );

  it(`"onOpenedStateChange" should be called once`, () => {
    wrapper.setProps({isOpened: true});
    expect(onOpenedStateChange.calledOnce).toBe(true);
  });

  it(`"onOpenedStateChange" should be called twice`, () => {
    wrapper.setProps({isOpened: false});
    expect(onOpenedStateChange.calledTwice).toBe(true);
  });

  it(`"onOpenedStateChange" should not be called third time, because the prop hasn't been changed`, () => {
    wrapper.setProps({isOpened: false});
    expect(onOpenedStateChange.calledTwice).toBe(true);
  });

  it(`"onOpenedStateChange" should be called third time`, () => {
    wrapper.setProps({isOpened: true});
    expect(onOpenedStateChangeSpy).toHaveBeenCalledTimes(3);
    expect(onOpenedStateChangeSpy).toHaveBeenCalledWith(false, true);
  });
});
```
