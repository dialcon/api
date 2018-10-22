'use strict';

var request = require('request');

var config = require(`${_path}/config`);

exports.get = (req, res, next) => {
  request.get({
    url: `${config.url_gate}/v1/${config.app}/clientes/${req.params.cliente_id}`,
    json: true,
    headers: {
      'apikey': config.apikey.key
    },
    qs: req.query
  }, (err, result, body) => {
    if (err || result.statusCode !== 200) {
      return res.status(result.statusCode).send(err || body);
    }
    res.status(result.statusCode).send(body);
  });
};



exports.list = (req, res, next) => {
  delete req.query._query;
  request.get({
    url: `${config.url_gate}/v1/${config.app}/clientes${req.params.count ? '/count' : ''}`,
    json: true,
    headers: {
      'apikey': config.apikey.key
    },
    qs: req.query
  }, (err, result, body) => {
    if (err || result.statusCode !== 200) {
      return res.status(result.statusCode).send(err || body);
    }
    res.status(result.statusCode).send(body);
  });
};

exports.post = (req, res, next) => {

  request.post({
    url: `${config.url_gate}/v1/${config.app}/clientes`,
    json: true,
    qs: req.query,
    headers: {
      'apikey': config.apikey.key
    },
    body: req.body
  }, (err, result, body) => {
    if (err || result.statusCode !== 200) {
      return res.status(result.statusCode).send(err || body);
    }
    res.status(result.statusCode).send(body);
  });

};

exports.put = (req, res, next) => {
  request.put({
    url: `${config.url_gate}/v1/${config.app}/clientes/${req.params.cliente_id}`,
    json: true,
    headers: {
      'apikey': config.apikey.key
    },
    qs: req.query
  }, (err, result, body) => {
    if (err || result.statusCode !== 200) {
      return res.status(result.statusCode).send(err || body);
    }
    res.status(result.statusCode).send(body);
  });
};
