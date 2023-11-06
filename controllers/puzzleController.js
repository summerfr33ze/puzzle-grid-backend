const Puzzle = require("../models/puzzle")
const Comment = require("../models/comment")


exports.current_puzzle_get = (req, res) => {
    const currentPuzzle = Puzzle.findById(req.params.puzzleId)
    .populate("genre")
    .exec()
}

exports.comment_create_post = (req,res) => {

}

exports.create_post = async (req,res) => {
    const newPuzzle = new Puzzle({
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        play_time: req.body.play_time,
        cells_per_side: req.body.cells_per_side,
        data_array: req.body.data_array,
        colorOne: req.body.colorOne,
        colorTwo: req.body.colorTwo,
        featured: req.body.featured
    }
    )
    await newPuzzle.save()

}
