# IMDB Movie Crawler

**IMDB Web Crawler** is a small application that scrapes data from the IMDB most popular movie page.
It does the following.

- Scrape data from most popular movie page (https://www.imdb.com/chart/moviemeter?ref_=nv_mv_mpm)
- Saves data to file 'output.json'
- Analyzes data and saves analyzed data to 'analytics.txt'

**IMDB Web Crawler** is made with the following technologies

* Node v10.0.0
* NPM v5.6.0

**Important Note**

**IMDB Web Crawler** has not been tested with any versions of Node other than 10.0.0. It is expected
to run with newer versions of Node however no guarantee can be provided.

**How to run IMDB Web Crawler**

You will need the following installed

* [Node.js](https://nodejs.org/en/download/)
* [NPM](NPM comes preinstalled with latest versions of NodeJS)

To run, Go to the root of the project folder, open a terminal window there and run the following

* npm install (Installs the necessary node_modules)
* npm start

If all goes well, the application will start running. Give about 5 minutes for the data extraction process.
After that, you will see the data in the files as well on the console.

**Assumptions**

The formula for calculating the score for a genre that is being used is following

- for each movie with having with genre equal to current genre
- (summation(101-rank of movie))/100
#imda-web-crawler
