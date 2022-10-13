const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
const env = require("dotenv");
require('./Database/Connection');
env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001
app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on ${PORT}`)
})