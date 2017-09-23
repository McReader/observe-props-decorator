import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DropDown from './DropDown';
import DropDownItem from './DropDownItem';


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

