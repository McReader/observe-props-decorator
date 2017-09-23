import get from 'lodash.get';

import { PROP_KEY } from '../constants';


/**
 * @param {Function} fn
 * @return {Function} selector
 * */
export default function createSelectorForFunction(fn) {
  const propKey = fn[PROP_KEY];

  if (propKey) {
    return (props) => get(props, propKey);
  }

  return null;
}
