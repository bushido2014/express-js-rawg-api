const config = require("../config");

// Poți folosi config.URI și config.API_KEY în cadrul fișierului
const URI = config.URI;
const API_KEY = config.API_KEY;

/**
 * GET /
 * Platforms
 */
const LIMIT = 12;

exports.platforms = async (req, res) => {
  const locals = {
    title: "Platforms — video game discovery site • RAWG",
    description:
      "Platforms — RAWG is a video game discovery site. The most comprehensive database that is powered by personal player experiences.",
  };
  const page = parseInt(req.query.page || 1);
  const offset = (page - 1) * LIMIT;
  try {
    const response = await fetch(
      `${URI}/platforms?key=${API_KEY}&page=${offset / LIMIT + 1}`,
    );
    const dataPlatforms = await response.json();
    const platforms = dataPlatforms.results;
    const totalPages = Math.ceil(dataPlatforms.total_count / LIMIT);
    res.render("platforms", {
      platforms,
      totalPages,
      currentPage: page,
      ...locals,
    });
    //console.log(platforms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
