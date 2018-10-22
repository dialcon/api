'use strict';

const controllers = require('./controllers');

module.exports = (app) => {

  //tipos de pólizas
  app.get(`/v1/${process.env.SERVER_MODE_ENV}/tipo-polizas/:tipo_polizas_id([0-9a-fA-F]{24})`, controllers.TipoPolizas.get);
  app.get(`/v1/${process.env.SERVER_MODE_ENV}/tipo-polizas`, controllers.TipoPolizas.list);
  app.get(`/v1/${process.env.SERVER_MODE_ENV}/tipo-polizas/:count(count)`, controllers.TipoPolizas.list);
  app.post(`/v1/${process.env.SERVER_MODE_ENV}/tipo-polizas`, controllers.TipoPolizas.post);
  app.put(`/v1/${process.env.SERVER_MODE_ENV}/tipo-polizas/:tipo_polizas_id([0-9a-fA-F]{24})`, controllers.TipoPolizas.put);

  //clientes
  app.get(`/v1/${process.env.SERVER_MODE_ENV}/clientes/:cliente_id([0-9a-fA-F]{24})`, controllers.Clientes.get);
  app.get(`/v1/${process.env.SERVER_MODE_ENV}/clientes`, controllers.Clientes.list);
  app.get(`/v1/${process.env.SERVER_MODE_ENV}/clientes/:count(count)`, controllers.Clientes.list);
  app.post(`/v1/${process.env.SERVER_MODE_ENV}/clientes`, controllers.Clientes.post);
  app.put(`/v1/${process.env.SERVER_MODE_ENV}/clientes/:cliente_id([0-9a-fA-F]{24})`, controllers.Clientes.put);

};
