export const asyncApiCall = async ( url, requestObject ) => {
    const res = fetch ( url, requestObject )
    return ( await res ).json()
}

const htmlToElement = ( markup ) => {
    var templateEl = document.createElement ( 'template' );
    markup = markup.trim (); // Never return a text node of whitespace as the result
    templateEl.innerHTML = markup;
    return templateEl.content.firstChild;
}


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