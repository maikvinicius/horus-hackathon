const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hackathon:hackathon123@cluster0-7qcgd.mongodb.net/hackathon?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('Conectado com sucesso!'))
    .catch(error => console.log(error));