import {asyncApiCall} from "./helpers";
import {Station} from "./pages/Station";

export class Stations {
    async getAll() {
        return await this.getDataFromApi()
    }
    async getDataFromApi() {
        if (localStorage.getItem('stations')) {
            return JSON.parse(localStorage.getItem('stations'))
        }
        else {
            return new Promise((resolve, reject) => {
                asyncApiCall(
                    'stations',
                    {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    }).then( res => {
                    localStorage.setItem('stations', JSON.stringify(res))
                    resolve(res)
                })
            })
        }
    }
    render (listEl, stations) {
        while (listEl.firstChild) listEl.removeChild(listEl.firstChild); // empties the ul
        stations.forEach(station => {
            const listItem = document.createElement('li')
            const heading = document.createElement('h3')
            const country = document.createElement('p')
            let countryName
            listItem.classList.add('stations--item')
            listItem.setAttribute('data-station-code', station.code)
            listItem.setAttribute('data-station-name', station.namen.lang)
            heading.innerText = station.namen.lang
            switch (station.land) {
                case "NL":
                    countryName = 'Nederland'
                    break
                case "D":
                    countryName = 'Duitsland'
                    break
                case "B":
                    countryName = "België"
                    break
                case "F":
                    countryName = "Frankrijk"
                    break
                case "GB":
                    countryName = "Groot-Britannië"
                    break
                case "A":
                    countryName = "Oostenrijk"
                    break
                case "CH":
                    countryName = "Zwitserland"
                    break
            }
            country.innerText = `${countryName}`
            listItem.append(heading, country)
            listEl.appendChild(listItem)
        })
    }
    giveStationsDetails = (listEl) => {
        listEl.addEventListener('click', (event) => {
            const clickedStation = event.target.closest('li')
            const station = new Station(clickedStation.dataset.stationCode, clickedStation.dataset.stationName)
        })
    }
}