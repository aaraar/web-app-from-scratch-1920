import {Page} from '../Page'

export class Trip extends Page {
    private readonly ctxRecon: string
    private trip: Promise<unknown>
    constructor(ctxRecon) {
        super('');
        this.ctxRecon = ctxRecon
    }
    async init() {
        this.trip = this.getTrip(this.ctxRecon)
    }
    renderDetails = async () => {
        this.render('loading')
        const trip = await this.trip
        const legs = trip.legs.map(leg =>
            `<div class="trip--leg">
                <h3>${leg.origin.name} - Departure ${new Date(leg.origin.actualDateTime).toLocaleTimeString().slice(0, 5)}</h3>
                ${leg.stops.map((stop, index) => index === 0 || index === leg.stops.length -1 ?
                '' :
                `<p>${stop.name} - ${new Date(stop.plannedArrivalDateTime).toLocaleTimeString().slice(0,5)}</p>`).join('')}
                <h3>${leg.destination.name} - Arrival: ${new Date(leg.destination.actualDateTime).toLocaleTimeString().slice(0, 5)}</h3>
            </div>`)
        this.markup =
            `
            <h2>Trip from ${trip.legs[0].origin.name} to ${trip.legs[0].destination.name}</h2> 
            ${legs.join(' Transfer ')}
        `
        this.render()
    }
}