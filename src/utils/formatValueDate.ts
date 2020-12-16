const formatValueDate = (date: string): string => {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const newDate = new Date('2020-12-15T04:13:31.081Z');
  const dateFormated = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  return dateFormated;
}

export default formatValueDate;
