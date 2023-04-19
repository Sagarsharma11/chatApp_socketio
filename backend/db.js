const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/ChatApp'

const dbconnect = () => {
    mongoose.connect(url)
    .then(console.log('connected db successfully'))
}


module.exports = dbconnect

