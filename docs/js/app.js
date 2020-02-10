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

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var Page = /** @class */ (function () {
        function Page(markup) {
            this.app = document.getElementById('app');
            this.markup = markup.trim();
        }
        Page.prototype.destroy = function () {
            while (this.app.firstChild)
                this.app.removeChild(this.app.firstChild);
        };
        Page.prototype.render = function () {
            this.destroy();
            this.app.insertAdjacentHTML('afterbegin', this.markup);
        };
        return Page;
    }());
    //# sourceMappingURL=Page.js.map

    var Home = /** @class */ (function () {
        function Home(Stations) {
            this.Stations = Stations;
            this.Stations = Stations;
            this.markup =
                "<section class=\"stations--wrapper\">\n            <h2>NS stations in Nederland</h2>\n            <form action=\"\">\n                <input type=\"text\" class=\"stations--search-field\" placeholder=\"Search for a station\">\n                <button>search</button>\n            </form>\n            <img class=\"stations--loading\" src=\"img/loading.svg\" alt=\"Loading icon\">\n            <ul class=\"stations--list\">\n            </ul>\n        </section>";
        }
        Home.prototype.render = function () {
            new Page(this.markup).render();
            this.stationListEl = document.querySelector('.stations--list');
            this.stationsSearchField = document.querySelector('.stations--search-field');
            this.stationsWrapper = document.querySelector('.stations--wrapper');
            this.loadingAnimation = document.querySelector('.stations--loading');
            this.renderStations();
        };
        Home.prototype.renderStations = function () {
            var _this = this;
            this.Stations.getAll().then(function (stations) {
                _this.stationsWrapper.removeChild(_this.loadingAnimation);
                _this.Stations.render(_this.stationListEl, stations.payload);
                _this.Stations.giveStationsDetails(_this.stationListEl);
                _this.addFilter();
            });
        };
        Home.prototype.addFilter = function () {
            var _this = this;
            this.Stations.getAll().then(function (stations) {
                _this.stationsSearchField.addEventListener('keyup', function () { return __awaiter(_this, void 0, void 0, function () {
                    var searchQuery, filteredStations;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                searchQuery = this.stationsSearchField.value;
                                return [4 /*yield*/, stations.payload.filter(function (station) { return station.namen.lang.toLowerCase().includes(searchQuery.toLowerCase()); })];
                            case 1:
                                filteredStations = _a.sent();
                                this.Stations.render(this.stationListEl, filteredStations);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        };
        return Home;
    }());

    var asyncApiCall = function (endpoint, requestObject, queries) {
        if (queries === void 0) { queries = [['']]; }
        var queryArray = queries.map(function (query) { return query.join('='); });
        var query = queryArray.join('&');
        return new Promise(function (resolve, reject) {
            fetch("https://cors-anywhere.herokuapp.com/https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/" + endpoint + "?" + query, requestObject).then(function (res) {
                if (res.ok)
                    resolve(res.json());
                else
                    reject(res);
            });
        });
    };
    //# sourceMappingURL=helpers.js.map

    var Station = /** @class */ (function () {
        function Station(stationCode, stationName) {
            var _this = this;
            this.stationCode = stationCode;
            this.stationName = stationName;
            asyncApiCall('arrivals', {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                }
            }, [['station', this.stationCode]]).then(function (res) {
                // @ts-ignore
                _this.arrivals = res.payload.arrivals;
                console.log(_this.stationName);
                _this.markup = "<section class=\"station--wrapper\">\n            <h2>" + _this.stationName + "</h2>\n        </section>\n            ";
                new Page(_this.markup).render();
            }).catch(function (err) {
                console.error(err);
            });
        }
        return Station;
    }());
    //# sourceMappingURL=Station.js.map

    var Stations = /** @class */ (function () {
        function Stations() {
            this.giveStationsDetails = function (listEl) {
                listEl.addEventListener('click', function (event) {
                    var clickedStation = event.target.closest('li');
                    var station = new Station(clickedStation.dataset.stationCode, clickedStation.dataset.stationName);
                });
            };
        }
        Stations.prototype.getAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getDataFromApi()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Stations.prototype.getDataFromApi = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (localStorage.getItem('stations')) {
                        return [2 /*return*/, JSON.parse(localStorage.getItem('stations'))];
                    }
                    else {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                asyncApiCall('stations', {
                                    method: 'GET',
                                    headers: {
                                        'Ocp-Apim-Subscription-Key': 'e638a92ac7e74ae1a6bd7b2122b36d85'
                                    }
                                }).then(function (res) {
                                    localStorage.setItem('stations', JSON.stringify(res));
                                    resolve(res);
                                });
                            })];
                    }
                });
            });
        };
        Stations.prototype.render = function (listEl, stations) {
            while (listEl.firstChild)
                listEl.removeChild(listEl.firstChild); // empties the ul
            stations.forEach(function (station) {
                var listItem = document.createElement('li');
                var heading = document.createElement('h3');
                var country = document.createElement('p');
                var countryName;
                listItem.classList.add('stations--item');
                listItem.setAttribute('data-station-code', station.code);
                listItem.setAttribute('data-station-name', station.namen.lang);
                heading.innerText = station.namen.lang;
                switch (station.land) {
                    case "NL":
                        countryName = 'Nederland';
                        break;
                    case "D":
                        countryName = 'Duitsland';
                        break;
                    case "B":
                        countryName = "België";
                        break;
                    case "F":
                        countryName = "Frankrijk";
                        break;
                    case "GB":
                        countryName = "Groot-Britannië";
                        break;
                    case "A":
                        countryName = "Oostenrijk";
                        break;
                    case "CH":
                        countryName = "Zwitserland";
                        break;
                }
                country.innerText = "" + countryName;
                listItem.append(heading, country);
                listEl.appendChild(listItem);
            });
        };
        return Stations;
    }());
    //# sourceMappingURL=Stations.js.map

    var stations = new Stations();
    var home = new Home(stations);
    home.render();
    // const home = new Home
    //
    // home.render()
    //# sourceMappingURL=app.js.map

}());
