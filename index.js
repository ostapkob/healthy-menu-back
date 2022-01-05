const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {routes } = require('./src/routes')
const cors = require("cors");

const app = express()
const dbConfig = require('./src/config/db.config')
const appConfig = require('./src/config/app.config')

var corsOptions = {
  origin: appConfig.HOST
};

app.use(cors(corsOptions));

mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


routes.forEach(item => {
    console.log('-->', item)
    app.use(`/api/${item}`, require(`./src/routes/${item}`))
})
PORT = process.env.PORT || 9000

app.listen(PORT)
console.log(`Server running at ${PORT}`)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
