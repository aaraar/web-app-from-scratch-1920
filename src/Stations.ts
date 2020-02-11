import {asyncApiCall} from './helpers'
import {Station} from './pages/Station'

type Response =   {
    payload?: Station[]
    }

export class Stations {
    private readonly stations: Station[]

    constructor() {
        this.stations = []
    }

    async getAll() {
        return await this.getDataFromApi()
    }

    getDataFromApi = async () => {
        return new Promise((resolve, reject) => {
        if (localStorage.getItem('stations')) {
            const stations = JSON.parse(localStorage.getItem('stations'))
            stations.forEach( station => {
                this.stations.push(new Station(station))
            })
            resolve(this.stations)
        } else {
                asyncApiCall(
                    'stations',
                    {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    }).then( (res: Response) => {
                    localStorage.setItem('stations', JSON.stringify(res.payload))
                    res.payload.forEach(station => {
                        this.stations.push(new Station(station))
                    })
                    resolve(this.stations)
                })
            }
        })
    }

    render(listEl: HTMLElement, stations: Station[], limit: number = 20) {
        // @ts-ignore
        if (!listEl instanceof Element || !listEl instanceof HTMLDocument) throw 'listEl is not an HTML element'// https://stackoverflow.com/a/36894871
        if (!stations[0]) throw 'stations is not an array'
        while (listEl.firstChild) listEl.removeChild(listEl.firstChild) // empties the ul
        console.log(stations)
        stations.forEach(station => {
            // const listItem = document.createElement('li')
            // const link = document.createElement('a')
            // const heading = document.createElement('h3')
            // const country = document.createElement('p')
            // listItem.classList.add('stations--item')
            // link.setAttribute('href', `#stations/${station.code}`)
            // listItem.setAttribute('data-station-name', station.name)
            // heading.innerText = station.name
            // country.innerText = station.country
            // link.append(heading, country)
            // listItem.append(link)
            // listEl.appendChild(listItem)
            station.render('markup', station.markup, listEl, 'beforeend', false)
        })
    }

    filterByNames(query): Promise<Station[]> {
        return new Promise((resolve, reject) => {
            this.getAll().then( (stations: Station[]) => {
                resolve(stations.filter((station) => station.name.toLowerCase().includes(query.toLowerCase())))
            })
        })
    }

    reduceByCode(code) {
        return new Promise((resolve, reject) => {
            this.getAll().then((stations: Station[]) => {
                resolve(stations.reduce((acc, curr) => acc = curr.code === code ? curr : acc))
            })
        })
    }
}