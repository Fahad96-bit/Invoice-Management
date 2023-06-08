export const ellipsis = (str, characterLimit) => {
  if (typeof str === "string" && str.length >= characterLimit) {
    return `${str.substring(0, characterLimit)}...`;
  }
  return str;
};
