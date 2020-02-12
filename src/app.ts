import './scss/main.scss'
import {Home} from './pages/Home'
import {Stations} from './Stations'
import {Router} from './Router'
import {Page} from './Page'

class App {
    stations: Stations
    home: Home
    router: Router

    constructor() {
        this.stations = new Stations()
        this.home = new Home(this.stations)
    }

    init() {
        this.router = new Router(
            {
                path: '/stations/:code/',
                callback: async (code) => {
                    const station: any = await this.stations.reduceByCode(code)
                    await station.renderDetails()
                }
            },
            {
                path: '/trip/from/:from/to/:to/',
                callback: (from, to) => {
                    alert(`trip from: ${from} to: ${to}`)
                }
            },
            {
                path: '/',
                callback: async () => {
                    this.home.init()
                    this.home.renderStations()
                }
            },
            {
                path: '', callback: () => {
                    new Page('<h2>404 Page not found</h2>').render()
                }
            })
    }
}

const app = new App
app.init()




