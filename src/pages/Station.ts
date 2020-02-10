import {asyncApiCall} from '../helpers'
import {Page} from '../Page'

export class Station {
    code: string
    arrivals: Promise<unknown>
    markup: string
    name: string
    departures: Promise<unknown>

    constructor(code, name) {
        this.code = code
        this.name = name
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
    async render() {
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
        new Page(this.markup).render()
        document.querySelector('.station--wrapper').appendChild(listEl)
    }
}