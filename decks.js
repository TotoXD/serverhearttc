const mongo = require("mongoose");

const Schema = mongo.Schema;

const deckSchema = new Schema({
    race: {
        type: String,
        required: true,
        unique: true,
    }
});


const Deck = mongo.model("decks", deckSchema);

module.exports = Deck;