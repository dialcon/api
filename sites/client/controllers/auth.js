'use strict';
var listErrors = require(`${_path}/libs/errors`);

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return listErrors(401, res);
  }
};