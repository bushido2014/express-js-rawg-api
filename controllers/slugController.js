const config = require("../config");

const URI = config.URI;
const API_KEY = config.API_KEY;
/**
 * GET /
 * Slug Game Item
 */
exports.slug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const detailsURL = `${URI}/games/${slug}?key=${API_KEY}`;
    const moviesURL = `${URI}/games/${slug}/movies?key=${API_KEY}`;
    const screenshotsURL = `${URI}/games/${slug}/screenshots?key=${API_KEY}`;
    const sameGamesURL = `${URI}/games/${slug}/game-series?key=${API_KEY}`;

    const responseDetails = await fetch(detailsURL);
    const dataDetails = await responseDetails.json();

    const responseMovies = await fetch(moviesURL);
    const dataMovies = await responseMovies.json();

    const responseScreenshots = await fetch(screenshotsURL);
    const dataScreenshots = await responseScreenshots.json();

    const responseSameGames = await fetch(sameGamesURL);
    const dataSameGames = await responseSameGames.json();

    const gameDetails = {
      name: dataDetails.name,
      slug: dataDetails.slug,
      description: dataDetails.description,
      metacritic: dataDetails.metacritic,
      background_image: dataDetails.background_image,
      rating: dataDetails.rating,
      website: dataDetails.website,
      tags: dataDetails.tags,
      platforms: dataDetails.platforms,
      parent_platforms: dataDetails.parent_platforms,
      release_date: dataDetails.released,
      stores: dataDetails.stores,
      videos: dataMovies.results,
      screenshots: dataScreenshots.results,
      sameGames: dataSameGames.results,
    };
    const locals = {
      title: dataDetails.name,
      description: dataDetails.description
        ? dataDetails.description
            .slice(0, 160)
            .replace(/<[^>]+>/g, "")
            .trim()
        : "No description available",
    };

    //res.render("slug", { game: gameDetails, ...locals });
    res.render("games/slug", {
      game: gameDetails,

      sameGames: dataSameGames.results,
      ...locals,
    });
    //res.render("slug", { game: gameDetails });
    //console.log(gameDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
