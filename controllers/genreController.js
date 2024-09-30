const Puzzle = require('../models/puzzle')
const User = require('../models/user')
const Genre = require('../models/genre')

exports.allFeaturedPuzzles = async (req,res,next) => {
    const Puzzles = await Puzzle.find({featured: true})
    .sort({title: 1})
    .populate("genre")
    .exec()

    res.json(Puzzles)

}

exports.featuredSportsPuzzles = async (req,res,next) => {
    const SportsPuzzles = await Puzzle.find({featured: true})
    .sort({title: 1})
    .populate("genre")
    .exec()
    
    res.json(SportsPuzzles)
}

exports.featuredTVandMoviesPuzzles = async (req,res,next) => {
    const TVandMoviesPuzzles = await Puzzle.find({featured: true})
    .sort({title: 1})
    .populate("genre")
    .exec()

    res.json(TVandMoviesPuzzles)
}

exports.featuredNumbersPuzzles = async (req,res,next) => {
    const NumbersPuzzles = await Puzzle.find({featured: true})
    .sort({title: 1})
    .populate("genre")
    .exec()

    res.json(NumbersPuzzles)
}

exports.featuredLiteraturePuzzles = async (req,res,next) => {
    const LiteraturePuzzles = await Puzzle.find({featured: true})
    .sort({title: 1})
    .populate("genre")
    .exec()

    res.json(LiteraturePuzzles)
}

exports.featuredMiscellaneousPuzzles = async (req,res,next) => {
    const MiscellaneousPuzzles = await Puzzle.find({featured: true})
    .sort({title: 1})
    .populate("genre")
    .exec()

    res.json(MiscellaneousPuzzles)
}

exports.userPuzzles = async (req,res,next) => {
    const userId = req.user.id
    const UserPuzzles = await Puzzle.find({userId: userId})
    .sort({title:1})
    .populate("genre")
    .exec()

    res.json(UserPuzzles)
}

