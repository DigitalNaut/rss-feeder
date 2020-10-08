import style from "./Feed.scss";
import * as React from "react";

import Article from "../Article/Article.jsx";
import rssFetcher from "../../common/RSSFetcher.jsx";

// content: "Qui id incididunt est excepteur."
// contentSnippet: "Qui id incididunt est excepteur."
// creator: "John Smith"
// "dc:creator": "John Smith"
// guid: "http://example.com/test/1601906940"
// isoDate: "2020-10-05T14:09:00.000Z"
// link: "http://example.com/test/1601906940"
// pubDate: "Mon, 05 Oct 2020 14:09:00 GMT"
// title: "Lorem ipsum 2020-10-05T14:09:00Z"

function Feed(props) {
  let [articles, setArticles] = React.useState([]);

  function createArticle(key, title, content) {
    return (
      <Article title={title} key={key}>
        {content}
      </Article>
    );
  }

  React.useEffect(() => {
    if (props.rssUrl) {
      rssFetcher(props.rssUrl)
        .then((content) => {
          let articles = content.items.map((article, index) => {
            return createArticle(index, article.title, article.contentSnippet);
          });
          setArticles(articles);
        })

        .catch((error) => {
          console.log("Server responded with:", error.message);
          setArticles(<p>Error retrieving articles!</p>);
        });
    } else setArticles(<p>No subscription selected!</p>);
  }, [props, props.rssUrl]);

  return (
    <div id="feed" className={style.feed}>
      <h1 className={style.header}>Feed</h1>
      <div className={style.articlesList}>{articles}</div>
    </div>
  );
}

export default Feed;
