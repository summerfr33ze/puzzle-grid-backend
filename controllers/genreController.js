const Puzzle = require('../models/puzzle')
const Genre = require('../models/genre')

exports.allFeaturedPuzzles = async (req,res,next) => {
    const Puzzles = await Puzzle.find({featured: true}, "title genre play_time cells_per_side background_colors text_color featured")
    .sort({name: 1})
    .populate("genre")
    .exec()

}

exports.featuredSportsPuzzles = async (req,res,next) => {
    const SportsPuzzles = await Puzzle.find({featured:true}, "title genre play_time cells_per_side background_colors text_color featured")
    .sort({name: 1})
    .populate({
    path: "genre", 
    match: {'title' : {$eq: 'Sports'}}
    })
    .exec()
}

exports.featuredTVandMoviesPuzzles = async (req,res,next) => {
    const TVandMoviesPuzzles = await Puzzle.find({featured:true}, "title genre play_time cells_per_side background_colors text_color featured")
    .sort({name: 1})
    .populate({
    path: "genre", 
    match: {'title' : {$eq: 'TVandMovies'}}
    })
    .exec()
}

exports.featuredNumbersPuzzles = async (req,res,next) => {
    const numbersPuzzles = await Puzzle.find({featured:true}, "title genre play_time cells_per_side background_colors text_color featured")
    .sort({name: 1})
    .populate({
    path: "genre", 
    match: {'title' : {$eq: 'Numbers'}}
    })
    .exec()
}

exports.featuredLiteraturePuzzles = async (req,res,next) => {
    const numbersPuzzles = await Puzzle.find({featured:true}, "title genre play_time cells_per_side background_colors text_color featured")
    .sort({name: 1})
    .populate({
    path: "genre", 
    match: {'title' : {$eq: 'Literature'}}
    })
    .exec()
}

exports.featuredMiscellaneousPuzzles = async (req,res,next) => {
    const MiscellaneousPuzzles = await Puzzle.find({featured:true}, "title genre play_time cells_per_side background_colors text_color featured")
    .sort({name: 1})
    .populate({
    path: "genre", 
    match: {'title' : {$eq: 'Miscellaneous'}}
    })
    .exec()
}

