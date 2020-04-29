const fs = require('fs');
const axios = require('axios');
const weightedRandom = require('weighted-random');
const { validationResult } = require('express-validator');

const assetsPath = 'src/assets/';
const ibgeUrl = 'http://api.sidra.ibge.gov.br/values/t/1301/p/2010/v/616/n6/';

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

        let { latitude, longitude, city, radius, products } = req.body,
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
            products: {
                $size: productsArray.length,
                $all: productsArray
            }
        };

        const requestParams = await RandomGeoCoordinates.findOne(searchData);

        if (requestParams) {
            returnData = await RandomGeoCoordinatesController.jsonSaved(requestParams.file_name)
                .catch((error) => console.log(error));
        } else {
            let demoDensity = await RandomGeoCoordinatesController.demographicDensity(city);

            let amountPoints = demoDensity * (radius / 1000) * (Math.floor(Math.random() * 19 + 1) / 100);
            
            let randomArray = await RandomGeoCoordinatesController.randomData(longitude, latitude, radius, productsArray, amountPoints);

            let fileName = Date.now() + '.json';

            let location = {
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

    static async randomData(longitude, latitude, radius, productsArray, amountRandomPoints) {
        let dataArray = [],
            qtSex = Math.floor(Math.random() * 70);

        let sexArray = [
            { weight: qtSex, sex: 'Masculino' },
            { weight: 80 - qtSex, sex: 'Feminino' },
            { weight: 20, sex: 'Outros' }
        ];

        let weights = sexArray.map((sex) => {
            return sex.weight;
        }); 

        for (let i = 0; i < amountRandomPoints; i++) {
            let randomObject = (latitude, longitude, radius) => {
                let y0 = Number(latitude),
                    x0 = Number(longitude),
                    rd = Number(radius) / 111300;

                let u = Math.random(),
                    v = Math.random();

                let w = rd * Math.sqrt(u),
                    t = 2 * Math.PI * v,
                    x = w * Math.cos(t),
                    y = w * Math.sin(t);

                let newlat = y + y0,
                    newlon = x + x0;

                return {
                    'latitude': newlat.toFixed(5),
                    'longitude': newlon.toFixed(5),
                    'product': productsArray[Math.floor(Math.random() * productsArray.length)],
                    'sex': sexArray[weightedRandom(weights)].sex,
                    'age': Math.floor(Math.random() * 60 + 13)
                };
            }
            dataArray.push(randomObject(latitude, longitude, radius));
        }

        return dataArray;
    }

    static async jsonSaved(jsonName) {
        try {
            return JSON.parse(await fs.readFileSync(assetsPath + jsonName, 'utf8'));
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async saveJson(jsonName, data) {
        try {
            return await fs.writeFileSync(assetsPath + jsonName, JSON.stringify(data), 'utf8');
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async demographicDensity(cityName) {
        let ibgeCodesJson = JSON.parse(await fs.readFileSync(assetsPath + 'ibge_codes.json', 'utf8'));

        let ibgeCode = Object.keys(ibgeCodesJson).find(key => ibgeCodesJson[key] == cityName);

        let url = ibgeUrl + ibgeCode;

        return await axios.get(url)
            .then((response) => {
                return response.data[1].V;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }
}

module.exports = new RandomGeoCoordinatesController();