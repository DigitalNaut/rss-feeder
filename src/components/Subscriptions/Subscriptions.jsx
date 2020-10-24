import regeneratorRuntime from "regenerator-runtime";

import style from "./Subscriptions.scss";
import * as React from "react";
import Loading from "Components/Loading/Loading.jsx";

function Subscriptions(props) {
  let [sources, setSources] = React.useState([]);
  let [hasLoaded, setLoaded] = React.useState(false);
  let [selection, setSelection] = React.useState("");

  React.useEffect(() => {
    setSources(props.userdata.sources);
    setLoaded(true);
  }, [props.userdata]);

  return (
    <>
      {(hasLoaded && (
        <div className={style.container}>
          <button
            className={style.homeButtom}
            href=""
            onClick={(event) => {
              event.preventDefault();
              props.callback("");
            }}
          >
            <h2 className={style.header}>Subscriptions</h2>
          </button>
          <div className={style.list}>
            {sources.map((item, index) => {
              return (
                <SubscriptionLink
                  key={index}
                  title={item.identifier.title}
                  link={item.url}
                  callback={props.callback}
                  selection={selection}
                  onSelection={(url) => setSelection(url)}
                />
              );
            })}
          </div>
        </div>
      )) || <Loading />}
    </>
  );
}

function SubscriptionLink(props) {
  let [classes, setClasses] = React.useState(`${style.link}`);

  React.useEffect(() => {
    setClasses(
      `${props.selection == props.link ? style.selected : ""} ${style.link}`
    );
  }, [props.selection]);

  return (
    <>
      <button
        className={classes}
        onClick={(event) => {
          props.onSelection(props.link);
          props.callback(props.link);
        }}
      >
        {props.title}
      </button>
    </>
  );
}

export default Subscriptions;
