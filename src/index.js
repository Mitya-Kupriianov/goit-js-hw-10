import './css/styles.css';
const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetch/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
};

const { searchBox, countryInfo } = refs;

function inputText(e) {
  const text = e.target.value.trim();

  if (!text) {
    return markupClear();
  }

  fetchCountries(text).then(createMarkup).catch(onError);
}

function createMarkup(data) {
  console.log(data);
  if (data.length > 10) {
    onTen();
  } else if (data.length < 10 && data.length >= 2) {
    onTenTwo(data);
  } else {
    onOne(data);
  }
}
function onTenTwo(data) {
  const markup = data
    .map(object => {
      return /* html*/ `<p style="font-size: 16px"><img src="${object.flags.svg}" alt="flag" width="50" height="50" /> ${object.name.official}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function onOne(data) {
  const markup = data
    .map(object => {
      return /* html*/ `
          <p style="font-size: 36px"><img src="${
            object.flags.svg
          }" alt="flag" width="100" height="100" /> ${object.name.official}</p>
        <p><b>Capital:</b> ${object.capital}</p>
        <p><b>Population:</b> ${object.population}</p>
        <p><b>Languages:</b> ${Object.values(object.languages).join(', ')}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function markupClear() {
  countryInfo.innerHTML = '';
}

function onError() {
  countryInfo.innerHTML = '';
  Notify.failure('Oops, there is no country with that name');
}
function onTen() {
  markupClear();
  Notify.info('Too many matches found. Please enter a more specific name.');
}

searchBox.addEventListener('input', debounce(inputText, DEBOUNCE_DELAY));
