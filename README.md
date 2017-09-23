# Examples

DropDownContainer.jsx
```javascript
export default class DropDownContainer extends PureComponent {
  static propTypes = {
    onOpenedStateChange: PropTypes.func,
  };

  static defaultProps = {
    onOpenedStateChange: null,
  };

  state = {
    isOpened: false,
  };

  render() {
    const { onOpenedStateChange } = this.props;
    const { isOpened } = this.state;

    return (
      <DropDown
        isOpened={isOpened}
        onClick={() => this.toggleDropDown()}
        onOpenedStateChange={onOpenedStateChange}
      >
        <DropDownItem>
          Item 1
        </DropDownItem>
        <DropDownItem>
          Item 2
        </DropDownItem>
        <DropDownItem>
          Item 3
        </DropDownItem>
      </DropDown>
    )
  }

  /**
   * @param {boolean} isOpened
   * */
  toggleDropDown = (isOpened = !this.state.isOpened) => this.setState({ isOpened });
}
```

DropDown.jsx
```javascript
@watchProps
export default class DropDown extends PureComponent {
  static propTypes = {
    isOpened: PropTypes.bool,
    onClick: PropTypes.func,
    onOpenedStateChange: PropTypes.func,
  };

  static defaultProps = {
    isOpened: false,
    onClick: null,
    onOpenedStateChange: null,
  };

  render() {
    const { children, isOpened, onClick } = this.props;

    return (
      <ul
        onClick={onClick}
      >
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
    <DropDownContainer
      onOpenedStateChange={onOpenedStateChange}
    />
  );
  const dropDown = wrapper.find(DropDown);

  it(`"onOpenedStateChange" should be called once`, () => {
    dropDown.simulate('click');
    expect(onOpenedStateChange.calledOnce).toBe(true);
  });

  it(`"onOpenedStateChange" should be called twice`, () => {
    dropDown.simulate('click');
    expect(onOpenedStateChange.calledTwice).toBe(true);
  });
});
```
