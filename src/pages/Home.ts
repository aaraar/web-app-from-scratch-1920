import {Page} from '../Page'
import {Stations} from '../Stations'
import {Station} from './Station'

export class Home extends Page {
    private stationListEl: HTMLElement
    private stationsSearchField: HTMLElement & { value: string }
    private stationsWrapper: HTMLElement
    private Stations: Stations
    private stations: Station[]
    private readonly filterMarkup: string
    private limit: number
    private stationsLimitSelect: HTMLElement & {value: number}
    private stationsCountry: HTMLElement & {value: string}

    constructor(Stations) {
        super('')
        this.Stations = Stations
        this.limit = 20
        this.filterMarkup =
            `<form action="" class="stations-form">
                    <label for="stations-search-field">
                        Search:
                        <input type="text" name="stations-search-field" placeholder="Search a station" id="stations-search-field">
                    </label>
                    <label for="stations-limit">
                        Results
                        <select name="stations-limit" id="stations-search-limit">
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                        </select>
                    </label>
                    <label for="stations-country">
                        From
                        <select name="stations-country" id="stations-search-country">
                            <option value="NL">The Netherlands</option>
                            <option value="B">Belgium</option>
                            <option value="D">Germany</option>
                            <option value="F">France</option>
                            <option value="A">Austria</option>
                            <option value="CH">Switzerland</option>
                            <option value="GB">Great-Britain</option>
                            <option value="ALL">All</option>
                        </select>
                    </label>
             </form>`
    }

    init() {
        this.render('loading')
    }

    renderStations() {
        this.Stations.getAll().then( async (stations: Station[]) => {
            this.stations = stations;
            this.render('markup',
                `<section class="stations--wrapper">
                <h2>NS stations in Nederland</h2>
                <ul class="stations--list">
                </ul>
                </section>`)
            this.stationListEl = document.querySelector('.stations--list')
            this.stationsWrapper = document.querySelector('.stations--wrapper')
            document.querySelector('h2').insertAdjacentHTML('afterend', this.filterMarkup)
            this.stationsSearchField = document.querySelector('#stations-search-field')
            this.stationsLimitSelect = document.querySelector('#stations-search-limit')
            this.stationsCountry =  document.querySelector('#stations-search-country')
            const filteredStations = await this.Stations.filter(stations)
            this.Stations.render(this.stationListEl, filteredStations)
            this.addFilters()
        })
    }

    addFilters() {
        const filter = async () => {
            const query = this.stationsSearchField.value
            const limit = this.stationsLimitSelect.value
            const country = this.stationsCountry.value
            const filteredData: Station[] = await this.Stations.filter(this.stations, query, country, limit)
            this.Stations.render(this.stationListEl, filteredData)
        }
        this.stationsSearchField.addEventListener('keydown', filter)
        this.stationsLimitSelect.addEventListener('change', filter)
        this.stationsCountry.addEventListener('change', filter)
    }
}