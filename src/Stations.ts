import {asyncApiCall} from './helpers'
import {Station, CountryCode} from './pages/Station'

type Response = {
    payload?: {
        code: string,
        namen: {
            lang: string
        },
        land: CountryCode
    }[]
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
                stations.forEach(station => {
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
                    }).then((res: Response) => {
                    localStorage.setItem('stations', JSON.stringify(res.payload))
                    res.payload.forEach((station) => {
                        this.stations.push(new Station(station))
                    })
                    resolve(this.stations)
                })
            }
        })
    }

    render(listEl: HTMLElement, stations: Station[], country = 'NL') {
        // @ts-ignore
        if (!listEl instanceof Element || !listEl instanceof HTMLDocument) throw 'listEl is not an HTML element'// https://stackoverflow.com/a/36894871
        if (!stations[0]) {
            stations[0] = new Station({code: 'ERROR', namen: {lang: 'No stations found'}, land: 'ERROR'})
        }
        while (listEl.firstChild) listEl.removeChild(listEl.firstChild) // empties the ul
        stations.forEach(station => {
            station.render('markup', station.markup, listEl, 'beforeend', false)
        })
    }

    filter(stations: Station[] = [], query: string = '', country: string = 'NL', limit: number = 20): Promise<Station[]> {
        return new Promise((resolve, reject) => {
            if (!stations[0]) {
                console.error('Empty station array in filter')
                this.getAll().then((res: Station[]) => {
                    filter(res)
                })
            } else filter(stations)

            function filter(stationArray) {
                resolve(stationArray.filter((station) =>
                    station.name.toLowerCase().includes(query.toLowerCase())
                    && (station.countryCode === country || country === 'ALL')).slice(0, limit))
            }
        })
    }
}