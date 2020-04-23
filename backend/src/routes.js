const express = require('express');
const routes = express.Router();
const config = require('./config/mongoose');
const cors = require('cors');

const GeneratePeopleController = require('./controllers/GeneratePeople');
const RandomGeoCoordinatesController = require('./controllers/RandomGeoCoordinatesController');

express.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
  
express.use(cors({ credentials: true, origin: true }));

routes.post('/generate-people', GeneratePeopleController.generatePeople);
routes.post('/random-geo-coordinates', RandomGeoCoordinatesController.generateRandomGeoCoordinates);

module.exports = routes;