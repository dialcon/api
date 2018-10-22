'use strict';
global._ = require('lodash');
global.moment = require('moment-timezone');
global.async = require('async');
global.request = require('request');
global.config = require(`${_path}/config`);
global.listErrors = require(`${_path}/libs/errors`);


var vars = {
  _password_min: 6

};
_.forEach(vars, (v, i) => {
  global[i] = v;
});

global.cl = function (...args) {
  _.forEach(arguments, (arg) => {
    arg = JSON.stringify(arg);
  });
};
