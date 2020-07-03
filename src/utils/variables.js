const IMDB_URL = 'https://www.imdb.com/chart/moviemeter?ref_=nv_mv_mpm';
const outputFile = 'output.json';
const analyticsFile = 'analytics.txt';

const genreList = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Short Film',
  'Sport',
  'Superhero',
  'Thriller',
  'War',
  'Western',
];

module.exports = {
  analyticsFile,
  genreList,
  imdbURL: IMDB_URL,
  outputFile,
};
