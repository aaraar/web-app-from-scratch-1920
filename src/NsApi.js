import { htmlToElement } from './helpers'


export const renderStations = ( listEl, stations ) => {
    listEl.innerHTML = ''
    stations.forEach ( station => {
        const stationEl = htmlToElement ( `<li class="stations--item">
        <h2>${ station.namen.lang }</h2>
        <p>long: ${ station.lng }</p>
        <p>lat: ${ station.lat }</p>
        </li>` )
        listEl.appendChild ( stationEl )
    } )
}