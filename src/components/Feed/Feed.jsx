import style from "./Feed.scss";
import React from "react";

import Article from "../Article/Article.jsx";

let source = (
  <image>
    <a>
      https://static.scientificamerican.com/sciam/assets/Image/newsletter/salogo.png
    </a>
    <h1>Scientific American</h1>
    <a>http://www.scientificamerican.com</a>
  </image>
);
let content = (
  <div>
    How can we make our schools, office buildings and homes safer?
    <br /> <br /> -- Read more on ScientificAmerican.com
    <div className="feedflare">
      <a href="http://rss.sciam.com/~ff/ScientificAmerican-Global?a=2WShZiZwv88:tLe3B1_-lfQ:yIl2AUoC8zA">
        <img
          src="http://feeds.feedburner.com/~ff/ScientificAmerican-Global?d=yIl2AUoC8zA"
          border="0"
        ></img>
      </a>
      <a href="http://rss.sciam.com/~ff/ScientificAmerican-Global?a=2WShZiZwv88:tLe3B1_-lfQ:qj6IDK7rITs">
        <img
          src="http://feeds.feedburner.com/~ff/ScientificAmerican-Global?d=qj6IDK7rITs"
          border="0"
        ></img>
      </a>
      <a href="http://rss.sciam.com/~ff/ScientificAmerican-Global?a=2WShZiZwv88:tLe3B1_-lfQ:l6gmwiTKsz0">
        <img
          src="http://feeds.feedburner.com/~ff/ScientificAmerican-Global?d=l6gmwiTKsz0"
          border="0"
        ></img>
      </a>
      <a href="http://rss.sciam.com/~ff/ScientificAmerican-Global?a=2WShZiZwv88:tLe3B1_-lfQ:gIN9vFwOqvQ">
        <img
          src="http://feeds.feedburner.com/~ff/ScientificAmerican-Global?i=2WShZiZwv88:tLe3B1_-lfQ:gIN9vFwOqvQ"
          border="0"
        ></img>
      </a>
      <a href="http://rss.sciam.com/~ff/ScientificAmerican-Global?a=2WShZiZwv88:tLe3B1_-lfQ:ZC7T4KBF6Nw">
        <img
          src="http://feeds.feedburner.com/~ff/ScientificAmerican-Global?d=ZC7T4KBF6Nw"
          border="0"
        ></img>
      </a>
      <a href="http://rss.sciam.com/~ff/ScientificAmerican-Global?a=2WShZiZwv88:tLe3B1_-lfQ:I9og5sOYxJI">
        <img
          src="http://feeds.feedburner.com/~ff/ScientificAmerican-Global?d=I9og5sOYxJI"
          border="0"
        ></img>
      </a>
      <a href="http://rss.sciam.com/~ff/ScientificAmerican-Global?a=2WShZiZwv88:tLe3B1_-lfQ:QXVau8BzmBE">
        <img
          src="http://feeds.feedburner.com/~ff/ScientificAmerican-Global?d=QXVau8BzmBE"
          border="0"
        ></img>
      </a>
    </div>
  </div>
);

class Feed extends React.Component {
  render() {
    return (
      <div id="feed" className={style.feed}>
        <div>{source}</div>
        <h1 className={style.header}>Feed</h1>
        <Article name="Scientific American">{content}</Article>
        <Article name="Nature"><img src="http://feeds.feedburner.com/~r/video/rss/current/~4/Q8cBh5rFnWo" height="1" width="1" alt=""/></Article>
      </div>
    );
  }
}

export default Feed;
