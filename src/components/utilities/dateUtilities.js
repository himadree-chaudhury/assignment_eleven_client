const checkAvailability = (fromDate, toDate) => {
  const today = new Date();
  const from = new Date(fromDate);
  const to = new Date(toDate);

  return today >= from && today <= to;
};

const dateFormat = (date) => {
  return date.split("-").reverse().join("/");
};

export { checkAvailability, dateFormat };
