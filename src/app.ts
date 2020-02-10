import './scss/main.scss'
import {Home} from './pages/Home'
import {Stations} from './Stations'

const stations = new Stations()
const home = new Home(stations)
home.render()
// const home = new Home
//
// home.render()





