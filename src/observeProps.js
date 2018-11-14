import React, { PureComponent } from 'react';

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

      from(this.filterListeners(protoKeys))
        .subscribe({
          next: (listener) => {
            const propSelector = createSelectorForFunction(listener);

            this.propsChange$.pipe(
              distinctUntilChanged((p, q) => propSelector(p.next) === propSelector(q.next)),
              map(({ next, prev }) => ({ next: propSelector(next), prev: propSelector(prev) })),
            )
            .subscribe(this.createObserver(listener));
          },
          error: throwError,
        });
    };

    /**
     * Filter and emit only "prop listener" methods
     * @param {string[]} protoKeys
     * @return {Function[]}
     * */
    filterListeners = protoKeys =>
      protoKeys
        .map(name => TargetComponent.prototype[name])
        .filter(method => method[IS_PROP_LISTENER]);

    /**
     * Create an observer which calls PROP_LISTENER function with next and prev props
     * @param {Function} propSelector
     * @param {Function} fn -
     * @return {Observable<Function>}
     * */
    createObserver = fn =>
      ({
        next: ({ next, prev }) =>
          fn.call(this, next, prev),
        error: throwError,
      });

    componentDidUpdate(prevProps) {
      this.propsChange$.next({
        next: this.props,
        prev: prevProps
      });
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
