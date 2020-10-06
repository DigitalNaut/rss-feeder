import style from "./Article.scss";
import React from "react";

class Article extends React.Component {
  render() {
    return (
      <div className={style.article}>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  }
}

export default Article;
