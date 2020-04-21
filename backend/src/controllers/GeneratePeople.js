const axios = require('axios');
const Querystring = require('querystring');
const axios4Devs = 'https://www.4devs.com.br/ferramentas_online.php';

class GeneratePeopleController {

    async generatePeople(req, res) {
        var responseData;
        let { acao, sexo, pontuacao, idade, uf, qtd, id_cidade } = req.body;

        let axiosBody = {
            acao: acao,
            sexo: sexo,
            pontuacao: pontuacao,
            idade: idade,
            cep_estado: uf,
            txt_qtde: qtd,
            cep_cidade: id_cidade
        };

        let axiosHeaders = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };

        let requests = [
            axios.post(axios4Devs, Querystring.stringify(axiosBody), axiosHeaders),
            axios.post(axios4Devs, Querystring.stringify(axiosBody), axiosHeaders),
            axios.post(axios4Devs, Querystring.stringify(axiosBody), axiosHeaders),
        ];

        await axios.all(requests)
        .then(axios.spread((responseOne, responseTwo, responseThree) => {
            responseData = responseOne.data;
            return res.json({
                success: true,
                data: [
                    responseOne.data,
                    responseTwo.data,
                    responseThree.data
                ]
            });
        }))
        .catch((response) => {
            return res.json({
                success: false,
                data: response.data
            });
        });
    }
}

module.exports = new GeneratePeopleController();