const mongoose = require("mongoose");
require("../.env");
const env = require("dotenv");
env.config();
// mongodb+srv://zubair:<PPzKNLjGxUL2kodH>@cluster0.qcg9aiu.mongodb.net/test
var mongoDBURL = process.env.MONGODBURL;
mongoose
  .connect(mongoDBURL, { useUnifiedtopology: true, useNewUrlParser: true })
  .then((data) => {
    console.log(
      `mongodb connected with server successfully: ${data.connection.port} `
    );
  });

module.exports = mongoose;
