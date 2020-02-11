import './scss/main.scss'
import {Home} from './pages/Home'
import {Stations} from './Stations'
import {Router} from './Router'
import {Station} from './pages/Station'


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
                    const station = await this.stations.reduceByCode(code)
                    //@ts-ignore
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
                path: '', callback: () => {
                    this.home.init()
                    this.home.renderStations()
                }
            })
    }
}

const app = new App
app.init()




