import React, { PureComponent } from 'react';
import { Observable, Observer, Subject } from 'rx-lite';

import { createSelectorForFunction, throwError } from './utils';
import { IS_PROP_LISTENER, PROP_KEY } from './constants';


export default function watchProps(TargetComponent) {
  return class WatchPropsWrapper extends PureComponent {
    propsChange$ = new Subject();

    constructor(props) {
      super(props);
      this.startWatch();
    }

    startWatch = () => {
      const protoKeys = Object.getOwnPropertyNames(TargetComponent.prototype);

      this.filterListeners(protoKeys)
        .subscribe(
          (listener) => {
            const propSelector = createSelectorForFunction(listener);

            this.propsChange$
              .map(propSelector)
              .distinctUntilChanged()
              .subscribe(this.createObserver(propSelector, listener));
          },
          throwError,
        );
    };

    /**
     * Create an observable which emits only "prop listener" methods
     * @param {string[]} protoKeys
     * @return {Observable<Function>}
     * */
    filterListeners = protoKeys =>
      Observable
        .from(protoKeys)
        .map(name => TargetComponent.prototype[name])
        .filter(method => method[IS_PROP_LISTENER]);

    /**
     * Create an observable which emits only "prop listener" methods
     * @param {Function} propSelector
     * @param {Function} fn -
     * @return {Observable<Function>}
     * */
    createObserver = (propSelector, fn) =>
      Observer.create(
        (next) => {
          const prev = propSelector(this.props);
          fn.call(this, next, prev);
        },
        throwError,
      );

    componentWillReceiveProps(nextProps) {
      this.propsChange$.onNext(nextProps);
    }

    componentWillUnmount() {
      this.propsChange$.onCompleted();
    }

    render() {
      return (
        <TargetComponent
          {...this.props}
        />
      )
    }
  };
}
