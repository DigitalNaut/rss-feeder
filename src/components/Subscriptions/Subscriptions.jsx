import style from "./Subscriptions.scss";
import React, { useEffect, useState } from "react";
import data from "../../common/data.json";

function Subscriptions() {
  let [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    let subsList = data.sources.map((subscription, index) => {
      return (
        <SubLink
          key={index}
          title={subscription.identifier.title}
          link={subscription.link}
        />
      );
    });
    console.log(subsList);
    setSubscriptions(subsList);
  }, [data]);

  return (
    <div id="subscriptions" className={style.subscriptions}>
      <h1 className={style.header}>Subscriptions</h1>
      {subscriptions}
    </div>
  );
}

function handleClick(event) {
  event.preventDefault();
  console.log("Button clicked! ", link);
}

class SubLink extends React.Component {
  render() {
    return (
      <a href="#" onClick={handleClick}>
        <h3>{this.props.title}</h3>
      </a>
    );
  }
}

export default Subscriptions;
