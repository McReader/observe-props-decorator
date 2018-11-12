import React, { PureComponent } from 'react';
//* using exact import paths for rxjs significantly reduces bundle size
import { Subject } from 'rxjs/internal/Subject';
import { from } from 'rxjs/internal/observable/from';

import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

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
          {
            next: (listener) => {
              const propSelector = createSelectorForFunction(listener);

              this.propsChange$.pipe(
                map(propSelector),
                distinctUntilChanged(),
              )
              .subscribe(this.createObserver(propSelector, listener));
            },
            error: throwError,
          }
        );
    };

    /**
     * Create an observable which emits only "prop listener" methods
     * @param {string[]} protoKeys
     * @return {Observable<Function>}
     * */
    filterListeners = protoKeys =>
      from(protoKeys).pipe(
        map(name => TargetComponent.prototype[name]),
        filter(method => method[IS_PROP_LISTENER]),
      );

    /**
     * Create an observable which emits only "prop listener" methods
     * @param {Function} propSelector
     * @param {Function} fn -
     * @return {Observable<Function>}
     * */
    createObserver = (propSelector, fn) => (
      {
        next: (next) => {
          const prev = propSelector(this.props);
          fn.call(this, next, prev);
        },
        error: throwError,
      }
    );

    componentWillReceiveProps(nextProps) {
      this.propsChange$.next(nextProps);
    }

    componentWillUnmount() {
      this.propsChange$.complete();
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
