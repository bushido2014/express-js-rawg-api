const config = require("../config");
const URI = config.URI;
const API_KEY = config.API_KEY;

const LIMIT = 20;

exports.gamespage = async (req, res) => {
  const locals = {
    title: "List of Video Games on RAWG",
    description: "List of Video Games on RAWG ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game",
  };
  const page = parseInt(req.query.page || 1);
  const offset = (page - 1) * LIMIT;
  const searchTerm = req.query.searchTerm;

  try {
    let gameDataUrl = `${URI}/games?key=${API_KEY}&page=${offset / LIMIT + 1}`;

    if (searchTerm) {
      gameDataUrl += `&search=${searchTerm}`;
    }

    const response = await fetch(gameDataUrl);
    const data = await response.json();
    const games = data.results;
    const totalPages = Math.ceil(data.total_count / LIMIT);

    if (searchTerm) {
      filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    res.render("games", {
      games,
      totalPages,
      currentPage: page,
      searchTerm,

      ...locals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
