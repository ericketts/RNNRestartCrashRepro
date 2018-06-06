// @flow

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
require('core-js/fn/array/includes');

// process.nextTick polyfill
/* eslint-disable no-global-assign */
if (typeof process === 'undefined' || process == null) process = {};
if (process.nextTick == null) process.nextTick = (setImmediate: any);

// Date.now polyfill
require('core-js/modules/es6.date.now');
