
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GenreSchema = new Schema({
    title: {type: String, min: 4, max: 30, required: true },
    puzzles: [{type: Schema.Types.ObjectId, ref: "Puzzle"}]
})

    module.exports = mongoose.model("Genre", GenreSchema)


    