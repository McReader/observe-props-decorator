import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { DropDown } from './stubs'


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
