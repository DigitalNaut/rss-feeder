import * as React from "react";
import style from "./PhotoDisplay.scss";

import Loading from "Components/Loading/Loading.jsx";
import FetchRSS from "Main/RSSFetcher.jsx";

function PhotoDisplay(props) {
  let [photosRSS, setPhotoRSS] = React.useState("");
  let [feedItems, setFeedItems] = React.useState([]);
  let [heroPhotoSrc, setHeroPhotoSrc] = React.useState("");
  let [isFeedLoaded, setFeedLoaded] = React.useState(false);

  let imgRegexNeedles = {
    img: /(?:<img).*(?:\/>)/gs,
    labels: /([0-9a-zA-Z\-\_]+)(?=\s?\=\")/g,
    values: /(?<=")[\/\’\.\,\:\;\'a-zA-Z0-9\s\w\- \(\)"]*(?=")/g,
  };

  React.useEffect(() => {
    setPhotoRSS(props.feed || props.defaultFeed);

    console.log(
      "Photo of the Day feed url:",
      (props.feed && "feed") || (props.defaultFeed && "default")
    );
  }, []);

  React.useEffect(() => {
    if (photosRSS)
      setTimeout(async () => {
        return await FetchRSS(photosRSS /* , true, 100 */)
          .then(({ items }) => {
            let sortByPubDate = (items) =>
              Array.from(items).sort((a, b) => a.pubDate - b.pubDate);

            let sortedItems = sortByPubDate(items);

            // console.log("Fetched & sorted feed:", sortedItems);
            if (sortedItems) setFeedItems(sortedItems);
          })
          .catch((error) => {
            console.log(
              "Fetcher ends in error:",
              error,
              "Using default feed:",
              props.defaultFeed
            );
          });
      }, 0);
  }, [photosRSS]);

  React.useEffect(() => {
    setHeroPhotoSrc(
      feedItems && feedItems.length
        ? parseImgFromString(feedItems[0].content)
        : parseImgFromString(props.defaultHaystack)
    );

    setFeedLoaded(true);
  }, [feedItems]);

  function parseImgFromString(haystrack) {
    let parse = (needle, haystack) => {
      return haystack.match(needle);
    };

    let parsePair = (labelStack, valueStack) =>
      labelStack.map((label, index) => {
        return [label, valueStack[index]];
      });

    let imgHaystack = parse(imgRegexNeedles.img, haystrack)[0];
    let labelsFound = parse(imgRegexNeedles.labels, imgHaystack);
    let valuesFound = parse(imgRegexNeedles.values, imgHaystack);
    let constructedPairs = Object.fromEntries(
      parsePair(labelsFound, valuesFound)
    );

    return constructedPairs["src"];
  }

  return (
    <>
      {(isFeedLoaded && (
        <div className={style.container}>
          <img className={style.heroPhoto} src={heroPhotoSrc} />
        </div>
      )) || <Loading />}
    </>
  );
}

export default PhotoDisplay;
