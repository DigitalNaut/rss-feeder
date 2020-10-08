import Parser from "rss-parser";
import StorageManager from "./StorageManager";

import mockfeed from "./mockfeed.json";

const parser = new Parser();

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

function fetcher(sourceURL, mock = false, useDelay = 0) {
  //console.log("Fetching feed from:", sourceURL);
  return new Promise((resolve, reject) => {
    if (mock) {
      console.log("Using mock feed", useDelay && " with delay of " + useDelay);
      
      setTimeout(()=>resolve(mockfeed), useDelay);
    } else
      parser
        .parseURL(CORS_PROXY + sourceURL)
        .then((feed) => {
          resolve(feed);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export default fetcher;
