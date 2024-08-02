const mongoose = require('mongoose');

module.exports.connect = async () => {
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("kết nối database thành công ^^");
    }
    catch(error){
        console.log("kết nối database thất bại");
    }
}