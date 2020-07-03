const { isEmpty, includes, pipe, prop, split, trim } = require('ramda');
const { isNaN, isUndefined } = require('ramda-adjunct');

const defaultReviews = {
  userReviews: 0,
  criticReviews: 0,
};

const getTitleFromPage = $ => {
  const titleWrapper = $('.title_wrapper');
  return trim(titleWrapper.find('h1').text());
};

const getReviewsFromPage = $ => {
  let reviews = defaultReviews;

  $('.titleReviewBarItem.titleReviewbarItemBorder .subText a').each((_, movieLink) => {
    const [noOfReviews, reviewType] = split(' ', $(movieLink).text());

    // Appending reviews to make userReviews/criticReviews, which makes more sense
    reviews[`${reviewType}Reviews`] = parseInt(noOfReviews, 10);
  });

  return reviews;
};

const getRankAndPopularityFromPage = $ => {
  let popularity = 0;

  // TODO: Can handle this in a better way
  const popularityContainer = $('.titleReviewBar')
    .children()
    .last()
    .children()
    .last()
    .find('.subText');

  const rank = parseInt(trim(popularityContainer.text()), 10);

  const lastChild = popularityContainer.children().last();
  const popularityClass = lastChild.attr('class');
  const hasGainedPopularity = !isUndefined(popularityClass) && includes('Up', popularityClass);
  const popularityWithoutSign = parseInt(trim(lastChild.text()), 10);
  if (!isNaN(popularityWithoutSign)) {
    popularity = hasGainedPopularity ? popularityWithoutSign : -popularityWithoutSign;
  }
  return {
    rank,
    popularity,
  };
};

const getBudgetFromPage = $ => {
  const budgetFinder = $('h4:contains(Budget:)')
    .parent()
    .text()
    .replace(/\D+/g, '');

  return isEmpty(budgetFinder) ? 'Unavailable' : parseInt(budgetFinder, 10);
};

const formatGenresToArray = pipe(trim, split(' '));

const getGenresFromPage = $ => {
  const genresData = $('.see-more a[href*="genres="]').text();
  return formatGenresToArray(genresData);
};

module.exports = {
  getBudgetFromPage,
  getGenresFromPage,
  getRankAndPopularityFromPage,
  getReviewsFromPage,
  getTitleFromPage,
};
