import Parser from "rss-parser";

const parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const fetcher = (sourceURL, callback) => {
  console.log("Fetching feed from:", sourceURL);

  parser.parseURL(CORS_PROXY + sourceURL, (error, feed) => {
    if (error) throw error;

    callback(feed.items);
  });
};

export default fetcher;
