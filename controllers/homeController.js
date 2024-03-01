const config = require("../config");
const URI = config.URI;
const API_KEY = config.API_KEY;

const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  return month < 10 ? `0${month}` : `${month}`;
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  return day < 10 ? `0${day}` : `${day}`;
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}`;

const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
exports.homepage = async (req, res) => {
  const locals = {
    title:
      "The Biggest Video Game Database on RAWG - Video Game Discovery Service",
    description:
      "RAWG.IO  Keep all games in one profile See what friends are playing, and find your next great game.",
  };

  try {
    const popularGamesURL = `${URI}/games?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=40`;

    // const upcomingGamesURL = `${URI}/games?key=${API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=40`;

    const newGamesURL = `${URI}/games?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-released&page_size=40`;

    const popularResponse = await fetch(popularGamesURL);
    const popularData = await popularResponse.json();

    // const upcomingResponse = await fetch(upcomingGamesURL);
    // const upcomingData = await upcomingResponse.json();

    const newGamesResponse = await fetch(newGamesURL);
    const newGamesData = await newGamesResponse.json();

    res.render("index", {
      popularGames: popularData.results,
      //upcomingGames: upcomingData.results,
      newGames: newGamesData.results,
      ...locals,
    });
    //console.log(upcomingData.results);
    //console.log(newGamesData.results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
