const mongoose = require('mongoose');

let petSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    place: String,
    gender: String
})

let petModel = mongoose.model('DogFair',petSchema);

module.exports = {
    petModel
}