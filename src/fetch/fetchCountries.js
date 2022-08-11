const BASIC_URL = `https://restcountries.com/v3.1/name/`;
const FILTER_SEARCH = `?fields=name,capital,population,flags,languages`;

export default function fetchCountries(name) {
  return fetch(`${BASIC_URL}${name}${FILTER_SEARCH}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
