const mongoose = require('mongoose');
require('../.env')
const env = require("dotenv");
env.config();
// mongodb+srv://zubair:<PPzKNLjGxUL2kodH>@cluster0.qcg9aiu.mongodb.net/test
var mongoDBURL = 'mongodb+srv://zubairkhan:PPzKNLjGxUL2kodH@cluster0.kop9x3h.mongodb.net/test'
mongoose.connect(mongoDBURL , {useUnifiedtopology :true , useNewUrlParser : true}).then((data)=>{
    console.log(`mongodb connected with server successfully: ${data.connection.port} `);
})
// mongodb+srv://zubairkhan:<password>@cluster0.kop9x3h.mongodb.net/test
module.exports = mongoose;