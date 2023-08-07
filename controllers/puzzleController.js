const Puzzle = require("../models/puzzle")
const Comment = require("../models/comment")


exports.current_puzzle_get = (req, res) => {
    const currentPuzzle = Puzzle.findById(req.params.puzzleId)
    .populate("genre")
    .exec()
}

exports.comment_create_post = (req,res) => {

}

exports.create_post = (req,res) => {}
