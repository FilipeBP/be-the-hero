const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * O request guarda todos os dados através da requisação desejada (GET, POST, ...), seja realizada por query, etc
 * O response é responsável por retornar uma resposta ao usuário
 */
routes.post('/sessions', SessionController.create);

routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);


routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;
