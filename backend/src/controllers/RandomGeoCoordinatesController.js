const fs = require('fs');
const assetsPath = 'src/assets/';

const RandomGeoCoordinates = require('../models/RandomGeoCoordinates');

class RandomGeoCoordinatesController {

    async generateRandomGeoCoordinates(req, res) {
        let { latitude, longitude, radius, products } = req.body,
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
            returnData = await RandomGeoCoordinatesController.jsonSaved(requestParams.file_name);
        } else {
            let randomArray = await RandomGeoCoordinatesController.randomCoordinates(longitude, latitude, radius, productsArray, numberRandomPoints);
    
            let fileName = await RandomGeoCoordinatesController.saveJson(randomArray);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            await RandomGeoCoordinates.create({
                location,
                radius,
                products: productsArray,
                file_name: fileName
            });
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
                let y0 = parseInt(latitude);
                let x0 = parseInt(longitude);
                let rd = parseInt(radius) / 111300;
            
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
            return fs.readFileSync(assetsPath + jsonName, 'utf8', (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    static async saveJson(data) {
        try {
            let jsonName = Date.now() + '.json';

            fs.writeFileSync(assetsPath + jsonName, JSON.stringify(data), 'utf8', (error) => {
                console.log(error);
            });

            return jsonName;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new RandomGeoCoordinatesController();