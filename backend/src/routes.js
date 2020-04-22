const express = require('express');
const routes = express.Router();
const config = require('./config/mongoose');

const GeneratePeopleController = require('./controllers/GeneratePeople');
const RandomGeoCoordinatesController = require('./controllers/RandomGeoCoordinatesController');

routes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes.post('/generate-people', GeneratePeopleController.generatePeople);
routes.post('/random-geo-coordinates', RandomGeoCoordinatesController.generateRandomGeoCoordinates);

module.exports = routes;