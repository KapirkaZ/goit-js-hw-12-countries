import countryTable from '../template/country-table.hbs';
import fetchCountries from './fetchCountries';
import refs from './references';

export default function selectCountry(e, input, list) {
    if (e.target.nodeName === 'LI') {
        input.value = e.target.textContent;
        list.innerHTML = '';
        list.hidden = true;

        fetchCountries(input.value).then(data => {
            input.value = '';
            return (refs.wrapper.innerHTML = countryTable(...data));
        });
    }
}
