import style from "./Feed.scss";
import * as React from "react";

import Article from "Components/Article/Article.jsx";
import rssFetch from "Main/RSSFetcher.jsx";
import Interpreter from "Main/Interpreter.jsx";
import Loading from "Components/Loading/Loading.jsx";
import { SafeRead } from "Main/StorageManager.jsx";
import { FathomBetween } from "Utility/TimeFathom.jsx";

function Feed(props) {
  let [hasLoaded, setLoaded] = React.useState(false);
  let [content, setContent] = React.useState([]);
  let [provider, setContentProvider] = React.useState(null);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  React.useEffect(() => {
    if (props.rssUrl) {
      setContent([]);
      setContentProvider(null);
      setLoaded(false);

      rssFetch(props.rssUrl /* , true, 10000000 */)
        .then((feed) => {
          console.log("Feed set to:", feed);

          let sortByIsoDate = (items) =>
            Array.from(items).sort((a, b) => a.pubDate - b.pubDate);

          let sortedItems = sortByIsoDate(feed.items);
          setContent(sortedItems);
          // console.log("Sorted items:", sortedItems);

          setContentProvider({
            title: feed.title,
            image: feed.image && feed.image.url,
            url: feed.image && feed.image.link,
          });

          setLoaded(true);
        })

        .catch((error) => {
          console.log("RSS Fetcher responded:", error.message);
          setContent(<p>Error retrieving the latest articles!</p>);
          setContentProvider(null);
          setLoaded(true);
        });
    } else setContent(<p>No subscription selected!</p>);
  }, [props.rssUrl]);

  return (
    <div id="feed" className={style.container}>
      {provider && (
        <>
          <div className={style.header}>
            <a href={(provider.image && provider.image.url) || ""}>
              <img
                className={style.image}
                src={provider.image}
                type={provider.type}
                onLoad={(e) => (e.target.style.display = "inline")}
              />
            </a>

            <a href={(provider.image && provider.image.url) || ""}>
              <h2 className={style.title}>{provider.title}</h2>
            </a>
            <div className={style.subheader}>
              {`Next update is in ${FathomBetween(
                new Date(SafeRead(props.rssUrl + "timestamp")),
                Date.now()
              )}`}
            </div>
          </div>
        </>
      )}
      {(hasLoaded && (
        <div className={style.content}>
          {content.length &&
            content.map((item, index) => {
              return (
                <Article
                  key={index}
                  title={item.title}
                  link={item.link}
                  heroSrc={
                    (item.mediaContent && {
                      url: item.mediaContent[0].$.url,
                      type: item.mediaContent[0].$.type,
                      length: item.mediaContent[0].$.length,
                    }) ||
                    (item.enclosure && {
                      url: item.enclosure.url,
                      type: item.enclosure.type,
                      length: item.enclosure.length,
                    })
                  }
                  date={
                    new Date(item.pubDate).toLocaleDateString(
                      "en-US",
                      dateOptions
                    ) +
                      ", " +
                      new Date(item.pubDate).toLocaleTimeString("en-US") ||
                    item.pubDate ||
                    "unknown when"
                  }
                  creator={item["dc:creator"] || item.creator || "Unknown"}
                >
                  <Interpreter inputData={item.content} />
                </Article>
              );
            })}
        </div>
      )) || <Loading />}
    </div>
  );
}

export default Feed;
