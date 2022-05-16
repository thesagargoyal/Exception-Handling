const mongoose = require('mongoose');
require("dotenv").config();
module.exports = connect = async () => {
    try{
        const response = await mongoose.connect(process.env.URL, {useNewUrlParser: true});
        console.log("Yes Your Connection Is Established");
    }catch(error){
        console.log(error);
    }
}