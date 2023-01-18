const mongoose = require("mongoose");
require("../.env");
const env = require("dotenv");
env.config();
var mongoDBURL = process.env.MONGODBURL;
mongoose
  .connect(mongoDBURL, { useUnifiedtopology: true, useNewUrlParser: true })
  .then((data) => {
    console.log(
      `mongodb connected with server successfully: ${data.connection.port} `
    );
  });

module.exports = mongoose;
