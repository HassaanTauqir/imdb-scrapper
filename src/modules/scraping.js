const cheerio = require('cheerio');
const { equals } = require('ramda');

const { searchPage, sleep } = require('../utils/utilities');
const {
  getBudgetFromPage,
  getGenresFromPage,
  getRankAndPopularityFromPage,
  getReviewsFromPage,
  getTitleFromPage,
} = require('../utils/scrapingUtils');

const { prop } = require('ramda');
const { isNull } = require('ramda-adjunct');

const LoadElement = data => cheerio.load(data);

const openMoviesAndGetData = async ($, container) => {
  let scrappedData = [];

  // Avoid delay during first movie search
  let counter = -1;
  const interval = 3000;

  container.find('tr .titleColumn a').each((_, linkToMovie) => {
    counter++;

    // Delay for a few seconds to prevent getting blocked
    setTimeout(async counter => {
      const moviePageLink = `https://imdb.com/${$(linkToMovie).attr('href')}`;
      const scrappedMovieData = await getDataFromMoviePage(moviePageLink);
      scrappedData.push(scrappedMovieData);
      if (equals(counter % 10, 0)) {
        console.log(
          `Please wait while I extract data. Data for ${counter} movies extracted`,
        );
      }
    }, interval * counter, counter);
  });

  // Block until scrappedData is filled with complete movie data
  // This is equivalent to total total delay caused by setTimeout
  await sleep(interval * counter);
  return scrappedData;
};

const getDataFromMoviePage = async moviePageLink => {
  const moviePage = await searchPage(moviePageLink);

  if (!isNull(prop('data', moviePage))) {
    const { data } = moviePage;
    const $ = LoadElement(data);

    const title = getTitleFromPage($);
    const reviews = getReviewsFromPage($);
    const { rank, popularity } = getRankAndPopularityFromPage($);
    const budget = getBudgetFromPage($);
    const genres = getGenresFromPage($);

    return {
      movie: title,
      rank,
      popularity,
      ...reviews,
      budget,
      genres,
    };
  } else {
    console.log(`An error occured while crawling page ${imdbURL}`);
  }
};

const extractMovieDataFromPage = async data => {
  // Cheerio loves JQuery
  const $ = LoadElement(data);
  const listContainer = $('.chart .lister-list');
  return await openMoviesAndGetData($, listContainer);
};

module.exports = extractMovieDataFromPage;
