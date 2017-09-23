import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { observeProp, watchProps } from '../../src';


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

