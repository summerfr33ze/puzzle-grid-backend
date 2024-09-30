const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PuzzleSchema = new Schema({
    title: {type: String, min: 4, max: 30, required: true },
    description: {type: String, min: 10, max: 1000, required: true},
    genre: {type: Schema.Types.ObjectId, ref: "Genre", required: true},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    play_time: {type: Number, max: 30},
    cells_per_side: {type: Number, min: 3, max: 8 },
    background_colors: {type: String},
    featured: {type: Boolean, required: true},
    data_array: {type: Array, required: true},
    color_one: {type: String},
    color_two: {type:String}
    
})

    module.exports = mongoose.model("Puzzle", PuzzleSchema)

