const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PuzzleSchema = new Schema({
    title: {type: String, min: 4, max: 30, required: true },
    genre: [{type: Schema.Types.ObjectId, ref: "Genre", required: true}],
    play_time: {type: Number, min: 5, max: 30},
    cells_per_side: {type: Number, min: 3, max: 8 },
    background_colors: {type: String},
    text_color: {type: String},
    featured: {type: Boolean, required: true}
    
})

    module.exports = mongoose.model("Puzzle", PuzzleSchema)

