const express = require('express');
const routes = express.Router();
const config = require('./config/mongoose');

const HelloWorldController = require('./controllers/HelloWorldController');

routes.get("/", HelloWorldController.getHelloWorld);

module.exports = routes;