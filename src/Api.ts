import {CountryCode} from './pages/Station'

type Response = {
    payload?: {
        code: string,
        namen: {
            lang: string
        },
        land: CountryCode
    }[]
}

export type DeparturesResponse = {
    payload?: {
        departures: {
            direction: string,
            routeStations: [
                { mediumName: string }
            ]
        }[]
    }
}

export type ArrivalsResponse = {
    payload?: {
        arrivals: {
            origin: string
        }[]
    }
}

interface RequestObject {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'UPDATE'
    mode?: 'cors' | 'no-cors' | 'same-origin'
    cache?: 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'
    credentials?: 'same-origin' | 'include' | 'omit'
    headers?
    body?
}

export class Api {
    private rawStations: { code: string; namen: { lang: string }; land: CountryCode }[]

    async fetch(
        baseUrl: string,
        endpoint: string,
        requestObject: RequestObject,
        queries: string[][] = [['']]): Promise<object> {
        const queryArray: string[] = queries.map(query => query.join('='))
        const query: string = queryArray.join('&')
        return new Promise((resolve, reject) => {
            fetch(`https://cors-anywhere.herokuapp.com/${baseUrl}${endpoint}?${query}`, requestObject)
                .then(res => {
                if (res.ok) resolve(res.json())
                else reject(res)
            })
        })
    }

    getStations() {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem('stations')) {
                this.rawStations = JSON.parse(localStorage.getItem('stations'))
                resolve(this.rawStations)
            } else {
                this.fetch(
                    'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/',
                    'stations',
                    {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    })
                    .then((res: Response) => {
                    localStorage.setItem('stations', JSON.stringify(res.payload))
                    this.rawStations = res.payload
                    resolve(this.rawStations)
                })
            }
        })
    }

    getArrivals(code) {
        return new Promise((resolve, reject) => {
            this.fetch(
                'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/',
                'arrivals', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', code]])
                .then((res: ArrivalsResponse) => {
                resolve(res)
            })
        })
    }

    getDepartures(code) {
        return new Promise((resolve, reject) => {
            this.fetch(
                'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/',
                'departures', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', code]])
                .then((res: DeparturesResponse) => {
                resolve(res)
            })
        })
    }

    getTrips(from, to) {
        return new Promise((resolve, reject) => {
            this.fetch(
                'https://gateway.apiportal.ns.nl/public-reisinformatie/api/v3/',
                'trips', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'd73085e5fa2641af8bd36c1c75b12387'
                    }
                }, [['fromStation', from.toLowerCase()], ['toStation', to.toLowerCase()]])
                .then((res) => {
                resolve(res)
            })
        })
    }

    // https://gateway.apiportal.ns.nl/public-reisinformatie/api/v3/trips/trip?ctxRecon=arnu%7CfromStation%3D8400058%7CtoStation%3D8400285%7CplannedFromTime%3D2020-02-24T13%3A50%3A00%2B01%3A00%7CplannedArrivalTime%3D2020-02-24T14%3A05%3A00%2B01%3A00%7CyearCard%3Dfalse%7CexcludeHighSpeedTrains%3Dfalse&lang=nl&travelClass=2
    getTrip(ctxRecon) {
        return new Promise((resolve, reject) => {
            this.fetch(
                'https://gateway.apiportal.ns.nl/public-reisinformatie/api/v3/',
                'trips/trip', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'd73085e5fa2641af8bd36c1c75b12387'
                    }
                }, [['ctxRecon', encodeURIComponent(ctxRecon)], ['lang', 'en'], ['travelClass', '2']])
                .then(res => {
                resolve(res)
            })
        })
    }
}