const express = require('express');
const routes = express.Router();
const config = require('./config/mongoose');
const cors = require('cors');

const GeneratePeopleController = require('./controllers/GeneratePeople');
const RandomGeoCoordinatesController = require('./controllers/RandomGeoCoordinatesController');

routes.use(cors({ credentials: true, origin: true }));

routes.post('/generate-people', GeneratePeopleController.generatePeople);
routes.post('/random-geo-coordinates', RandomGeoCoordinatesController.generateRandomGeoCoordinates);

module.exports = routes;