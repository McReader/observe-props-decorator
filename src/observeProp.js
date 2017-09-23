import { IS_PROP_LISTENER, PROP_KEY } from './constants';


export default function observeProp(propName) {
  return (targetFn, name, descriptor) => {
    const newValue = descriptor.value;

    Object.defineProperties(newValue, {
      [IS_PROP_LISTENER]: {
        value: true,
        enumerable: false,
      },
      [PROP_KEY]: {
        value: propName,
        enumerable: false,
      }
    });

    return {
      value: newValue,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
    }
  };
}
