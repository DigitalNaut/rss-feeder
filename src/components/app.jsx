import style from "./App.scss";

import * as React from "react";
import { Helmet } from "react-helmet";

import Feed from "./Feed/Feed.jsx";
import Subscriptions from "./Subscriptions/Subscriptions.jsx";

export function App() {
  let [rssQuery, setRssQuery] = React.useState("");

  function updateSubscriptionView(newQuery) {
    setRssQuery(newQuery);
  }

  return (
    <div className={style.app}>
      <Helmet>
        <title>RSS Feeder</title>
      </Helmet>
      <Subscriptions callback={updateSubscriptionView} />
      <Feed rssUrl={rssQuery} />
    </div>
  );
}
