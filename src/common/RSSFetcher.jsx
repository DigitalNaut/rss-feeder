import Parser from "rss-parser";

const parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const fetcher = (sourceURL) => {
  console.log("Fetching feed from:", sourceURL);
  return new Promise((resolve, reject)=>{
    parser.parseURL(CORS_PROXY + sourceURL)
      .then((feed)=>{
        resolve(feed);
      })
      .catch((error)=>{
        reject(error);
      });
  });
};

export default fetcher;
