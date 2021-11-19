import { E164Number, parsePhoneNumber } from 'libphonenumber-js/mobile';
import { getCountriesAsync } from 'react-native-country-picker-modal/lib/CountryService';
import { FlagType } from 'react-native-country-picker-modal';
import { Country } from 'react-native-country-picker-modal/lib/types';
import { find } from 'lodash';

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

/**
 * Functions generates 'amount' random users from "https://randomuser.me/"
 */
export const getRandomUsers = async (amount: number) => {
  try {
    const countries = (await getCountriesAsync(FlagType.FLAT)) as unknown as Country[];
    const usersAmount = Math.floor(Math.random() + amount);
    const users = await fetch(`https://randomuser.me/api/?results=${usersAmount}`).then(data => data.json());

    const result = users.results.map(
      (user: {
        name: { first: string; last: string };
        location: { country: string };
        cell: string;
        picture: { large: string };
      }) => {
        const userCountryObject = find(countries, { name: user.location.country }) as unknown as Country;
        if (userCountryObject) {
          return {
            firstName: user.name.first,
            lastName: user.name.last,
            phoneNumber: {
              number: `+${userCountryObject.callingCode[0]}${user.cell}`,
              country: userCountryObject.cca2,
              nationalNumber: user.cell,
              countryCallingCode: userCountryObject.callingCode[0],
            },
            userPhoto: user.picture.large,
          };
        }
      }
    );
    return result;
  } catch (error) {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('There is an error: ', error);
    }
  }
};
