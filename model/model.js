const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    mobile: {
        required: true,
        type: Number
    },
    countryCode: {
        required: true,
        type: String
    },
    countryName: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Data', dataSchema)