const mongo = require("mongoose");

const Schema = mongo.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };

const userSchema = new Schema({
    mailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    pseudo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    currentDeck: {
        type: String,
        default: "Elfe",
        required: true,
    },
    totalGames: {
        type: Number,
        default: 0
    },
    totalWins: {
        type: Number,
        default: 0
    }
    },
    {timestamps: true}
    );

const User = mongo.model("users", userSchema);

module.exports = User;
