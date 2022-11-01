import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(searchCountryName, DEBOUNCE_DELAY));

function markupCountryList (countries) {
    const markup = countries
        .map(({ name, flags }) => {
            return `<ul>
                <li>
                <img src="${flags.svg}" width="30" height="20" alt="Flag of ${name.official}">
                <h1>${name.official}</h1>
                </li>
            </ul>`;
        })
        .join('');
    countryList.innerHTML = markup;
};

function markupCountryInfo (countries) {
    const { name, capital, population, flags, languages } = countries;
    const markup = `<ul>
                <li>
                <img src="${flags.svg}" width="30" height="20" alt="Flag of ${name.official}">
                <h1>${name.official}</h1>
                </li>
                <li><p><span>Capital: </span>${capital[0]}</p></li>
                <li><p><span>Population: </span>${population}</p></li>
                <li><p><span>Languages: </span>${Object.values(languages)}</p></li>
            </ul>`;
    countryInfo.innerHTML = markup;
};

function searchCountryName() {
    let name = searchBox.value.trim();
    clearInput();
    if (name === '') return;
    fetchCountries(name)
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
                return;
            } else if (countries.length >= 2 && countries.length <= 10) {
                markupCountryList(countries);
            } else if (countries.length === 1) {
                markupCountryInfo(...countries);
            }
        })
         .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
  });
};

function clearInput() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
};