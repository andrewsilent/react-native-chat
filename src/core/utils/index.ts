import { E164Number, parsePhoneNumber } from 'libphonenumber-js/mobile';

export const validateByRegexp = (value: string, regexp: RegExp) => {
  return regexp.test(value);
};

export const formatUserName = (value: string) => {
  const capitalizeFirstLetter = ([first, ...rest]: string) => first.toUpperCase() + rest.join('');
  const toLowerCase = (value: string) => value.toLowerCase();
  return capitalizeFirstLetter(toLowerCase(value));
};

export const formatUserPhone = (value: E164Number) => {
  return parsePhoneNumber(value as string).formatInternational();
};
