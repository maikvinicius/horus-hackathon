
const express = require('express');

const app = express();

const server = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

server.listen(process.env.PORT || 5000);