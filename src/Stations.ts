import {asyncApiCall} from './helpers'
import {Station} from './pages/Station'
import {type} from 'os'

export class Stations {
    async getAll() {
        return await this.getDataFromApi()
    }

    async getDataFromApi() {
        if (localStorage.getItem('stations')) {
            return JSON.parse(localStorage.getItem('stations'))
        } else {
            return new Promise((resolve, reject) => {
                asyncApiCall(
                    'stations',
                    {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    }).then(res => {
                    console.log(res)
                    localStorage.setItem('stations', JSON.stringify(res))
                    resolve(res)
                })
            })
        }
    }

    render(listEl, stations) {
        // @ts-ignore
        if (!listEl instanceof Element || !listEl instanceof HTMLDocument) throw 'listEl is not an HTML element'// https://stackoverflow.com/a/36894871
        if (!stations[0]) throw 'stations is not an array'
        while (listEl.firstChild) listEl.removeChild(listEl.firstChild) // empties the ul
        stations.forEach(station => {
            const listItem = document.createElement('li')
            const link = document.createElement('a')
            const heading = document.createElement('h3')
            const country = document.createElement('p')
            let countryName
            listItem.classList.add('stations--item')
            link.setAttribute('href', `#stations/${station.code}`)
            listItem.setAttribute('data-station-name', station.namen.lang)
            heading.innerText = station.namen.lang
            switch (station.land) {
                case 'NL':
                    countryName = 'Nederland'
                    break
                case 'D':
                    countryName = 'Duitsland'
                    break
                case 'B':
                    countryName = 'België'
                    break
                case 'F':
                    countryName = 'Frankrijk'
                    break
                case 'GB':
                    countryName = 'Groot-Britannië'
                    break
                case 'A':
                    countryName = 'Oostenrijk'
                    break
                case 'CH':
                    countryName = 'Zwitserland'
                    break
            }
            country.innerText = `${countryName}`
            link.append(heading, country)
            listItem.append(link)
            listEl.appendChild(listItem)
        })
    }

    filterByNames(query) {
        return new Promise((resolve, reject) => {
            this.getAll().then(stations => {
                resolve(stations.payload.filter(station => station.namen.lang.toLowerCase().includes(query.toLowerCase())))
            })
        })
    }

    reduceByCode(code) {
        return new Promise((resolve, reject) => {
            this.getAll().then(stations => {
                resolve(stations.payload.reduce((acc, curr) => acc = curr.code === code ? curr : acc))
            })
        })
    }
}