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
        endpoint: string,
        requestObject: RequestObject,
        queries: [string[]] = [['']]): Promise<object> {
        const queryArray: string[] = queries.map(query => query.join('='))
        const query: string = queryArray.join('&')
        return new Promise((resolve, reject) => {
            fetch(`https://cors-anywhere.herokuapp.com/https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/${endpoint}?${query}`, requestObject).then(res => {
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
                    'stations',
                    {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    }).then((res: Response) => {
                    localStorage.setItem('stations', JSON.stringify(res.payload))
                    this.rawStations = res.payload
                    resolve(this.rawStations)
                })
            }
        })
    }

    getArrivals(code) {
        return new Promise((resolve, reject) => {
            console.log(code)
            this.fetch(
                'arrivals', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', code]]).then(res => {
                    console.log(res)
                resolve(res)
            })
        })
    }

    getDepartures(code) {
        return new Promise((resolve, reject) => {
            this.fetch(
                'departures', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', code]]).then(res => {
                resolve(res)
            })
        })
    }
}