const mongo = require("mongoose");

const Schema = mongo.Schema;

const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
        unique:true,
    },
    race: {
        type: String, 
        required: true,
    },
    cost: {
        type: Number, 
        required: true,
    },
    atk: {
        type: Number, 
        required: true,
    },
    def: {
        type: Number, 
        required: true,
    }
});


const Card = mongo.model("cards", cardSchema);

module.exports = Card;