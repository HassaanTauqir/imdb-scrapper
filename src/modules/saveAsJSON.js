const fs = require('fs');

const { outputFile } = require('../utils/variables');
const { prettify } = require('../utils/utilities');

const saveAsJSON = movieData => {
  fs.writeFile(outputFile, prettify(movieData), err => {
    if (err) throw err;
    console.log(`Added to ${outputFile}`);
  });
};

module.exports = saveAsJSON;
