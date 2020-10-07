import style from "./Article.scss";
import React from "react";

class Article extends React.Component {
  render() {
    return (
      <div className={style.article}>
        <h3>{this.props.title}</h3>
        {this.props.children}
      </div>
    );
  }
}

export default Article;
