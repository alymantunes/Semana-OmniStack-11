const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const routes = express.Router();

const OngsController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,OngsController.create);
routes.get('/ongs', OngsController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/profiles', IncidentController.index);
routes.get('/incidents', IncidentController.indexall);
routes.delete('/incidents/:id',IncidentController.delete )

module.exports = routes;