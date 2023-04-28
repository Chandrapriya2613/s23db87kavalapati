const mongoose = require("mongoose")
const rabbitSchema = mongoose.Schema({
    //breed: String,
    //color: String,
    //price: Number
    breed: {
        type: String,
        required: true

    },
    color: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true,
        min : 0,
        max : 100

    }
})

module.exports = mongoose.model("Rabbit",
    rabbitSchema)