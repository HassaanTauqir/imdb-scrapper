const { prop } = require('ramda');
const { isNull } = require('ramda-adjunct');

const extractMovieDataFromPage = require('./modules/scraping');
const saveAsJSON = require('./modules/saveAsJSON');
const saveAnalyticsAsText = require('./modules/analytics/save');
const findBestGenre = require('./modules/analytics/genre');
const getLastWeekPositions = require('./modules/analytics/previousPosition');
const getMoviesWithIncreasedPopularity = require('./modules/analytics/popularity');

const { searchPage } = require('./utils/utilities');
const { imdbURL } = require('./utils/variables');

const goodOldMainFunction = async () => {
  let crawledPage = await searchPage(imdbURL);
  if (!isNull(prop('data', crawledPage))) {
    // Scraping
    const { data } = crawledPage;
    const movieData = await extractMovieDataFromPage(data);

    // Save data in JSON file
    saveAsJSON(movieData);

    // Perform and log analytics
    const moviesWithIncreasedPopularity = getMoviesWithIncreasedPopularity(movieData);
    console.log('Movies with increased popularity: \n', moviesWithIncreasedPopularity);

    const lastWeekPositions = getLastWeekPositions(movieData);
    console.log("Last Week's positions: \n", lastWeekPositions);

    const bestGenre = findBestGenre(movieData);
    console.log('Most popular Genre: \n', bestGenre);

    saveAnalyticsAsText(moviesWithIncreasedPopularity, lastWeekPositions, bestGenre);

  } else {
    console.log(`An error occured while crawling page ${imdbURL}`);
  }
};

goodOldMainFunction();
