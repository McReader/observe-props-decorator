# Changelog

## 1.1.0-beta (2018-11-21)
  Documentation improved.

## 1.1.0-beta (2018-11-20)
  ### New Dependencies:
  - rollup: ^0.67.3,
  - rollup-plugin-babel: ^4.0.3,
  - rollup-plugin-commonjs": ^9.2.0,
  - rollup-plugin-node-resolve": ^3.4.0

### Removed Dependencies:
  - gulp: ^4.0.0,
  - gulp-babel: ^8.0.0,
  - gulp-concat: ^2.6.1,
  - gulp-sourcemaps: ^2.6.4,

## 1.1.0-beta (2018-11-11)
  React's "componentWillReceiveProps" is deprecated and will be removed with React v17.
  Since now, Observe-Props-Decorator uses "componentDidUpdate" lifecycle hook under the hood
  instead of "componentWillReceiveProps".

## 1.1.0-beta (2018-11-08)

### Migrate to RxJS v6:
  - use pipeable operators
  - update use of Observales and Observer creation

### New Dependencies:
  - rxjs: ^6.3.3

### Removed Dependencies:
  -  rx-lite: ^4.0.8

## 1.1.0-beta (2018-11-08)
  Since Jest has all we need to mock and spy on functions, there is no need to use Sinon
  and keep it in the dependencies.

### Remove Dependencies
  - sinon

## 1.1.0-beta (2018-11-06)

### Update Dependencies:
  - @babel/core: ^7.1.2,
  - @babel/plugin-proposal-class-properties: ^7.1.0,
  - @babel/plugin-proposal-decorators: ^7.1.2,
  - @babel/preset-env: ^7.1.0,
  - @babel/preset-react: ^7.0.0,
  - babel-core: ^7.0.0-bridge.0,
  - babel-jest: ^23.4.2,
  - enzyme: ^3.7.0,
  - enzyme-adapter-react-16: ^1.6.0,
  - gulp: ^4.0.0,
  - gulp-babel: ^8.0.0,
  - gulp-sourcemaps: ^2.6.4,
  - jest: ^23.6.0,
  - jest-enzyme: ^7.0.1,
  - prop-types: ^15.6.2,
  - react-test-renderer: ^16.6.0,
  - sinon: ^16.6.0,
  - react: ^16.6.0,
  - react-dom: ^16.6.0

### New Dependencies:
  - enzyme-adapter-react-16: ^1.6.0 since it's required by enzyme >=3

### Stability:
  - add package-lock.json