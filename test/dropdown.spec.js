import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { DropDownContainer, DropDown } from './stubs'


describe('simpleKeySelector.spec.js', () => {
  const onOpenedStateChange = sinon.spy();

  const wrapper = mount(
    <DropDownContainer
      onOpenedStateChange={onOpenedStateChange}
    />
  );
  const dropDown = wrapper.find(DropDown);

  it(`Click should trigger an props update, and method marked by @onPropChange decorator should be invoked`, () => {
    dropDown.simulate('click');
    expect(onOpenedStateChange.calledOnce).toBe(true);
  });

  it(`Click should trigger an props update, and method marked by @onPropChange decorator should be invoked one more time`, () => {
    dropDown.simulate('click');
    expect(onOpenedStateChange.calledTwice).toBe(true);
  });
});
