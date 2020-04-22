class RandomGeoCoordinatesController {

    async generateRandomGeoCoordinates(req, res) {
        let { latitude, longitude, radius, products } = req.body,
            number_random_point = ( radius / 100 ) * 5,
            randomArray = [];

        let productsArray = products.split(',').map(item => item.trim());
        
        let sexArray = ['Masculino', 'Feminino', 'Outros'];

        for (let i = 0; i < number_random_point; i++) {
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
                    'age': Math.floor(Math.random() * 63 + 13)
                };
            }
            randomArray.push(random(latitude, longitude, radius));
        }

        return res.json({
            success: true,
            data: randomArray
        });
    }
}

module.exports = new RandomGeoCoordinatesController();