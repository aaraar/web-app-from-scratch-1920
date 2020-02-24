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

    class Api {
        fetch(baseUrl, endpoint, requestObject, queries = [['']]) {
            return __awaiter(this, void 0, void 0, function* () {
                const queryArray = queries.map(query => query.join('='));
                const query = queryArray.join('&');
                return new Promise((resolve, reject) => {
                    fetch(`https://cors-anywhere.herokuapp.com/${baseUrl}${endpoint}?${query}`, requestObject)
                        .then(res => {
                        if (res.ok)
                            resolve(res.json());
                        else
                            reject(res);
                    });
                });
            });
        }
        getStations() {
            return new Promise((resolve, reject) => {
                if (localStorage.getItem('stations')) {
                    this.rawStations = JSON.parse(localStorage.getItem('stations'));
                    resolve(this.rawStations);
                }
                else {
                    this.fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/', 'stations', {
                        method: 'GET',
                        headers: {
                            'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                        }
                    })
                        .then((res) => {
                        localStorage.setItem('stations', JSON.stringify(res.payload));
                        this.rawStations = res.payload;
                        resolve(this.rawStations);
                    });
                }
            });
        }
        getArrivals(code) {
            return new Promise((resolve, reject) => {
                this.fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/', 'arrivals', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', code]])
                    .then((res) => {
                    resolve(res);
                });
            });
        }
        getDepartures(code) {
            return new Promise((resolve, reject) => {
                this.fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/', 'departures', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                    }
                }, [['station', code]])
                    .then((res) => {
                    resolve(res);
                });
            });
        }
        getTrips(from, to) {
            return new Promise((resolve, reject) => {
                this.fetch('https://gateway.apiportal.ns.nl/public-reisinformatie/api/v3/', 'trips', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'd73085e5fa2641af8bd36c1c75b12387'
                    }
                }, [['fromStation', from.toLowerCase()], ['toStation', to.toLowerCase()]])
                    .then((res) => {
                    resolve(res);
                });
            });
        }
        // https://gateway.apiportal.ns.nl/public-reisinformatie/api/v3/trips/trip?ctxRecon=arnu%7CfromStation%3D8400058%7CtoStation%3D8400285%7CplannedFromTime%3D2020-02-24T13%3A50%3A00%2B01%3A00%7CplannedArrivalTime%3D2020-02-24T14%3A05%3A00%2B01%3A00%7CyearCard%3Dfalse%7CexcludeHighSpeedTrains%3Dfalse&lang=nl&travelClass=2
        getTrip(ctxRecon) {
            return new Promise((resolve, reject) => {
                this.fetch('https://gateway.apiportal.ns.nl/public-reisinformatie/api/v3/', 'trips/trip', {
                    method: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'd73085e5fa2641af8bd36c1c75b12387'
                    }
                }, [['ctxRecon', encodeURIComponent(ctxRecon)], ['lang', 'en'], ['travelClass', '2']])
                    .then(res => {
                    resolve(res);
                });
            });
        }
    }
    //# sourceMappingURL=Api.js.map

    class Page extends Api {
        constructor(markup) {
            super();
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
             </form>
            <form class="stations-form" method="GET">
                <label for="name" id="fromLabel">
                From:
                </label>
                    <input type="hidden" name="from" id="from" value="">
                <label for="to" id="toLabel">
                To:
                </label>
                    <input type="hidden" name="to" id="to" value="">
                <input type="submit" id="planTrip">
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
                document.getElementById('planTrip').addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#trips/from/${document.getElementById('from').value}/to/${document.getElementById('to').value}`;
                });
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
                <div>
                <button id="${this.code}-from">From</button>
                <button id="${this.code}-to">To</button>
                </div>
            </li>`;
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                this.arrivals = this.getArrivals(this.code);
                this.departures = this.getDepartures(this.code);
            });
        }
        renderDetails() {
            return __awaiter(this, void 0, void 0, function* () {
                this.render('loading');
                const arrivalsEl = document.createElement('ul');
                const departuresEl = document.createElement('ul');
                arrivalsEl.classList.add('station--list');
                departuresEl.classList.add('station--list');
                const arrivals = yield this.arrivals;
                const departures = yield this.departures;
                //@ts-ignore
                arrivals.payload.arrivals.forEach(arrival => {
                    const item = document.createElement('li');
                    item.innerText = arrival.origin;
                    item.classList.add('stations--item');
                    arrivalsEl.appendChild(item);
                });
                departures.payload.departures.forEach(departure => {
                    const item = document.createElement('li');
                    const routeUl = document.createElement('ul');
                    departure.routeStations.forEach(station => {
                        const stop = document.createElement('li');
                        stop.innerText = station.mediumName;
                        routeUl.appendChild(stop);
                    });
                    item.classList.add('stations--item');
                    item.innerText = departure.direction;
                    item.appendChild(routeUl);
                    departuresEl.appendChild(item);
                });
                this.markup =
                    `
            <section class="station--wrapper">
                <h2>${this.name}</h2>
                <div class="station--arrivals">
                    <h3>Arrivals</h3>
                </div>
                <div class="station--departures">
                    <h3>Departures</h3>
                </div>
            </section>
           `;
                this.render();
                document.querySelector('.station--arrivals').appendChild(arrivalsEl);
                document.querySelector('.station--departures').appendChild(departuresEl);
            });
        }
    }
    //# sourceMappingURL=Station.js.map

    class Stations {
        constructor() {
            this.stations = [];
            this.api = new Api();
        }
        getAll() {
            return __awaiter(this, void 0, void 0, function* () {
                let stations = yield this.api.getStations();
                //@ts-ignore
                return stations.map(station => new Station(station));
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
                document.getElementById(`${station.code}-from`).addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('from').value = station.code;
                    document.getElementById('fromLabel').innerText += ' ' + station.name;
                });
                document.getElementById(`${station.code}-to`).addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('to').value = station.code;
                    document.getElementById('toLabel').innerText += ' ' + station.name;
                });
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
        reduce(code) {
            return new Promise((resolve, reject) => {
                this.getAll().then((stations) => {
                    resolve(stations.reduce((acc, curr) => acc = curr.code === code ? curr : acc));
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
            this.routes = routes.map(route => {
                route.path = route.path !== '' ? this.convertRoute(route.path) : '';
                return route;
            });
            this.listen();
        }
        add(path, callback) {
            path = this.convertRoute(path);
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
        convertRoute(route) {
            if (route === '/')
                return new RegExp(/\//);
            const match = route.match(/(.*)$/);
            let endpoint = match ? match[1] : '';
            endpoint = this.clearSlashes(endpoint).split('/');
            const regexp = endpoint.map(point => point[0] === ':' ? '(.*)' : point).join('\\/');
            return new RegExp(regexp);
        }
        getEndpoint(url = window.location.href) {
            if (url.split('/')[url.split('/').length - 1] === '')
                return '/';
            let endpoint = '';
            const match = url.match(/#(.*)$/);
            endpoint = match ? match[1] : '/';
            return this.clearSlashes(endpoint);
        }
        navigate(path = '/') {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
            return this;
        }
        listen() {
            this.checkRoute();
            window.addEventListener('hashchange', this.checkRoute);
        }
    }
    //# sourceMappingURL=Router.js.map

    class Trips extends Page {
        constructor(from, to) {
            super(``);
            this.renderDetails = () => __awaiter(this, void 0, void 0, function* () {
                this.render('loading');
                const tripsEl = document.createElement('ul');
                tripsEl.classList.add('trips--list');
                const trips = yield this.trips;
                // @ts-ignore
                trips.trips.forEach(trip => {
                    const item = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = `/#trip/${encodeURIComponent(trip.ctxRecon)}`;
                    link.classList.add('trips--item');
                    const title = document.createElement('h3');
                    const departureTime = document.createElement('p');
                    const via = document.createElement('p');
                    const stops = trip.legs[0].stops.map(trip => trip.name);
                    stops.join(', ');
                    via.innerText = `Via ${stops.slice(0, stops.length - 1).join(', ')} & ${stops.slice(stops.length - 1)}`;
                    title.innerText = trip.legs[0].direction;
                    departureTime.innerText = new Date(trip.legs[0].origin.plannedDateTime).toLocaleString();
                    link.append(title, departureTime, via);
                    item.appendChild(link);
                    tripsEl.appendChild(item);
                });
                this.markup =
                    `
            <section class="trips--wrapper">
                <h2>Trips from ${this.from.name} to ${this.to.name}</h2>
                <div class="trips"></div>
            </section>
           `;
                this.render();
                document.querySelector('.trips').appendChild(tripsEl);
            });
            this.from = from;
            this.to = to;
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.from;
                yield this.to;
                this.trips = this.getTrips(this.from.code, this.to.code);
            });
        }
    }
    //# sourceMappingURL=Trips.js.map

    class Trip extends Page {
        constructor(ctxRecon) {
            super('');
            this.renderDetails = () => __awaiter(this, void 0, void 0, function* () {
                this.render('loading');
                const trip = yield this.trip;
                const legs = trip.legs.map(leg => `<div class="trip--leg">
                <h3>${leg.origin.name} - Departure ${new Date(leg.origin.actualDateTime).toLocaleTimeString().slice(0, 5)}</h3>
                ${leg.stops.map((stop, index) => index === 0 || index === leg.stops.length - 1 ?
                '' :
                `<p>${stop.name} - ${new Date(stop.plannedArrivalDateTime).toLocaleTimeString().slice(0, 5)}</p>`).join('')}
                <h3>${leg.destination.name} - Arrival: ${new Date(leg.destination.actualDateTime).toLocaleTimeString().slice(0, 5)}</h3>
            </div>`);
                this.markup =
                    `
            <h2>Trip from ${trip.legs[0].origin.name} to ${trip.legs[0].destination.name}</h2> 
            ${legs.join(' Transfer ')}
        `;
                this.render();
            });
            this.ctxRecon = ctxRecon;
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                this.trip = this.getTrip(this.ctxRecon);
            });
        }
    }
    //# sourceMappingURL=Trip.js.map

    class App {
        constructor() {
            this.stations = new Stations();
            this.home = new Home(this.stations);
        }
        init() {
            this.router = new Router({
                path: '/stations/:code/',
                callback: (code) => __awaiter(this, void 0, void 0, function* () {
                    const station = yield this.stations.reduce(code);
                    station.init().then(station.renderDetails());
                })
            }, {
                path: '/trips/from/:from/to/:to/',
                callback: (from, to) => __awaiter(this, void 0, void 0, function* () {
                    const fromStation = yield this.stations.reduce(from);
                    const toStation = yield this.stations.reduce(to);
                    const trips = new Trips(fromStation, toStation);
                    trips.init().then(trips.renderDetails);
                })
            }, {
                path: '/trip/:ctxRecon',
                callback: (ctxRecon) => __awaiter(this, void 0, void 0, function* () {
                    const trip = new Trip(decodeURIComponent(ctxRecon));
                    trip.init().then(trip.renderDetails);
                })
            }, {
                path: '/',
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    this.home.init();
                    this.home.renderStations();
                })
            }, {
                path: '', callback: () => {
                    new Page('<h2>404 Page not found</h2>').render();
                }
            });
        }
    }
    const app = new App;
    app.init();
    //# sourceMappingURL=app.js.map

}());
