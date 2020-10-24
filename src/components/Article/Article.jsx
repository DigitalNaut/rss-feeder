import style from "./Article.scss";
import React from "react";

import { FathomSince } from "Utility/TimeFathom.jsx";

function pauseAll() {
  let audios = Array.from(document.querySelectorAll("video"));
  let videos = Array.from(document.querySelectorAll("audio"));
  let elements = audios.concat(videos);

  elements.forEach((item) => {
    console.log("Working with item audio/video:", item);
    if (item && item != this) item.pause();
  });
}

function Article(props) {
  return (
    <div className={style.container}>
      <a href={props.link} className={style.button}>
        <h3 className={style.header}>
          {props.title}
          <p>
            <span className={style.subheader}>
              Posted <i>{props.date && FathomSince(Date.parse(props.date))}</i>{" "}
              by <i>{props.creator}</i>
            </span>
          </p>
        </h3>
      </a>
      {props.children.props.inputData && (
        <div className={style.content}>
          {props.heroSrc &&
            (props.heroSrc.type.match(/image/g) ||
              props.heroSrc.url.match(
                /\.(webp|bmp|ico|cur|jpg|jpeg|png|apng|tif|tiff|jiff|jfif|pjpeg|pjp|svg|gif)$/g
              )) && (
              <a href={props.link} className={style.button}>
                <img
                  className={style.image}
                  src={(props.heroSrc && props.heroSrc.url) || ""}
                  type={(props.heroSrc && props.heroSrc.type) || ""}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </a>
            )}
          {props.heroSrc && props.heroSrc.type.match(/video/g) && (
            <video
              controls
              className={style.video}
              onPlay={({ target }) => {
                pauseAll.bind(target)();
              }}
              onError={(e) => (e.target.style.display = "none")}
            >
              <source
                src={props.heroSrc.url}
                type={props.heroSrc.type}
                length={props.heroSrc.length}
              />
            </video>
          )}

          <div className={style.main}>
            {props.heroSrc && props.heroSrc.type.match(/audio/g) && (
              <audio
                controls
                className={style.audio}
                onPlay={({ target }) => {
                  pauseAll.bind(target)();
                }}
                onError={(e) => (e.target.style.display = "none")}
              >
                <source
                  src={props.heroSrc.url}
                  type={props.heroSrc.type}
                  length={props.heroSrc.length}
                />
              </audio>
            )}
            {props.children}
          </div>
        </div>
      )}
      <div className={style.footer}>{props.footer}</div>
    </div>
  );
}

export default Article;
