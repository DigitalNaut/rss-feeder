import style from "./App.scss";

import * as React from "react";
import { Helmet } from "react-helmet";

import Feed from "./Feed/Feed.jsx";
import Subscriptions from "./Subscriptions/Subscriptions.jsx";
import userdata from "../common/userdata.json";

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
      <Subscriptions userdata={userdata} callback={updateSubscriptionView} />
      <Feed rssUrl={rssQuery} />
    </div>
  );
}
