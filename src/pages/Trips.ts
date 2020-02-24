import {Page} from '../Page'
import {Station} from './Station'

export class Trips extends Page {
    private readonly from: Station
    private readonly to: Station
    private trips: Promise<unknown>

    constructor(from, to) {
        super(``)
        this.from = from
        this.to = to
    }

    async init() {
        await this.from
        await this.to
        this.trips = this.getTrips(this.from.code, this.to.code)
    }

    renderDetails = async () => {
        this.render('loading')
        const tripsEl = document.createElement('ul')
        tripsEl.classList.add('trips--list')
        const trips = await this.trips
        // @ts-ignore
        trips.trips.forEach(trip => {
            const item = document.createElement('li')
            const link = document.createElement('a')
            link.href = `/#trip/${encodeURIComponent(trip.ctxRecon)}`
            link.classList.add('trips--item')
            const title = document.createElement('h3')
            const departureTime = document.createElement('p')
            const via = document.createElement('p')
            const stops = trip.legs[0].stops.map(trip => trip.name)
            stops.join(', ')
            via.innerText = `Via ${stops.slice(0, stops.length - 1).join(', ')} & ${stops.slice(stops.length - 1)}`
            title.innerText = trip.legs[0].direction
            departureTime.innerText = new Date(trip.legs[0].origin.plannedDateTime).toLocaleString()
            link.append(title, departureTime, via)
            item.appendChild(link)
            tripsEl.appendChild(item)
        })
        this.markup =
            `
            <section class="trips--wrapper">
                <h2>Trips from ${this.from.name} to ${this.to.name}</h2>
                <div class="trips"></div>
            </section>
           `
        this.render()
        document.querySelector('.trips').appendChild(tripsEl)
    }
}