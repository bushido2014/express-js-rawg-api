const config = require("../config");

const URI = config.URI;
const API_KEY = config.API_KEY;

/**
 * GET /
 * Tags Page
 */
const LIMIT = 12;

exports.tags = async (req, res) => {
  const locals = {
    title: "Tags — video game discovery site • RAWG",
    description:
      "Tags — RAWG is a video game discovery site. The most comprehensive database that is powered by personal player experiences",
  };
  const page = parseInt(req.query.page || 1);
  const offset = (page - 1) * LIMIT;
  try {
    const response = await fetch(
      `${URI}/tags?key=${API_KEY}&page=${offset / LIMIT + 1}`,
    );
    const dataTags = await response.json();
    const tags = dataTags.results;
    const totalPages = Math.ceil(dataTags.total_count / LIMIT);
    res.render("tags", {
      tags,
      totalPages,
      currentPage: page,
      ...locals,
    });
    //console.log(tags);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
