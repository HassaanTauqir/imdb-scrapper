const { filter, map, pipe } = require('ramda');

const getMoviesWithIncreasedPopularity = pipe(
  filter(({ popularity }) => popularity > 0),
  map(({ movie }) => movie),
);

module.exports = getMoviesWithIncreasedPopularity;
