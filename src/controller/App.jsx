import style from "./App.scss";

import * as React from "react";
import { Helmet } from "react-helmet";

import Feed from "Components/Feed/Feed.jsx";
import Subscriptions from "Components/Subscriptions/Subscriptions.jsx";
import userdata from "User/data.json";
import config from "User/configuration.json";
import PhotoDisplay from "Components/PhotoDisplay/PhotoDisplay.jsx";

export function App() {
  let [rssQuery, setRssQuery] = React.useState("");
  let [photoFeed, setPhotoFeed] = React.useState("");

  function updateSubscriptionView(newQuery) {
    let feed = document.getElementById("feed");
    if(feed) feed.scrollTop = 0;
    setRssQuery(newQuery);
  }

  React.useEffect(() => {
    console.log("Config: Photo Feed uses:", config.photoFeed.feedUrl);
    setPhotoFeed(config.photoFeed.feedUrl);
  }, []);

  return (
    <div className={style.app}>
      <Helmet>
        <title>RSS Feeder</title>
      </Helmet>
      <Subscriptions userdata={userdata} callback={updateSubscriptionView} />
      {(rssQuery && <Feed rssUrl={rssQuery} />) ||
        (photoFeed && (
          <PhotoDisplay
            feed={photoFeed}
            defaultFeed={userdata.sources[0].mockfeed.items}
            defaultHaystack={userdata.sources[1].mockfeed.items[0].content}
          />
        ))}
    </div>
  );
}
