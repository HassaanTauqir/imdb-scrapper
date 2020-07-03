const { add, filter, forEach, includes } = require('ramda');

const { genreList } = require('../../utils/variables');

const findBestGenre = moviesData => {
  let highestScore = 0;
  let mostPopularGenre = genreList[0];

  forEach(genre => {
    const currentGenreScore = findScore(moviesData, genre);
    if (currentGenreScore > highestScore) {
      highestScore = currentGenreScore;
      mostPopularGenre = genre;
    }
  }, genreList);
  return mostPopularGenre;
};

const calculateWeightedScore = rank => 101 - rank;

const findScore = (moviesData, genre) => {
  const moviesContainingGenre = filter(({ genres }) => includes(genre, genres), moviesData);

  let score = 0;
  forEach(({ rank }) => {
    score = add(score, calculateWeightedScore(rank))
  }, moviesContainingGenre);

  return score / 100;
};

module.exports = findBestGenre;
