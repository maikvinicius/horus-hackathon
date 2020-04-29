const fs = require('fs');
const { validationResult } = require('express-validator');
const assetsPath = 'src/assets/';

const RandomGeoCoordinates = require('../models/RandomGeoCoordinates');

class RandomGeoCoordinatesController {

    async generateRandomGeoCoordinates(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                success: false,
                errors: errors.array()
            });
        }

        var { latitude, longitude, radius, products } = req.body,
            numberRandomPoints = ( radius / 100 ) * 5,
            returnData = [];

        let productsArray = products.split(',').map(item => item.trim());

        let searchData = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                }
            },
            radius,
            products: { $all: productsArray }
        };

        const requestParams = await RandomGeoCoordinates.findOne(searchData);
        
        if (requestParams) {
            returnData = await RandomGeoCoordinatesController.jsonSaved(requestParams.file_name)
                                                             .catch((error) => console.log(error));
        } else {
            let randomArray = await RandomGeoCoordinatesController.randomCoordinates(longitude, latitude, radius, productsArray, numberRandomPoints);
            
            let fileName = Date.now() + '.json';

            const location = {
                type: 'Point',
                coordinates: [Number(longitude), Number(latitude)]
            }

            await RandomGeoCoordinates.create({
                location: location,
                radius: radius,
                products: productsArray,
                file_name: fileName
            }, (error) => {
                console.log(error);
            });

            await RandomGeoCoordinatesController.saveJson(fileName, randomArray)
                                                .catch((error) => console.log(error));

            returnData = randomArray;
        }

        return res.json({
            success: true,
            data: returnData
        });
    }

    static async randomCoordinates(longitude, latitude, radius, productsArray, numberRandomPoints) {
        let tempArray = [],
            sexArray = ['Masculino', 'Feminino', 'Outros'];

        for (let i = 0; i < numberRandomPoints; i++) {
            let random = (latitude, longitude, radius) => {
                let y0 = Number(latitude);
                let x0 = Number(longitude);
                let rd = Number(radius) / 111300;
            
                let u = Math.random();
                let v = Math.random();
            
                let w = rd * Math.sqrt(u);
                let t = 2 * Math.PI * v;
                let x = w * Math.cos(t);
                let y = w * Math.sin(t);
            
                let newlat = y + y0;
                let newlon = x + x0;
            
                return {
                    'latitude': newlat.toFixed(5),
                    'longitude': newlon.toFixed(5),
                    'product': productsArray[Math.floor(Math.random() * productsArray.length)],
                    'sex': sexArray[Math.floor(Math.random() * sexArray.length)],
                    'age': Math.floor(Math.random() * 60 + 13)
                };
            }
            tempArray.push(random(latitude, longitude, radius));
        }

        return tempArray;
    }

    static async jsonSaved(jsonName) {
        try {
            const json = await fs.readFileSync(assetsPath + jsonName, 'utf8');
            return JSON.parse(json);
        } catch(error) {
            console.log(error);
            return false;
        }
    };

    static async saveJson(jsonName, data) {
        try {
            return await fs.writeFileSync(assetsPath + jsonName, JSON.stringify(data), 'utf8');
        } catch(error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new RandomGeoCoordinatesController();