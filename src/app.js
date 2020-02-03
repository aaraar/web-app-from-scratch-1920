import { renderStations, asyncApiCall } from './NsApi.js'

const stationListEl = document.querySelector ( '.stations--list' )
const stationSearchField = document.querySelector ( '.stations--search-field' );
let nsStations;

asyncApiCall ( 'https://cors-anywhere.herokuapp.com/https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations', {
    mode: 'cors',
    method: 'GET',
    headers: {
        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
    }
} ).then ( data => {
    nsStations = data.payload
    renderStations( stationListEl, nsStations )
} )



stationSearchField.addEventListener ( 'keyup', async () => {
    const query = stationSearchField.value;
    const filteredStations = await nsStations.filter ( station => station.namen.lang.toLowerCase ().includes ( query.toLowerCase () ) )
    renderStations ( stationListEl, filteredStations )
} );
