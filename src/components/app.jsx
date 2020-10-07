import style from "./App.scss"

import * as React from "react";
import { Helmet } from "react-helmet";

import Feed from "./Feed/Feed.jsx";
import Subscriptions from "./Subscriptions/Subscriptions.jsx";

export class App extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>RSS Feeder</title>
        </Helmet>
        <Subscriptions />
        <Feed />
      </>
    );
  }
}
