/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import Countries from 'static/data/countries.json';

const getInitials = string => {
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const toTitleCase = str => {
  return str.replace(/\w\S*/g, function convert(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const getCountries = async () => {
  const test = Countries.map(country => ({
    value: country.code,
    label: country.name
  }));

  return Countries.map(country => ({
    value: country.code,
    label: country.name
  }));
};

const dateCompare = (a, b) => {
  if ((!a && b) || (a && !b)) {
    return false;
  } else if (!a && !b) {
    return true;
  }

  return new Date(a.valueOf()).getTime() === new Date(b.valueOf()).getTime();
};

export { getInitials, getCountries, toTitleCase, dateCompare };
