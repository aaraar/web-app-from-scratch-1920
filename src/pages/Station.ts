import {asyncApiCall} from "../helpers";
import {Page} from "../Page";

export class Station {
    stationCode: string
    arrivals: object[]
    markup: string
    stationName
    constructor(stationCode, stationName) {
        this.stationCode = stationCode
        this.stationName = stationName
        asyncApiCall('arrivals', {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
            }
        }, [['station', this.stationCode]]).then(res => {
            this.arrivals = res.payload.arrivals
            console.log(this.stationName)
            this.markup = `<section class="station--wrapper">
            <h2>${this.stationName}</h2>
        </section>
            `
            new Page(this.markup).render()
        }).catch( err => {
            console.error(err)
        })
    }
}