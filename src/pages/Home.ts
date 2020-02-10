import {Page} from '../Page'
import {Stations} from '../Stations'

export class Home {
    markup: string
    stationListEl: HTMLElement
    stationsSearchField: HTMLElement
    stationsWrapper: HTMLElement
    loadingAnimation: HTMLElement
    Stations: Stations

    constructor(Stations) {
        this.Stations = Stations
        this.markup =
            `<section class="stations--wrapper">
            <h2>NS stations in Nederland</h2>
            <form action="">
                <input type="text" class="stations--search-field" placeholder="Search for a station">
                <button>search</button>
            </form>
            <img class="stations--loading" src="img/loading.svg" alt="Loading icon">
            <ul class="stations--list">
            </ul>
        </section>`
    }

    render() {
        new Page(this.markup).render()
        this.stationListEl = document.querySelector('.stations--list')
        this.stationsSearchField = document.querySelector('.stations--search-field')
        this.stationsWrapper = document.querySelector('.stations--wrapper')
        this.loadingAnimation = document.querySelector('.stations--loading')
        this.renderStations()
    }
    renderStations() {
        this.Stations.getAll().then( stations => {
            this.stationsWrapper.removeChild(this.loadingAnimation)
            this.Stations.render(this.stationListEl, stations.payload)
            this.addFilter()
        })
    }

    addFilter() {
        this.stationsSearchField.addEventListener('keyup', async () => {
            // @ts-ignore
            const query = this.stationsSearchField.value
            const filteredData = await this.Stations.filterByNames(query)
            this.Stations.render(this.stationListEl, filteredData)
        })
    }
}