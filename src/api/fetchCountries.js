import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
    return fetch(
        `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
    )
        .then(response => {
    if (response.ok) {
        return response.json();
    }
        throw new Error(response.status);
  })
    .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        return error;
  });
};

export { fetchCountries };