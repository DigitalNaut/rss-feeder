import style from "./Feed.scss";
import React, { useEffect, useLayoutEffect, useState } from "react";

import Article from "../Article/Article.jsx";
import fetcher from "../../common/RSSFetcher.jsx";

const SciAmerSource =
  "http://rss.sciam.com/ScientificAmerican-Global?format=xml";
const NatVidSource = "http://feeds.nature.com/video/rss/current?format=xml";
const MockRSS = "https://lorem-rss.herokuapp.com/feed";

// content: "Qui id incididunt est excepteur."
// contentSnippet: "Qui id incididunt est excepteur."
// creator: "John Smith"
// "dc:creator": "John Smith"
// guid: "http://example.com/test/1601906940"
// isoDate: "2020-10-05T14:09:00.000Z"
// link: "http://example.com/test/1601906940"
// pubDate: "Mon, 05 Oct 2020 14:09:00 GMT"
// title: "Lorem ipsum 2020-10-05T14:09:00Z"

function Feed() {
  let [articles, setArticles] = useState([]);

  useEffect(() => {
    fetcher(MockRSS)
      .then((content) => {
        let articles = content.items.map((article, index) => {
          return (
            <Article title={article.title} key={index}>
              {article.content}
            </Article>
          );
        });
        console.log(articles);
        setArticles(articles);
      })
      .catch((error) => {
        console.log("Server responded with:", error.message);
        setArticles(<p>Error retrieving articles!</p>);
      });
  }, []);

  return (
    <div id="feed" className={style.feed}>
      <h1 className={style.header}>Feed</h1>
      <div className={style.articlesList}>{articles}</div>
    </div>
  );
}

export default Feed;
