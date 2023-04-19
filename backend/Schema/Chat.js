const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const chat = new Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now

    }
})

module.exports = mongoose.model('chat',chat)