import style from "./Subscriptions.scss";
import * as React from "react";

function Subscriptions(props) {
  let [subscriptions, setSubscriptions] = React.useState([]);

  React.useEffect(() => {
    let subsList = props.userdata.sources.map((subscription, index) => {
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
  }, [props.userdata]);

  return (
    <div id="subscriptions" className={style.subscriptions}>
      <h1 className={style.header}>Subscriptions</h1>
      <div className={style.subslist}>{subscriptions}</div>
    </div>
  );
}

function SubLink(props) {
  return (
    <button
      className={style.subscriptionLink}
      onClick={(event) => {
        props.callback(props.link);
      }}
    >
      {props.title}
    </button>
  );
}

export default Subscriptions;
