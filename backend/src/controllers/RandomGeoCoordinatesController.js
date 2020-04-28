const fs = require('fs').promises;
const assetsPath = 'src/assets/';

const RandomGeoCoordinates = require('../models/RandomGeoCoordinates');

class RandomGeoCoordinatesController {

    async generateRandomGeoCoordinates(req, res) {
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
            
            let fileName = await RandomGeoCoordinatesController.saveJson(randomArray)
                                                               .catch((error) => console.log(error));

            const location = {
                type: 'Point',
                coordinates: [Number(longitude), Number(latitude)]
            }
            
            await RandomGeoCoordinates.create({
                location: location,
                radius: radius,
                products: productsArray,
                file_name: fileName
            }, function (error) {
                console.log(error);
            });

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
        return new Promise(async (resolve, reject) => {
            const json = await fs.readFile(assetsPath + jsonName, 'utf8')
                                 .catch(reject('Unable to write ' + jsonName));
            resolve(json);
        });
    };

    static async saveJson(data) {
        return new Promise(async (resolve, reject) => {
            let jsonName = Date.now() + '.json';

            await fs.writeFile(assetsPath + jsonName, JSON.stringify(data), 'utf8')
                    .then(resolve(jsonName))
                    .catch(reject('Unable to write ' + jsonName));
        });
    }
}

module.exports = new RandomGeoCoordinatesController();