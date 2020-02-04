import {Page} from '../Page'
import {asyncApiCall} from "../helpers";
import {Stations} from "../Stations";

export class Home {
    markup: string
    stationListEl: HTMLElement
    stationsSearchField: HTMLElement
    stationsWrapper: HTMLElement
    loadingAnimation: HTMLElement
    nsStations: object[]
    Stations = new Stations

    constructor() {
        this.Stations = new Stations
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
        this.getNsData()
    }

    getNsData() {
        asyncApiCall(
            'stations',
            {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                }
            }).then(res => {
            // @ts-ignore
            this.nsStations = res.payload
            this.Stations.renderStations(this.stationListEl, this.nsStations)
            this.stationsWrapper.removeChild(this.loadingAnimation)
            this.Stations.giveStationsDetails(this.stationListEl)
            this.handleSearch()
        }).catch(err => {
            console.error(err)
        })
    }

    handleSearch() {
        this.stationsSearchField.addEventListener('keyup', async () => {
            // @ts-ignore
            const searchQuery = this.stationsSearchField.value
            const filteredStations = await this.nsStations.filter(station => station.namen.lang.toLowerCase().includes(searchQuery.toLowerCase()))
            this.Stations.renderStations(this.stationListEl, filteredStations)
        })
    }
}