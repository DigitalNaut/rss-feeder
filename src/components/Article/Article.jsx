import style from "./Article.scss";
import React from "react";

function Article(props) {
  return (
    <div className={style.article}>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}

export default Article;
