const DateFormatter = (date) => {
  let dateToReturn = "";

  if (date) {
    date[5] === "0"
      ? (dateToReturn = date.slice(6))
      : (dateToReturn = date.slice(5));

    return dateToReturn;
  } else {
    return "no date";
  }
};

export default DateFormatter;
