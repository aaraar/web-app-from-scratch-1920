import { renderStations } from './NsApi.js'
import { asyncApiCall } from "./helpers";
import './scss/main.scss'

const stationListEl = document.querySelector ( '.stations--list' )
const stationSearchField = document.querySelector ( '.stations--search-field' );
let nsStations;

asyncApiCall ( 'https://cors-anywhere.herokuapp.com/https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations', {
    method: 'GET',
    headers: {
        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
    }
} ).then ( res => {
    nsStations = res.payload
    renderStations ( stationListEl, nsStations )
} ).catch ( err => {
    console.error ( err )
} )


stationSearchField.addEventListener ( 'keyup', async () => {
    const query = stationSearchField.value;
    const filteredStations = await nsStations.filter ( station => station.namen.lang.toLowerCase ().includes ( query.toLowerCase () ) )
    renderStations ( stationListEl, filteredStations )
} );
