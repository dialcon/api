'use strict';
var request = require('request');
var config = require(`${_path}/config`);
var listErrors = require(`${_path}/libs/errors`);

exports.deactivate = (req, res, next) => {
  req.params.module = req.params.module.replace(/-/g, '_');
  request.delete({
    url: `${config.url_gate}/v1/${config.app}/${req.params.module}/${req.params.id}`,
    json: true,
    headers: {
      'apikey': config.apikey.key
    }
  }, (err, result, body) => {
    if (err) {
      return listErrors(500, res);
    }
    res.status(result.statusCode).send(body);
  });
};

exports.activate = (req, res, next) => {
  req.params.module = req.params.module.replace(/-/g, '_');
  request.put({
    url: `${config.url_gate}/v1/activate/${config.app}/${req.params.module}/${req.params.id}`,
    json: true,
    headers: {
      'apikey': config.apikey.key
    }
  }, (err, result, body) => {
    if (err) {
      return listErrors(500, res);
    }
    res.status(result.statusCode).send(body);
  });
};