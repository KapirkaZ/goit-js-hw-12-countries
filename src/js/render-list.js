// Import Templates
import dropdownList from '../template/dropdown-list.hbs';
import countryTable from '../template/country-table.hbs';

// Import debounce
import debounce from 'lodash.debounce';

// Import PNotify
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'material-design-icons/iconfont/material-icons.css';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

// Import Functions
import fetchCountries from './fetchCountries';
import selectCountry from './select-country';
import dataClean from './data-clean';

// Import Variables
import refs from './references';
refs.dropdown.hidden = true;

// Event Handlers
refs.inputCountrySearch.addEventListener('input', debounce(renderList, 500));
refs.dropdown.addEventListener('click', e =>
    selectCountry(e, refs.inputCountrySearch, refs.dropdown),
);

// Functions
function renderList(e) {
    PNotify.removeAll();
    refs.dropdown.hidden = true;
    const userRequest = e.target.value;
    refs.inputCountrySearch.innerHTML = '';

    if (userRequest.length < 1) {
        dataClean(refs.dropdown, refs.wrapper);
        return;
    }

    fetchCountries(userRequest).then(data => {
        if (!data) {
            return;
        }

        if (data.length >= 2 && data.length <= 10) {
            refs.dropdown.hidden = false;
            dataClean(refs.dropdown, refs.wrapper);

            const markup = data.map(country => dropdownList(country)).join('');
            return refs.dropdown.insertAdjacentHTML('beforeend', markup);
        }

        if (data.length === 1) {
            refs.inputCountrySearch.value = '';
            PNotify.success({
                title: 'Found!',
                text: 'Well done!',
            });

            return (refs.wrapper.innerHTML = countryTable(...data));
        }

        PNotify.error({
            title: 'Oh No!',
            text: 'Too many matches found. Please enter a more specific query',
        });
    });
}

function renderList(e) {
    PNotify.removeAll();
    refs.dropdown.hidden = true;
    const userRequest = e.target.value;
    refs.inputCountrySearch.innerHTML = '';

    if (userRequest.length < 1) {
        dataClean(refs.dropdown, refs.wrapper);
        return;
    }

    fetchCountries(userRequest).then(data => {
        if (!data) {
            return;
        }

        if (data.length >= 2 && data.length <= 10) {
            refs.dropdown.hidden = false;

            const markup = data.map(country => dropdownList(country)).join('');
            return refs.dropdown.insertAdjacentHTML('beforeend', markup);
        }

        if (data.length === 1) {
            PNotify.success({
                title: 'Found!',
                text: 'Well done!',
            });

            return (refs.wrapper.innerHTML = countryTable(...data));
        }
    });
}
