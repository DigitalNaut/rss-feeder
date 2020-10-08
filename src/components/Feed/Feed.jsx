import style from "./Feed.scss";
import * as React from "react";

import Article from "../Article/Article.jsx";
import rssFetcher from "../../common/RSSFetcher.jsx";
import Loading from "../Loading/Loading.jsx";

/* Fetch result sample:
----------------------------
  content: "Qui id incididunt est excepteur."
  contentSnippet: "Qui id incididunt est excepteur."
  creator: "John Smith"
  "dc:creator": "John Smith"
  guid: "http://example.com/test/1601906940"
  isoDate: "2020-10-05T14:09:00.000Z"
  link: "http://example.com/test/1601906940"
  pubDate: "Mon, 05 Oct 2020 14:09:00 GMT"
  title: "Lorem ipsum 2020-10-05T14:09:00Z"
 */

function Feed(props) {
  let [isLoading, setLoading] = React.useState(false);
  let [content, setContent] = React.useState([]);

  function buildArticles(items) {
    let builtItems = items.map((item, index) => {
      return (
        <Article title={item.title} key={index}>
          {item.contentSnippet}
        </Article>
      );
    });

    return builtItems;
  }

  React.useEffect(() => {
    if (props.rssUrl) {
      setLoading(true);

      rssFetcher(props.rssUrl, true, 800)
        .then(({ items }) => {
          setContent(buildArticles(items));
          setLoading(false);
        })

        .catch((error) => {
          console.log("Server responded with:", error.message);
          setArticles(<p>Error retrieving articles!</p>);
          setLoading(false);
        });
    } else setContent(<p>No subscription selected!</p>);
  }, [props.rssUrl]);

  return (
    <div id="feed" className={style.feed}>
      <div className={style.headerSection}>
        <h2 className={style.header}>Feed</h2>
        <Loading showComponent={isLoading} />
      </div>
      <div className={style.articlesList}>{!isLoading && content}</div>
    </div>
  );
}

export default Feed;
