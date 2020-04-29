const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

server.listen(process.env.PORT || 5000);