(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class Page {
        constructor(markup) {
            this.app = document.getElementById('app');
            this.markup = markup.trim();
        }
        destroy() {
            while (this.app.firstChild)
                this.app.removeChild(this.app.firstChild);
        }
        render() {
            this.destroy();
            this.app.insertAdjacentHTML('afterbegin', this.markup);
        }
    }
    //# sourceMappingURL=Page.js.map

    class Home {
        constructor(Stations) {
            this.Stations = Stations;
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
        </section>`;
        }
        render() {
            new Page(this.markup).render();
            this.stationListEl = document.querySelector('.stations--list');
            this.stationsSearchField = document.querySelector('.stations--search-field');
            this.stationsWrapper = document.querySelector('.stations--wrapper');
            this.loadingAnimation = document.querySelector('.stations--loading');
            this.renderStations();
        }
        renderStations() {
            this.Stations.getAll().then(stations => {
                this.stationsWrapper.removeChild(this.loadingAnimation);
                this.Stations.render(this.stationListEl, stations.payload);
                this.addFilter();
            });
        }
        addFilter() {
            this.stationsSearchField.addEventListener('keyup', () => __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore
                const query = this.stationsSearchField.value;
                const filteredData = yield this.Stations.filterByNames(query);
                this.Stations.render(this.stationListEl, filteredData);
            }));
        }
    }
    //# sourceMappingURL=Home.js.map

    const asyncApiCall = (endpoint, requestObject, queries = [['']]) => {
        const queryArray = queries.map(query => query.join('='));
        const query = queryArray.join('&');
        return new Promise((resolve, reject) => {
            fetch(`https://cors-anywhere.herokuapp.com/https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/${endpoint}?${query}`, requestObject).then(res => {
                if (res.ok)
                    resolve(res.json());
                else
                    reject(res);
            });
        });
    };
    //# sourceMappingURL=helpers.js.map

    class Stations {
        getAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.getDataFromApi();
            });
        }
        getDataFromApi() {
            return __awaiter(this, void 0, void 0, function* () {
                if (localStorage.getItem('stations')) {
                    return JSON.parse(localStorage.getItem('stations'));
                }
                else {
                    return new Promise((resolve, reject) => {
                        asyncApiCall('stations', {
                            method: 'GET',
                            headers: {
                                'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                            }
                        }).then(res => {
                            console.log(res);
                            localStorage.setItem('stations', JSON.stringify(res));
                            resolve(res);
                        });
                    });
                }
            });
        }
        render(listEl, stations) {
            // @ts-ignore
            if (!listEl instanceof Element || !listEl instanceof HTMLDocument)
                throw 'listEl is not an HTML element'; // https://stackoverflow.com/a/36894871
            if (!stations[0])
                throw 'stations is not an array';
            while (listEl.firstChild)
                listEl.removeChild(listEl.firstChild); // empties the ul
            stations.forEach(station => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                const heading = document.createElement('h3');
                const country = document.createElement('p');
                let countryName;
                listItem.classList.add('stations--item');
                link.setAttribute('href', `#stations/${station.code}`);
                listItem.setAttribute('data-station-name', station.namen.lang);
                heading.innerText = station.namen.lang;
                switch (station.land) {
                    case 'NL':
                        countryName = 'Nederland';
                        break;
                    case 'D':
                        countryName = 'Duitsland';
                        break;
                    case 'B':
                        countryName = 'België';
                        break;
                    case 'F':
                        countryName = 'Frankrijk';
                        break;
                    case 'GB':
                        countryName = 'Groot-Britannië';
                        break;
                    case 'A':
                        countryName = 'Oostenrijk';
                        break;
                    case 'CH':
                        countryName = 'Zwitserland';
                        break;
                }
                country.innerText = `${countryName}`;
                link.append(heading, country);
                listItem.append(link);
                listEl.appendChild(listItem);
            });
        }
        filterByNames(query) {
            return new Promise((resolve, reject) => {
                this.getAll().then(stations => {
                    resolve(stations.payload.filter(station => station.namen.lang.toLowerCase().includes(query.toLowerCase())));
                });
            });
        }
        reduceByCode(code) {
            return new Promise((resolve, reject) => {
                this.getAll().then(stations => {
                    resolve(stations.payload.reduce((acc, curr) => acc = curr.code === code ? curr : acc));
                });
            });
        }
    }
    //# sourceMappingURL=Stations.js.map

    /*
     * Created with https://medium.com/javascript-by-doing/create-a-modern-javascript-router-805fc14d084d
     * Edited for typescript to increase comprehension
     * Check sourcecode at https://github.com/javascript-by-doing/create-a-modern-javascript-router
     */
    class Router {
        constructor(...routes) {
            this.clearSlashes = path => path.toString().replace(/\/$/, '').replace(/^\//, '');
            this.checkRoute = () => {
                if (this.currentUri === this.getEndpoint())
                    return;
                this.currentUri = this.getEndpoint();
                this.routes.some(route => {
                    const match = this.currentUri.match(route.path);
                    if (match) {
                        match.shift();
                        route.callback.apply({}, match);
                        return match;
                    }
                    return false;
                });
            };
            this.routes = routes;
            this.listen();
        }
        add(path, callback) {
            this.routes.push({ path, callback });
        }
        remove(path) {
            this.routes.forEach((route, index) => {
                if (route.path === path) {
                    this.routes.slice(index, 1);
                    return this;
                }
                return this;
            });
        }
        flush() {
            this.routes = [];
        }
        getEndpoint(url = window.location.href) {
            let endpoint = '';
            const match = url.match(/#(.*)$/);
            endpoint = match ? match[1] : '';
            return this.clearSlashes(endpoint);
        }
        navigate(path = '') {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
            return this;
        }
        listen() {
            clearInterval(this.interval);
            // @ts-ignore
            this.interval = setInterval(this.checkRoute, 50);
        }
    }
    //# sourceMappingURL=Router.js.map

    class Station {
        constructor(code, name) {
            this.code = code;
            this.name = name;
        }
        getArrivals() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.initArrivalData();
            });
        }
        getDepartures() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.initDepartureData();
            });
        }
        initArrivalData() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    asyncApiCall('arrivals', {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    }, [['station', this.code]]).then(res => {
                        resolve(res);
                    });
                });
            });
        }
        initDepartureData() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    asyncApiCall('departures', {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    }, [['station', this.code]]).then(res => {
                        resolve(res);
                    });
                });
            });
        }
        render() {
            return __awaiter(this, void 0, void 0, function* () {
                const listEl = document.createElement('ul');
                this.arrivals = yield this.getArrivals();
                this.departures = yield this.getDepartures();
                this.arrivals.payload.arrivals.forEach(arrival => {
                    const item = document.createElement('li');
                    item.innerText = arrival.origin;
                    listEl.appendChild(item);
                });
                this.markup =
                    `
            <section class="station--wrapper">
                <h2>${this.name}</h2>
                <h3>Arrivals</h3>
            </section>
           `;
                new Page(this.markup).render();
                document.querySelector('.station--wrapper').appendChild(listEl);
            });
        }
    }

    const stations = new Stations();
    const home = new Home(stations);
    const router = new Router({
        path: /stations\/(.*)/,
        callback: (code) => __awaiter(void 0, void 0, void 0, function* () {
            const stationObj = yield stations.reduceByCode(code);
            const station = new Station(code, stationObj.namen.lang);
            console.log(yield station.getArrivals());
            station.render();
        })
    }, {
        path: /trip\/from\/(.*)\/to\/(.*)/,
        callback: (from, to) => {
            alert(`trip from: ${from} to: ${to}`);
        }
    }, {
        path: '', callback: () => {
            home.render();
        }
    });
    // const home = new Home
    //
    // home.render()
    //# sourceMappingURL=app.js.map

}());
