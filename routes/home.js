const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const gameController = require("../controllers/gamesController");
const genresController = require("../controllers/genresController");
const platformsController = require("../controllers/platformsController");
const slugController = require("../controllers/slugController");
const tagsController = require("../controllers/tagsController");

router.get("/", homeController.homepage);

router.get("/games", gameController.gamespage);

router.get("/genres", genresController.genres);

router.get("/platforms", platformsController.platforms);


router.get("/tags", tagsController.tags);

router.get("/games/:slug", slugController.slug);

module.exports = router;
