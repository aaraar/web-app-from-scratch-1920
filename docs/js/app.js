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
            this.markup = markup;
            this.loadingMarkup =
                `<section>
                <img class="loading" src="img/loading.svg" alt="Loading icon">
            </section>`;
        }
        destroy() {
            while (this.app.firstChild)
                this.app.removeChild(this.app.firstChild);
        }
        render(mode = 'markup', markup = this.markup, adjacent = this.app, where = 'afterbegin', destroy = true) {
            switch (mode) {
                case 'markup':
                    if (destroy)
                        this.destroy();
                    markup.trim();
                    adjacent.insertAdjacentHTML(where, markup);
                    break;
                case 'loading':
                    if (destroy)
                        this.destroy();
                    this.render('markup', this.loadingMarkup);
                    break;
            }
        }
    }
    //# sourceMappingURL=Page.js.map

    class Home extends Page {
        constructor(Stations) {
            super('');
            this.Stations = Stations;
            this.limit = 20;
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
             </form>`;
        }
        init() {
            this.render('loading');
        }
        renderStations() {
            this.Stations.getAll().then((stations) => __awaiter(this, void 0, void 0, function* () {
                this.stations = stations;
                this.render('markup', `<section class="stations--wrapper">
                <h2>NS stations in Nederland</h2>
                <ul class="stations--list">
                </ul>
                </section>`);
                this.stationListEl = document.querySelector('.stations--list');
                this.stationsWrapper = document.querySelector('.stations--wrapper');
                document.querySelector('h2').insertAdjacentHTML('afterend', this.filterMarkup);
                this.stationsSearchField = document.querySelector('#stations-search-field');
                this.stationsLimitSelect = document.querySelector('#stations-search-limit');
                this.stationsCountry = document.querySelector('#stations-search-country');
                const filteredStations = yield this.Stations.filter(stations);
                this.Stations.render(this.stationListEl, filteredStations);
                this.addFilters();
            }));
        }
        addFilters() {
            const filter = () => __awaiter(this, void 0, void 0, function* () {
                const query = this.stationsSearchField.value;
                const limit = this.stationsLimitSelect.value;
                const country = this.stationsCountry.value;
                const filteredData = yield this.Stations.filter(this.stations, query, country, limit);
                this.Stations.render(this.stationListEl, filteredData);
            });
            this.stationsSearchField.addEventListener('keydown', filter);
            this.stationsLimitSelect.addEventListener('change', filter);
            this.stationsCountry.addEventListener('change', filter);
        }
    }

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

    class Station extends Page {
        constructor(station) {
            super('');
            this.code = station.code;
            this.name = station.namen.lang;
            this.countryCode = station.land;
            switch (station.land) {
                case 'ERROR':
                    this.country = 'Try redefining your search';
                    break;
                case 'NL':
                    this.country = 'The Netherlands';
                    break;
                case 'D':
                    this.country = 'Germany';
                    break;
                case 'B':
                    this.country = 'Belgium';
                    break;
                case 'F':
                    this.country = 'France';
                    break;
                case 'GB':
                    this.country = 'Great-Britain';
                    break;
                case 'A':
                    this.country = 'Austria';
                    break;
                case 'CH':
                    this.country = 'Switzerland';
                    break;
            }
            this.markup =
                `<li class="stations--item">
                <a href="/#stations/${this.code}">
                    <h3>${this.name}</h3>
                    <p>${this.country}</p>
                </a>
            </li>`;
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
        renderDetails() {
            return __awaiter(this, void 0, void 0, function* () {
                this.render('loading');
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
                this.render();
                document.querySelector('.station--wrapper').appendChild(listEl);
            });
        }
    }
    //# sourceMappingURL=Station.js.map

    class Stations {
        constructor() {
            this.getDataFromApi = () => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    if (localStorage.getItem('stations')) {
                        const stations = JSON.parse(localStorage.getItem('stations'));
                        stations.forEach(station => {
                            this.stations.push(new Station(station));
                        });
                        resolve(this.stations);
                    }
                    else {
                        asyncApiCall('stations', {
                            method: 'GET',
                            headers: {
                                'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                            }
                        }).then((res) => {
                            localStorage.setItem('stations', JSON.stringify(res.payload));
                            res.payload.forEach((station) => {
                                this.stations.push(new Station(station));
                            });
                            resolve(this.stations);
                        });
                    }
                });
            });
            this.stations = [];
        }
        getAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.getDataFromApi();
            });
        }
        render(listEl, stations, country = 'NL') {
            // @ts-ignore
            if (!listEl instanceof Element || !listEl instanceof HTMLDocument)
                throw 'listEl is not an HTML element'; // https://stackoverflow.com/a/36894871
            if (!stations[0]) {
                stations[0] = new Station({ code: 'ERROR', namen: { lang: 'No stations found' }, land: 'ERROR' });
            }
            while (listEl.firstChild)
                listEl.removeChild(listEl.firstChild); // empties the ul
            stations.forEach(station => {
                station.render('markup', station.markup, listEl, 'beforeend', false);
            });
        }
        filter(stations = [], query = '', country = 'NL', limit = 20) {
            return new Promise((resolve, reject) => {
                if (!stations[0]) {
                    console.error('Empty station array in filter');
                    this.getAll().then((res) => {
                        filter(res);
                    });
                }
                else
                    filter(stations);
                function filter(stationArray) {
                    resolve(stationArray.filter((station) => station.name.toLowerCase().includes(query.toLowerCase())
                        && (station.countryCode === country || country === 'ALL')).slice(0, limit));
                }
            });
        }
    }

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
            this.routes = routes.map(route => {
                route.path = route.path !== '' ? this.convertRouteToRegExp(route.path) : '';
                return route;
            });
            this.listen();
        }
        add(path, callback) {
            path = this.convertRouteToRegExp(path);
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
        convertRouteToRegExp(route) {
            const match = route.match(/(.*)$/);
            let endpoint = match ? match[1] : '';
            endpoint = this.clearSlashes(endpoint).split('/');
            const regexp = endpoint.map(point => point[0] === ':' ? '(.*)' : point).join('\\/');
            return new RegExp(regexp);
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
            this.checkRoute();
            window.addEventListener('hashchange', this.checkRoute);
        }
    }
    //# sourceMappingURL=Router.js.map

    class App {
        constructor() {
            this.stations = new Stations();
            this.home = new Home(this.stations);
        }
        init() {
            this.router = new Router({
                path: '/stations/:code/',
                callback: (code) => __awaiter(this, void 0, void 0, function* () {
                    const station = yield this.stations.reduceByCode(code);
                    //@ts-ignore
                    yield station.renderDetails();
                })
            }, {
                path: '/trip/from/:from/to/:to/',
                callback: (from, to) => {
                    alert(`trip from: ${from} to: ${to}`);
                }
            }, {
                path: '', callback: () => {
                    this.home.init();
                    this.home.renderStations();
                }
            });
        }
    }
    const app = new App;
    app.init();
    //# sourceMappingURL=app.js.map

}());
