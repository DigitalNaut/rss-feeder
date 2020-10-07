import style from "./Subscriptions.scss";
import React, { useEffect, useState } from "react";
import data from "../../common/data.json";

function Subscriptions(props) {
  let [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    let subsList = data.sources.map((subscription, index) => {
      return (
        <SubLink
          key={index}
          title={subscription.identifier.title}
          link={subscription.url}
          callback={props.callback}
        />
      );
    });

    setSubscriptions(subsList);
  }, [data]);

  return (
    <div id="subscriptions" className={style.subscriptions}>
      <h1 className={style.header}>Subscriptions</h1>
      {subscriptions}
    </div>
  );
}

class SubLink extends React.Component {
  render() {
    return (
      <a href="#" onClick={(event)=>{event.preventDefault(), this.props.callback(this.props.link)}}>
        <h3>{this.props.title}</h3>
      </a>
    );
  }
}

export default Subscriptions;
