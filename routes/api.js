const express = require("express")
const router = express.Router()
const puzzleController = require("../controllers/puzzleController")
const genreController = require("../controllers/genreController")
const authController = require("../controllers/authController")

router.get("/", genreController.allFeaturedPuzzles)

router.get("/puzzles/:puzzleId", puzzleController.current_puzzle_get)
router.post("/puzzles/:puzzleId/comments", puzzleController.comment_create_post)
router.post("/create", puzzleController.create_post)

router.get("/genres/sports", genreController.featuredSportsPuzzles)
router.get("/genres/numbers", genreController.featuredNumbersPuzzles)
router.get("/genres/tv-and-movies", genreController.featuredTVandMoviesPuzzles)
router.get("/genres/literature", genreController.featuredLiteraturePuzzles)
router.get("/genres/miscellaneous", genreController.featuredMiscellaneousPuzzles)

// router.post("/login", authController.login_post)
// router.post("/signup", authController.signup_post)

module.exports = router

