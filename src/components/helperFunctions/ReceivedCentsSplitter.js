const ReceivedCentsSplitter = (totalPennies) => {
  let dollars = ~~(totalPennies / 100);
  let cents = totalPennies % 100;
  if (cents === 0) {
    return dollars + "." + "00";
  } else if (cents < 10) {
    return dollars + "." + cents + "0";
  } else {
    return dollars + "." + cents;
  }
};

export default ReceivedCentsSplitter;
