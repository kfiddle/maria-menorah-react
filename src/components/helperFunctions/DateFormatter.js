const DateFormatter = (date) => {
  let dateToReturn = "";

  date[5] === "0"
    ? (dateToReturn = date.slice(6))
    : (dateToReturn = date.slice(5));

  return dateToReturn;
};

export default DateFormatter;
