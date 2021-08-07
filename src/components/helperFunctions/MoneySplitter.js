const MoneySplitter = (numberString) => {
  const splitMoney = numberString.split(".");
  let penniesToSend = 0;

  if (splitMoney.length > 1) {
    penniesToSend = splitMoney[0] * 100 + +splitMoney[1];
  } else {
    penniesToSend = splitMoney[0] * 100;
  }

  return penniesToSend;
};

export default MoneySplitter;
