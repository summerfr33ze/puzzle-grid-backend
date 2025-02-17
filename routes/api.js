const express = require("express")
const passport = require("passport")
const router = express.Router()
const puzzleController = require("../controllers/puzzleController")
const genreController = require("../controllers/genreController")
const authController = require("../controllers/authController")

router.get("/genres/all", genreController.allFeaturedPuzzles)

router.get("/genres/:genreId/puzzles/:puzzleId", puzzleController.current_puzzle_get)
router.post("/genres/:genreId/puzzles/:puzzleId/comments", puzzleController.comment_create_post)
router.post("/create", passport.authenticate('jwt', { session: false }), puzzleController.create_post)
router.post("/edit", passport.authenticate('jwt', { session: false }), puzzleController.edit_post)

router.get("/genres/sports", genreController.featuredSportsPuzzles)
router.get("/genres/numbers", genreController.featuredNumbersPuzzles)
router.get("/genres/tv-and-movies", genreController.featuredTVandMoviesPuzzles)
router.get("/genres/literature", genreController.featuredLiteraturePuzzles)
router.get("/genres/miscellaneous", genreController.featuredMiscellaneousPuzzles)
router.get("/mypuzzles/:userId", passport.authenticate('jwt', { session:false}), genreController.userPuzzles)

router.post("/login", authController.login_post)
router.post("/signup", authController.signup_post)

module.exports = router

