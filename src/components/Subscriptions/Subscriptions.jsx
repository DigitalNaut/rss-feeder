import style from "./Subscriptions.scss";
import React from "react";

class Subscriptions extends React.Component {
  render() {
    return (
      <div id="subscriptions" className={style.subscriptions}>
        <h1 className={style.header}>Subscription</h1>
      </div>
    );
  }
}

export default Subscriptions;
