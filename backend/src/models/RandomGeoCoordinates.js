const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PointSchema = require('./utils/PointSchema');

const RandomGeoCoordinates = new Schema({
    location: {
        type: PointSchema,
        index: '2dsphere',
        required: true
    },
    radius: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        required: true
    },
    file_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RandomGeoCoordinates', RandomGeoCoordinates);