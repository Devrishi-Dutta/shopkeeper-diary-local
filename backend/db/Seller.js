const mongoose= require('mongoose');

const sellerSchema= new mongoose.Schema({
    name:String,
    contact:String,
    paymentDue:String,
    userId:String,
    company:String
});

module.exports =mongoose.model("sellers",sellerSchema);