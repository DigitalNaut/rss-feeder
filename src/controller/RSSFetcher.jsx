import Parser from "rss-parser";
import Userdata from "User/data.json";
import { SafeWrite, SafeRead } from "Main/StorageManager.jsx";

// VARS

const HALF_HOUR = 1800 * 1000;
const ONE_HOUR = HALF_HOUR * 2;

const parser = new Parser({
  customFields: {
    media: ["media:content", "mediaContent", { keepArray: true }],
    enclosure: ["enclosure", "mediaContent"],
    long: [["content:encodedSnippet", "longContent"]],
  },
});

/**
 * Returns a mock version of the requested RSS feed by matching URLs
 *
 * @param {*} url Web url to RSS feed
 * @return {*} JSON object
 */

function resolveCache(url) {
  let defaultData = Userdata.sources[0].mockfeed;
  let data = defaultData;

  // console.log("Default mock feed data:", defaultData);
  Userdata.sources.map((source) => {
    if (source && source.url === url) {
      let storedFeed = SafeRead(source);

      if (storedFeed) {
        console.log(
          "Reading safely from '",
          source,
          "' resulted in:",
          storedFeed
        );
        data = storedFeed;
      } else if (source.mockfeed) data = source.mockfeed;
    }
  });

  // console.log("Data after processing:", data);

  return data.items ? data : defaultData;
}

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

function saveData(url, data, deltaTime = ONE_HOUR) {
  SafeWrite(url, data);
  SafeWrite(url + "timestamp", Date.now() + deltaTime); //Add 6 hours to the timestamp
  console.log("Updating timestamp to:", new Date(SafeRead(url + "timestamp")), "which is 6 hours from how");
  let saferead = SafeRead(url);
  console.log("Updated timestamp for:", saferead, "at", url);
}

/**
 * Aids in fetching a JSON from a web resource
 *
 * @param {*} sourceURL Web url of the RSS feed
 * @param {boolean} [useMockfeed=false] Use cached version?
 * @param {number} [delay=0] Number of ms to sleep before resolving promise
 * @return {*} Promise with JSON or error
 */
function fetch(sourceURL, useMockfeed = false, delay = 0) {
  return new Promise((resolve, reject) => {
    if (useMockfeed) {
      let mockdata = resolveCache(sourceURL);
      console.log(`RSSFetcher running mock data with a delay of ${delay}`);
      return setTimeout(() => resolve(mockdata), delay);
    } else console.log("Petitioning fetch request for:", sourceURL, "...");

    let feedTimestamp = SafeRead(sourceURL + "timestamp");
    if (feedTimestamp) {
      console.log("Which was:", feedTimestamp);
    } else {
      console.log("No timestamp found in memory for URL:", sourceURL);
      resolve(SafeRead(sourceURL) || resolveCache(sourceURL));
    }

    if (feedTimestamp === null || Date.now() > feedTimestamp) {
      console.log("URL call: Approved");
      parser
        .parseURL(CORS_PROXY + sourceURL)
        .then((feed) => {
          console.log(
            "HTTP request by RSSFetcher received:",
            feed,
            "from coors:",
            CORS_PROXY,
            "and url:",
            sourceURL
          );

          saveData(feed, sourceURL, 6 * ONE_HOUR);

          return resolve(feed);
        })
        .catch((error) => {
          console.log(error)

          switch (error.message) {
            case "Status code 429":
              console.log("RSS Fetcher is spamming the URL", sourceURL);

              SafeWrite(sourceURL + "timestamp", Date.now() + HALF_HOUR); //Add 30 min to the timestamp
              console.log(
                "Timing it out for 30 min until",
                new Date(SafeRead(sourceURL + "timestamp")),
              );
              
              resolve(SafeRead(sourceURL) || resolveCache(sourceURL));
              break;
            default:
              console.log(
                "RSS Fetcher's runner returned an error:",
                error.message
              );
          }
          return reject(error.message);
        });
    } else {
      console.log(
        "URL call denied: timestamp difference is still:",
        feedTimestamp - Date.now()
      );

      resolve(SafeRead(sourceURL) || resolveCache(sourceURL));
    }
  });
}

export default fetch;
