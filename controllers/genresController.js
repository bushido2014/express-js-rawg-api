const config = require("../config");

const URI = config.URI;
const API_KEY = config.API_KEY;

/**
 * GET /
 * Genres
 */

exports.genres = async (req, res) => {
  const locals = {
    title: "Genres — video game discovery site • RAWG",
    description:
      "Platforms — RAWG is a video game discovery site. The most comprehensive database that is powered by personal player experiences.",
  };
  try {
    const response = await fetch(`${URI}/genres?key=${API_KEY}`);
    const dataGenres = await response.json();
    const genres = dataGenres.results;
    res.render("genres", { genres, ...locals });
    //console.log(genres);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
