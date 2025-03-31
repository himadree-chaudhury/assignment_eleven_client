const checkAvailability = (fromDate, toDate) => {
  const today = new Date();
  const from = new Date(fromDate);
  const to = new Date(toDate);

  return today >= from && today <= to;
};

export { checkAvailability };
