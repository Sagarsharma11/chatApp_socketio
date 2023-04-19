const mongoose  = require("mongoose");
const { Schema } = require("mongoose");

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('user',user)