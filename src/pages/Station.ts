import {asyncApiCall} from "../helpers";
import {Page} from "../Page";

export class Station {
    code: string
    arrivals: object[]
    markup: string
    name: string
    constructor(code, name) {
        this.code = code
        this.name = name
        asyncApiCall('arrivals', {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
            }
        }, [['station', this.code]]).then(res => {
            // @ts-ignore
            this.arrivals = res.payload.arrivals
            console.log(this.name)
            this.markup = `<section class="station--wrapper">
            <h2>${this.name}</h2>
        </section>
            `
            new Page(this.markup).render()
        }).catch( err => {
            console.error(err)
        })
    }
}