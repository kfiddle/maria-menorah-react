const useMoney = (totalPennies) => {
  const leftOverCents = totalPennies % 100;

  const money = {
    dollars: ~~(totalPennies / 100),
    cents: leftOverCents === 0 ? "00" : leftOverCents,
  };

  return money;
};

export default useMoney;
