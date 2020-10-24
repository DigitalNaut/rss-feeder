import style from "./Loading.scss";

import * as React from "react";
import anime from "animejs";

function Loading(props) {
  let [content, setContent] = React.useState(props.text || "LOADING");
  let timeline;

  React.useEffect(() => {
    let parsedContent = content.split("").map((item, index) => {
      let classname = item.match(/\S/g) ? "animated" : "";
      return (
        <span className={classname} key={index}>
          {item}
        </span>
      );
    });
    setContent(parsedContent);
  }, [props.text]);

  React.useEffect(() => {
    let duration = 200;
    let stagger = duration * 0.3;

    var targetElm = document.querySelector('.animated')

    timeline = anime
      .timeline({
        targets: ".animated",
        loop: true,
        easing: "linear",
        delay: (el, i) => i * stagger,
      })
      .add({
        duration: duration,
        fontSize: ["0.95em", "1.05em"],
        opacity: [0.3, 1.0],
        toggle: false,
      })
      .add({
        duration: duration * 0.5,
        fontSize: ["1.05em", "0.95em"],
        opacity: [1.0, 0.3],
        toggle: true,
      });
  }, [content]);

  return (
    <div className={style.container}>
      <span>{content}</span>
    </div>
  );
}

export default Loading;
