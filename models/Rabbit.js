const mongoose = require("mongoose")
const rabbitSchema = mongoose.Schema({
    breed: String,
    color: String,
    price: Number
})
module.exports = mongoose.model("Rabbit",
    rabbitSchema)