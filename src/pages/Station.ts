import {asyncApiCall} from '../helpers'
import {Page} from '../Page'

export type CountryCode = 'ERROR' | 'NL' | 'D' | 'B' | 'F' | 'GB' | 'A' | 'CH'

export class Station extends Page {
    code: string
    private arrivals: Promise<{}> | {
        payload?: {
            arrivals: [{
                origin: string
            }]
        }
    }
    private departures: Promise<{}> | {}
    readonly name: string
    private readonly country: any
    countryCode: CountryCode

    constructor(station: {code: string, namen:{lang: string}, land: CountryCode}) {
        super('')
        this.code = station.code
        this.name = station.namen.lang
        this.countryCode = station.land
        switch (station.land) {
            case 'ERROR':
                this.country = 'Try redefining your search'
                break
            case 'NL':
                this.country = 'The Netherlands'
                break
            case 'D':
                this.country = 'Germany'
                break
            case 'B':
                this.country = 'Belgium'
                break
            case 'F':
                this.country = 'France'
                break
            case 'GB':
                this.country = 'Great-Britain'
                break
            case 'A':
                this.country = 'Austria'
                break
            case 'CH':
                this.country = 'Switzerland'
                break
        }
        this.markup =
            `<li class="stations--item">
                <a href="/#stations/${this.code}">
                    <h3>${this.name}</h3>
                    <p>${this.country}</p>
                </a>
            </li>`
    }

    async getArrivals() {
        return await this.initArrivalData()
    }

    async getDepartures() {
        return await this.initDepartureData()
    }

    async initArrivalData() {
        return new Promise((resolve, reject) => {
            asyncApiCall(
                'arrivals', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', this.code]]).then(res => {
                resolve(res)
            })
        })
    }

    async initDepartureData() {
        return new Promise((resolve, reject) => {
            asyncApiCall(
                'departures', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', this.code]]).then(res => {
                resolve(res)
            })
        })
    }

    async renderDetails() {
        this.render('loading')
        const listEl = document.createElement('ul')
        this.arrivals = await this.getArrivals()
        this.departures = await this.getDepartures()
        this.arrivals.payload.arrivals.forEach(arrival => {
            const item = document.createElement('li')
            item.innerText = arrival.origin
            listEl.appendChild(item)
        })
        this.markup =
            `
            <section class="station--wrapper">
                <h2>${this.name}</h2>
                <h3>Arrivals</h3>
            </section>
           `
        this.render()
        document.querySelector('.station--wrapper').appendChild(listEl)
    }
}