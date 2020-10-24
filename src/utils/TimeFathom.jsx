const SEC = 1000;
const MIN = 60 * SEC;
const HR = 60 * MIN;
const DAY = 24 * HR;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;
const YEAR = 12 * MONTH;

export function FathomBetween(startDate, endDate) {
  let timeDelta = parseInt(Math.abs(endDate - startDate));
  let phrase = timeDelta + "ms";

  if (timeDelta < SEC) {
    phrase = "<0s";
  } else if (timeDelta < 45 * SEC) {
    phrase = `${parseInt(timeDelta / SEC)}m`;
  } else if (timeDelta < 1.25 * MIN) {
    phrase = "<1m";
  } else if (timeDelta < 45 * MIN) {
    phrase = `${parseInt(timeDelta / MIN)}m`;
  } else if (timeDelta < 1.25 * HR) {
    phrase = "<1h";
  } else if (timeDelta < 23 * HR) {
    phrase = `${parseInt(timeDelta / HR)}h`;
  } else if (timeDelta < 1.25 * DAY) {
    phrase = "<1d";
  } else if (timeDelta < 6 * DAY) {
    phrase = `${parseInt(timeDelta / DAY)}d`;
  } else if (timeDelta < 1.25 * WEEK) {
    phrase = "<1 week";
  } else if (timeDelta < 3 * WEEK) {
    phrase = `${parseInt(timeDelta / WEEK)} weeks`;
  } else if (timeDelta < 1.25 * MONTH) {
    phrase = "<1 month";
  } else if (timeDelta < 11 * MONTH) {
    phrase = `${parseInt(timeDelta / MONTH)} months`;
  } else if (timeDelta < 1.5 * YEAR) {
    phrase = "<1 year";
  } else if (timeDelta >= 1.5 * YEAR) {
    phrase = `${parseInt(timeDelta / YEAR)} years`;
  } else {
    phrase = "unknown";
  }

  return phrase;
}

export function FathomSince(startDate) {
  let timeDelta = parseInt(Math.abs(startDate - Date.now()));
  let phrase = timeDelta + "ms";

  if (timeDelta < SEC) {
    phrase = "just now";
  } else if (timeDelta < 1.25 * MIN) {
    phrase = "a minute ago";
  } else if (timeDelta < 5 * MIN) {
    phrase = "a moment ago";
  } else if (timeDelta < 45 * MIN) {
    phrase = "nearly an hour ago";
  } else if (timeDelta < 1.25 * HR) {
    phrase = "about an hour ago";
  } else if (timeDelta < 23 * HR) {
    phrase = "less than a day ago";
  } else if (timeDelta < 23 * HR) {
    phrase = "a few hours ago";
  } else if (timeDelta < DAY) {
    phrase = "a day ago";
  } else if (timeDelta < 6 * DAY) {
    phrase = "less than a week ago";
  } else if (timeDelta < WEEK) {
    phrase = "a week ago";
  } else if (timeDelta < 3 * WEEK) {
    phrase = "some weeks ago";
  } else if (timeDelta < MONTH) {
    phrase = "a month ago";
  } else if (timeDelta < 3 * MONTH) {
    phrase = "some months ago";
  } else if (timeDelta < 11 * MONTH) {
    phrase = "several months ago";
  } else if (timeDelta < 1.5 * YEAR) {
    phrase = "a year ago";
  } else if (timeDelta >= 1.5 * YEAR) {
    phrase = "a long time ago";
  } else return "unknown when";

  return phrase;
}

export default { FathomSince, FathomBetween };
