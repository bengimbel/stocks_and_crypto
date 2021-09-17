export const getYesterdayDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.toDateString();
  const date = yesterday.toISOString().split('T')[0]
  return date;
};
