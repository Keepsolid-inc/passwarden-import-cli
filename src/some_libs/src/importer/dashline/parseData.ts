import { DateTime } from "luxon";

const parseDashlineDate = (date: any) => {
  if (date) {
    const numDate = parseInt(date);
    if (isNaN(numDate)) {
      return parseDashlineDateWords(date);
    } else {
      return parseDashlineDateNumber(date);
    }
  } else {
    return 0;
  }
};

const parseDashlineDateNumber = (date: any) => {
  const tmp = date.split("-");
  const parsedTmp = DateTime.fromObject({
    year: tmp[0],
    month: tmp[1],
    day: tmp[2],
  }).toSeconds();
  return parsedTmp;
};

const parseDashlineDateWords = (date: any) => {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const tmp = date.split(" ");
  const parsedTmp = DateTime.fromObject({
    year: tmp[2],
    month: monthArr.indexOf(tmp[0]) + 1,
    day: tmp[1].slice(0, -1),
  }).toSeconds();
  return parsedTmp;
};

export = (module.exports = parseDashlineDate);
