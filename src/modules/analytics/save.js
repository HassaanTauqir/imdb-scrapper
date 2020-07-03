const fs = require('fs');

const { analyticsFile } = require('../../utils/variables');
const { prettify } = require('../../utils/utilities');

const popularityMessage = 'Movies with increased popularity: \n';
const lastWeekPositionsMessage = 'Movies with increased popularity: \n';
const bestGenreMessage = 'Most popular Genre: \n';

const saveAsText = (moviesWithIncreasedPopularity, lastWeekPositions, bestGenre) => {
  fs.writeFile(
    analyticsFile,
    `${popularityMessage}${prettify(moviesWithIncreasedPopularity)}\n\n\n${lastWeekPositionsMessage}${prettify(
      lastWeekPositions,
    )}\n\n\n${bestGenreMessage}${bestGenre}`,
    err => {
      if (err) throw err;
      console.log(`Added analysed data to ${analyticsFile}`);
    },
  );
};

module.exports = saveAsText;
