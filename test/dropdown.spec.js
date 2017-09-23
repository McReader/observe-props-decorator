import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { DropDownContainer, DropDown } from './stubs'


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
