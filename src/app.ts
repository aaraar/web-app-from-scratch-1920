import './scss/main.scss'
import {Home} from './pages/Home'
import {Stations} from './Stations'
import {Router} from './Router'
import {Station} from './pages/Station'

const stations = new Stations()
const home = new Home(stations)

const router = new Router(
    {
        path: /stations\/(.*)/,
        callback: async (code) => {
            const stationObj = await stations.reduceByCode(code)
            const station = new Station(code, stationObj.namen.lang)
            console.log(await station.getArrivals())
            station.render()
        }
    },
    {
        path: /trip\/from\/(.*)\/to\/(.*)/,
        callback: (from, to) => {
            alert(`trip from: ${from} to: ${to}`)
        }
    },
    {
        path: '', callback: () => {
            home.render()
        }
    })

// const home = new Home
//
// home.render()





