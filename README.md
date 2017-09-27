# Examples

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

# Tests

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

  it(`"onOpenedStateChange" should not be called third time, because prop doesn't change`, () => {
    wrapper.setProps({isOpened: false});
    expect(onOpenedStateChange.calledTwice).toBe(true);
  });
});
```
