import style from "./Loading.scss";

import * as React from "react";

function Loading(props) {
  return props.showComponent && <div className={style.main} >Loading...</div>;
}

export default Loading;
