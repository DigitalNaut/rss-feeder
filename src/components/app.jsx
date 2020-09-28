import * as React from "react";
import { Helmet } from "react-helmet";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>RSS Feeder</title>
        </Helmet>
        <h1>Hello world from React!</h1>
      </div>
    );
  }
}
