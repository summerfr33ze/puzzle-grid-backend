const Puzzle = require("../models/puzzle")
const Comment = require("../models/comment")
const { body, validationResult } = require("express-validator")

exports.current_puzzle_get = (req, res) => {
    const currentPuzzle = Puzzle.findById(req.params.puzzleId)
    .populate("genre")
    .exec()
}

exports.comment_create_post = (req,res) => {

}

exports.create_post = [ 
    body("title").trim().isLength({min: 4, max: 30}).escape(),
    body("description").isLength({min: 10, max: 1000}).escape(),
    body("play_time").isLength({max: 30}).escape(),
    body("cells_per_side").isLength({min: 3, max: 8}),
    
    async (req,res) => {
        const errors = validationResult(req)
        if(errors.isEmpty()){
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
        else(res.json(errors))
    }
] 
