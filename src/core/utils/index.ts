export const validateByRegexp = (value: string, regexp: RegExp) => {
  return regexp.test(value);
};

export const formatUserName = (value: string) => {
  const capitalizeFirstLetter = ([first, ...rest]: string) => first.toUpperCase() + rest.join('');
  const toLowerCase = (value: string) => value.toLowerCase();
  return capitalizeFirstLetter(toLowerCase(value));
};
