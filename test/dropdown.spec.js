import React from 'react';
import { mount } from 'enzyme';

import { DropDown } from './stubs'


describe('DropDown observing "isOpened" prop. As soon as this prop changed, "onOpenedStateChange" callback should be called', () => {
  const onOpenedStateChangeSpy = jest.fn();

  const wrapper = mount(
    <DropDown
      onOpenedStateChange={onOpenedStateChangeSpy}
    />
  );

  it(`"onOpenedStateChange" should be called once`, () => {
    wrapper.setProps({isOpened: true});
    expect(onOpenedStateChangeSpy).toHaveBeenCalledTimes(1);
  });

  it(`"onOpenedStateChange" should be called twice`, () => {
    wrapper.setProps({isOpened: false});
    expect(onOpenedStateChangeSpy).toHaveBeenCalledTimes(2);
  });

  it(`"onOpenedStateChange" should not be called third time, because prop doesn't change`, () => {
    wrapper.setProps({isOpened: false});
    expect(onOpenedStateChangeSpy).toHaveBeenCalledTimes(2);
  });
});
