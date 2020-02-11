import {Page} from '../Page'
import {Stations} from '../Stations'
import {Station} from './Station'

export class Home extends Page {
    private stationListEl: HTMLElement
    private stationsSearchField: HTMLElement & { value: string }
    private stationsWrapper: HTMLElement
    private Stations: Stations
    private readonly searchFieldMarkup: string

    constructor(Stations) {
        super('')
        this.Stations = Stations
        this.searchFieldMarkup =
            `<form action="">
                    <input type="text" class="stations--search-field" placeholder="Search for a station">
                    <button>search</button>
             </form>`
    }

    init() {
        this.render('loading')
    }

    renderStations() {
        this.Stations.getAll().then((stations: Station[]) => {
            this.render('markup',
                `<section class="stations--wrapper">
                <h2>NS stations in Nederland</h2>
                <ul class="stations--list">
                </ul>
                </section>`)
            this.stationListEl = document.querySelector('.stations--list')
            this.stationsWrapper = document.querySelector('.stations--wrapper')
            document.querySelector('h2').insertAdjacentHTML('afterend', this.searchFieldMarkup)
            this.stationsSearchField = document.querySelector('.stations--search-field')
            this.Stations.render(this.stationListEl, stations)
            this.addFilter()
        })
    }

    addFilter() {
        this.stationsSearchField.addEventListener('keyup', async () => {
            const query = this.stationsSearchField.value
            const filteredData: Station[] = await this.Stations.filterByNames(query)
            console.log(filteredData)
            this.Stations.render(this.stationListEl, filteredData)
        })
    }
}