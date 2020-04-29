const express = require('express');
const routes = express.Router();
const config = require('./config/mongoose');

const { body } = require('express-validator');

const RandomGeoCoordinatesController = require('./controllers/RandomGeoCoordinatesController');

routes.post('/random-geo-coordinates', [
    body('latitude')
        .not().isEmpty(), 
    body('longitude')
        .not().isEmpty(),
    body('city')
        .not().isEmpty(),
    body('radius')
        .not().isEmpty(), 
    body('products')
        .not().isEmpty()
], RandomGeoCoordinatesController.generateRandomGeoCoordinates);

module.exports = routes;