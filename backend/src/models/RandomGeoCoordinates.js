const mongoose = require('mongoose');

const PointSchema = require('./utils/PointSchema');

const RandomGeoCoordinates = mongoose.Schema({
    location: {
        type: PointSchema,
        index: '2dsphere',
        required: false
    },
    radius: {
        type: String,
        required: false
    },
    products: {
        type: [String],
        required: false
    },
    file_name: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('RandomGeoCoordinates', RandomGeoCoordinates);