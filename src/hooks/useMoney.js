const useMoney = (totalPennies) => {
  const leftOverCents = totalPennies % 100;
  let displayedCents = '';

  if (leftOverCents === 0) {
    displayedCents = '00';
  } else if (leftOverCents < 10) {
    displayedCents = leftOverCents + '0';
  } else {
    displayedCents = leftOverCents;
  }

  const money = {
    dollars: ~~(totalPennies / 100),
    cents: displayedCents,
  };

  return money;
};

export default useMoney;
