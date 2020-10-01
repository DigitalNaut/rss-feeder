import * as React from "react";
import { Helmet } from "react-helmet";

import Feed from "./Feed/Feed.jsx";
import Subscriptions from "./Subscriptions/Subscriptions.jsx";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>RSS Feeder</title>
        </Helmet>
        <h1>Hello world from React!</h1>
        <Feed />
        <Subscriptions />
      </div>
    );
  }
}
