const Puzzle = require("../models/puzzle")
const Comment = require("../models/comment")
const { body, validationResult } = require("express-validator")

exports.current_puzzle_get = async (req, res) => {
    
    const currentPuzzle = await Puzzle.findById(req.params.puzzleId)
    .populate("genre")
    .exec()
    
    
    res.json(currentPuzzle)
}

exports.comment_create_post = (req,res) => {

}

exports.create_post = [ 
    body("title").trim().isLength({min: 4, max: 30}),
    body("description").isLength({min: 10, max: 1000}),
    body("play_time").isInt({max: 30}),
    body("cells_per_side").isInt({min: 3, max: 8}),
    
    async (req,res) => {
        const errors = validationResult(req)
        if(errors.isEmpty()){
            const newPuzzle = new Puzzle({
                title: req.body.title,
                description: req.body.description,
                genre: req.body.genre,
                userId: req.user._id,
                play_time: req.body.play_time,
                cells_per_side: req.body.cells_per_side,
                data_array: req.body.data_array,
                color_one: req.body.color_one,
                color_two: req.body.color_two,
                featured: req.body.featured

            }
            )
            await newPuzzle.save()
        }
        else(res.json(errors))
    }
] 

exports.edit_post = [
    body("title").trim().isLength({min: 4, max: 30}),
    body("description").isLength({min: 10, max: 1000}),
    body("play_time").isInt({max: 30}),
    body("cells_per_side").isInt({min: 3, max: 8}),

   async (req,res) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const puzzle = Puzzle.findById(req.body.id)
        puzzle.overwrite(req.body)
        puzzle.save()
    }
    else(res.json(errors))

}
]