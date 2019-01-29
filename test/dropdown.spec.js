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
    expect(onOpenedStateChangeSpy).toHaveBeenCalledWith(true, undefined);
  });

  it(`"onOpenedStateChange" should be called twice`, () => {
    wrapper.setProps({isOpened: false});
    expect(onOpenedStateChangeSpy).toHaveBeenCalledTimes(2);
    expect(onOpenedStateChangeSpy).toHaveBeenCalledWith(false, true);
  });

  it(`"onOpenedStateChange" should not be called third time, because the prop hasn't been changed`, () => {
    wrapper.setProps({isOpened: false});
    expect(onOpenedStateChangeSpy).toHaveBeenCalledTimes(2);
  });
  
  it(`"onOpenedStateChange" should be called third time`, () => {
    wrapper.setProps({isOpened: true});
    expect(onOpenedStateChangeSpy).toHaveBeenCalledTimes(3);
    expect(onOpenedStateChangeSpy).toHaveBeenCalledWith(false, true);
  });
});
