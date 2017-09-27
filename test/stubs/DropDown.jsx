import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { observeProp, observeProps } from '../../src';


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
