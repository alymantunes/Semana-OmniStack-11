const express = require('express');

const routes = express.Router();

const OngsController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.post('/ongs', OngsController.create);
routes.get('/ongs', OngsController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/profiles', IncidentController.index);
routes.get('/incidents', IncidentController.indexall);
routes.delete('/incidents/:id',IncidentController.delete )

module.exports = routes;