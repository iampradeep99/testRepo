export const numberWithCommas = (x) => {
  return parseFloat(x).toLocaleString("en-IN");
};

export const maskMobileNumber = (number) => {
  return "xxxxx" + number.slice(-5);
};
