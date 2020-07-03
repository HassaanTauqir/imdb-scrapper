const { map, pipe } = require('ramda');

const getLastWeekPositions = pipe(
  map(({ movie, rank, popularity }) => ({
    movie,
    previousRank: rank + popularity,
    rank,
  })),
);

module.exports = getLastWeekPositions;
