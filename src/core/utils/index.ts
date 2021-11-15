export const validateByRegexp = (value: string, regexp: RegExp) => {
  return regexp.test(value);
};
