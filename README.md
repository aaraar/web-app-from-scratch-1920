[Live Demo](https://aaraar.github.io/web-app-from-scratch-1920/)    
![Header image](./documentation/ns-header.png)
# NS tripplanner Readme
![Dependencies](https://badgen.net/github/dependents-pkg/aaraar/web-app-from-scratch-1920)
![Release](https://badgen.net/github/release/aaraar/web-app-from-scratch-1920)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/aaraar/web-app-from-scratch-1920/master)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/aaraar/web-app-from-scratch-1920)
![License](https://img.shields.io/github/license/aaraar/web-app-from-scratch-1920)

## Table of Contents
- [How to install](#how-to-install)
- [App goal](#app-goal)
  * [Checklist](#checklist)
- [Personal Progress](#personal-progress) 
  * [Object Oriented Programming](#oop)
  * [Typescript](#typescript)
  * [Creating own router](#hashrouter)
- [Actor Diagram](#actors-in-app)
  * [Description](#actor-diagram-description)
  * [Diagram](#actor-diagram)
- [Interaction Diagrams](#interaction-diagrams)
  * [Description](#actor-diagram-description)
  * [Diagram](#actor-diagram)
- [API & Limitations](#api--limitations)
  * [Response example](#ns-stations-response-example)

## How to install
### Requirements
- Node.js
- NPM/Yarn
### Steps
- Clone this project
- Open terminal and navigate to the folder
- run `yarn` or `npm install` depending on your package manager prefference
- run `yarn dev` or `npm run dev`
- Open your browser and navigate to [http://localhost:10001](http://localhost:10001)
__Before the last commit I found out that the links to the page don't work with the router as configured on GHpages. When navigating to '/' via a hyperlink, the browser will remove the GHpages repo suffix and therefore will serve a 404. To fix this, the links now contain the repo-suffix and therefore do not work on local__
#### Or simply go to the github.io page of this repo at [https://aaraar.github.io/web-app-from-scratch-1920](https://aaraar.github.io/web-app-from-scratch-1920)
## App goal
The goal of the app is to simplify the flow of finding the right train trip.
A feature that NS (Dutch railway company) provides in their API is to show the crowdedness of each wagon.
My initial goal was to make it easier to choose a seat before entering the train based on that info
*Personal goal: Using 0.0 (npm)packages on the front-end*
### Checklist
- [x] Find your origin station
- [x] Show origin station info
- [x] Find destination station
- [x] Display trips between departure and destination
- [x] View trip details
- [ ] View seat availability
    
![App screenshot](./documentation/screenshot.png)

## Personal Progress
This project is part of a minor web-development at the AUAS as seen by the fork origin.
For this project my goal was to challenge myself on 3 parts:
- Object Oriented Programming
- Typescript
- Creating my own (hash-)router
### OOP
The prototypal inheritance of JavaScript is one of its major features that make it such an interesting language.
And even though I knew how this worked, I never really experimented with it. Therefore a goal for this project was to create it fully
using classes and inheritance of objects to create a Object Oriented Structure. I had never used the class syntax before so
it was a strong lesson for me on how the scoping and innerworkings of these prototypes work
### Typescript
At my current job we are transitioning into using Typescript for (almost) all projects.
To practice this I want to use it on my own projects as much as possible.
Because of the strict typing of Typescript it is ideal for working with so many unknown data from an API.
I have learnt much about type declarations and workings of Typescript by using it on this project where a lot of promises
and other unknown data types are handled. You can see the type declaration make an appearance in the actor diagram to make it
a lot more readable in my opinion
### (Hash)router
This component of the project, relies heavily on a tutorial from [Medium](https://medium.com/javascript-by-doing/create-a-modern-javascript-router-805fc14d084d)
I converted it to typescript by declaring all the types and abstracted the Regular expressions a bit so that it accepts express-style paths (express.js).
Therefore I did not completely make this myself, I do however know how and why it works and have made some improvements to it.
It mostly taught me a lot on how to use regular expressions
    
## Actors in app
### Actor Diagram Description
1. Identify the purpose of the app
    - A simple way to check the availablity of seats in an NS-train wagon 
2. Identify the functionalities needed to realize the purpose
    - Users can look for the station they will visit or ar at right now
    - Users can find or plan their trip
    - Users can see the load of each wagon identified by color
    - Users can see alternative trips or trains that reach the same destinations
3. Determine which actors will handle these functionalities
    - Users can enter a search term: App->Stations->filter
    - Users can select a station (departure): App->Stations->Station(->Details)
    - Users select a destination (arrival): App->Stations->Station(->Details)
    - Users can view trip information: App->Trip
### Actor Diagram
![Image of Actor Diagram](./documentation/actor.png)


## Interaction Diagrams
The diagram below shows a simplified flow of the 4 major application flows
    
![Image of Interaction Diagram](./documentation/interaction.png)
![Image of the Second Interaction Diagram](./documentation/interaction2.png)


## API & limitations
### Guidelines
#### From NS:
*NS api's*    
Hoewel NS er naar streeft de NS API doorlopend beschikbaar te houden, kan NS dat niet garanderen. 
Ter voorkoming van congestie of overbelasting van het systeem hanteert NS een gebruikslimiet van
1.000 requests per 5 minuten voor de travel information api
en 180 requests per 5 minuten voor de price information api.
Bij overmatig gebruik van de NS API kan NS de toegang tot de NS API beperken of blokkeren.
#### Translation:
Even though NS strives to make their API continuously available, they can not always guarantee that it will.
To avoid any congestion or excessive strain on the system, NS uses a ratelimit of 1.000 requests every 5 minutes for the travel information API
and 180 requests every 5 minutes for the price information API.
In cases of excessive use of the NS API, NS can limit your access or block it entirely.
### Own experience
In my experience, the API and it's documentation are very neglected. When looking at what seems to be the old API documentation
pages, it seems as if they switched developers. The documentation at https://developer.ns.nl/ looks a lot more polished
than the documentation at https://apiportal.ns.nl/ even though the latter is the one in use.
- The documentation lacks detailed descriptions of what the endpoints do
- Some endpoints are differentiated by number or with the difference between 'info' and 'information' (even some endpoints that have 5 variations with just different numbers and information abbreviated or not) even though they serve completely different data (this was really outrageous)
- Some endpoints and also the entire documentation website are really slow, ironic how even their APIs are frequently late
- The datastructure of the API is so mind boggling, that it's really hard to wrap you head around what's happening sometimes. I'll list some examples below for you to enjoy
__To conclude, the use of this API was horrific and I would not recommend if you have other options (which there really aren't a lot of). The only thing that makes up for it, is the sheer amount of data available once you do get a grasp of how the APIs work__

#### NS stations response example
```json
{
"EVACode": "7004428",
"UICCode": "7015400",
"code": "STP",
"heeftFaciliteiten": true,
"heeftReisassistentie": false,
"heeftVertrektijden": true,
"land": "GB",
"lat": 51.531437,
"lng": -0.126136,
"naderenRadius": 1,
"namen": {
"kort": "London StP",
"lang": "London St. Pancras Int.",
"middel": "London St. P Int"
},
"radius": 1,
"sporen": [],
"stationType": "MEGA_STATION",
"synoniemen": []
}
```
__Keep in mind, I already cleaned the following a little__
#### NS trips response example
```json
{
  "trips": [
    {
      "uid": "arnu|fromStation=8400045|toStation=8400047|plannedFromTime=2020-02-28T09:30:00+01:00|plannedArrivalTime=2020-02-28T11:58:00+01:00|yearCard=false|excludeHighSpeedTrains=false|path=TRAIN_noo_ST_30922,8400071,TRAIN_NSI_ICE_220,8400621,TRAIN_ns_SPR_7434",
      "plannedDurationInMinutes": 148,
      "transfers": 2,
      "status": "NORMAL",
      "legs": [
        {
          "idx": "0",
          "name": "ST 30922",
          "travelType": "PUBLIC_TRANSIT",
          "direction": "Arnhem Centraal",
          "cancelled": false,
          "changePossible": true,
          "alternativeTransport": false,
          "journeyDetailRef": "1|1383|0|884|28022020",
          "origin": {
            "name": "Aalten",
            "lng": 6.578648,
            "lat": 51.921289,
            "countryCode": "NL",
            "uicCode": "8400045",
            "type": "STATION",
            "prognosisType": "PROGNOSED",
            "plannedTimeZoneOffset": 60,
            "plannedDateTime": "2020-02-28T09:30:00+0100",
            "actualTimeZoneOffset": 60,
            "actualDateTime": "2020-02-28T09:31:00+0100",
            "plannedTrack": "2",
            "checkinStatus": "CHECKIN",
            "notes": [
              {
                "value": "Station Accessible or Travel Assistance",
                "key": "IS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "Station is Accessible",
                "key": "SH",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "atn",
                "key": "EK",
                "noteType": "INFOTEXT",
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              }
            ]
          },
          "destination": {
            "name": "Arnhem Centraal",
            "lng": 5.901364,
            "lat": 51.984538,
            "countryCode": "NL",
            "uicCode": "8400071",
            "type": "STATION",
            "prognosisType": "PROGNOSED",
            "plannedTimeZoneOffset": 60,
            "plannedDateTime": "2020-02-28T10:25:00+0100",
            "actualTimeZoneOffset": 60,
            "actualDateTime": "2020-02-28T10:25:00+0100",
            "plannedTrack": "6b",
            "exitSide": "RIGHT",
            "checkinStatus": "OVERCHECK",
            "notes": [
              {
                "value": "Station Accessible or Travel Assistance",
                "key": "IS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "Travel Assistance available at this station",
                "key": "SS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "ah",
                "key": "EK",
                "noteType": "INFOTEXT",
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              }
            ]
          },
          "product": {
            "number": "30922",
            "categoryCode": "ST",
            "shortCategoryName": "TRAIN",
            "longCategoryName": "Stoptrein",
            "operatorCode": "noo",
            "operatorName": "Arriva",
            "type": "TRAIN",
            "displayName": "Arriva Stoptrein"
          },
          "notes": [
            {
              "value": "+eas, source RAST attributonstation, durch TPSI berechnet",
              "key": "ES",
              "noteType": "ATTRIBUTE",
              "priority": 0,
              "routeIdxFrom": 13,
              "routeIdxTo": 13,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "+ebfr, source AGO Manually, Entry in train for Wheelchairs",
              "key": "EW",
              "noteType": "ATTRIBUTE",
              "priority": 0,
              "routeIdxFrom": 1,
              "routeIdxTo": 1,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "+ebfr, source AGO Manually, Entry in train for Wheelchairs",
              "key": "EW",
              "noteType": "ATTRIBUTE",
              "priority": 0,
              "routeIdxFrom": 13,
              "routeIdxTo": 13,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "Geen AVR-NS",
              "key": "AA",
              "noteType": "ATTRIBUTE",
              "priority": 100,
              "routeIdxFrom": 1,
              "routeIdxTo": 13,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "space for wheelchairs",
              "key": "RO",
              "noteType": "ATTRIBUTE",
              "priority": 560,
              "routeIdxFrom": 1,
              "routeIdxTo": 13,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "Check-uit Arriva en check-in NS International",
              "key": "CHECK_OUT_FROM_CHECK_IN_TO",
              "noteType": "INFOTEXT",
              "isPresentationRequired": true,
              "category": "OVERCHECK_INSTRUCTION"
            }
          ],
          "messages": [],
          "stops": [
            {
              "uicCode": "8400045",
              "name": "Aalten",
              "lng": 6.578648,
              "lat": 51.921289,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 1,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T09:30:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T09:31:00+0100",
              "plannedDepartureTrack": "2",
              "departureDelayInSeconds": 60,
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400635",
              "name": "Varsseveld",
              "lng": 6.45866,
              "lat": 51.937182,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 2,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T09:37:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T09:37:00+0100",
              "plannedArrivalDateTime": "2020-02-28T09:37:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T09:37:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400592",
              "name": "Terborg",
              "lng": 6.364246,
              "lat": 51.922458,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 3,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T09:44:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T09:44:00+0100",
              "plannedArrivalDateTime": "2020-02-28T09:43:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T09:43:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400241",
              "name": "Gaanderen",
              "lng": 6.349297,
              "lat": 51.930396,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 4,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T09:47:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T09:47:00+0100",
              "plannedArrivalDateTime": "2020-02-28T09:47:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T09:47:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400177",
              "name": "Doetinchem",
              "lng": 6.296216,
              "lat": 51.958595,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 5,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T09:53:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T09:53:00+0100",
              "plannedArrivalDateTime": "2020-02-28T09:52:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T09:52:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400184",
              "name": "Doetinchem De Huet",
              "lng": 6.259854,
              "lat": 51.959143,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 6,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T09:56:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T09:56:00+0100",
              "plannedArrivalDateTime": "2020-02-28T09:56:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T09:56:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400686",
              "name": "Wehl",
              "lng": 6.213847,
              "lat": 51.957408,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 7,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T10:00:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T10:00:00+0100",
              "plannedArrivalDateTime": "2020-02-28T09:59:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T09:59:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400174",
              "name": "Didam",
              "lng": 6.132414,
              "lat": 51.933506,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 8,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T10:05:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T10:05:00+0100",
              "plannedArrivalDateTime": "2020-02-28T10:05:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T10:05:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400735",
              "name": "Zevenaar",
              "lng": 6.073652,
              "lat": 51.92289,
              "countryCode": "NL",
              "notes": [],
              "routeIdx": 9,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T10:10:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T10:10:00+0100",
              "plannedArrivalDateTime": "2020-02-28T10:09:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T10:09:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400193",
              "name": "Duiven",
              "lng": 6.014619,
              "lat": 51.943358,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Station is Accessible",
                  "key": "SH",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 10,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T10:14:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T10:14:00+0100",
              "plannedArrivalDateTime": "2020-02-28T10:14:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T10:14:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400688",
              "name": "Westervoort",
              "lng": 5.971085,
              "lat": 51.961831,
              "countryCode": "NL",
              "notes": [],
              "routeIdx": 11,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T10:18:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T10:18:00+0100",
              "plannedArrivalDateTime": "2020-02-28T10:18:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T10:18:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400072",
              "name": "Arnhem Velperpoort",
              "lng": 5.920287,
              "lat": 51.984897,
              "countryCode": "NL",
              "notes": [],
              "routeIdx": 12,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T10:22:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T10:22:00+0100",
              "plannedArrivalDateTime": "2020-02-28T10:22:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T10:22:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedDepartureTrack": "1",
              "plannedArrivalTrack": "1",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400071",
              "name": "Arnhem Centraal",
              "lng": 5.901364,
              "lat": 51.984538,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Travel Assistance available at this station",
                  "key": "SS",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 13,
              "plannedArrivalDateTime": "2020-02-28T10:25:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T10:25:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedArrivalTrack": "6b",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            }
          ],
          "steps": [],
          "crossPlatformTransfer": false,
          "shorterStock": false,
          "journeyDetail": [
            {
              "type": "TRAIN_XML",
              "link": {
                "uri": "https://ews-rpx.ns.nl/mobile-api-serviceinfo?companycode=ns&ritnummer=30922&datetime=2020-02-28T09%3A30%3A00%2B01%3A00",
                "params": {}
              }
            }
          ],
          "reachable": false
        },
        {
          "idx": "2",
          "name": "ICE 220 ",
          "travelType": "PUBLIC_TRANSIT",
          "direction": "Amsterdam Centraal",
          "cancelled": false,
          "changePossible": true,
          "alternativeTransport": false,
          "journeyDetailRef": "1|451871|0|884|28022020",
          "origin": {
            "name": "Arnhem Centraal",
            "lng": 5.901364,
            "lat": 51.984538,
            "countryCode": "NL",
            "uicCode": "8400071",
            "type": "STATION",
            "prognosisType": "PROGNOSED",
            "plannedTimeZoneOffset": 60,
            "plannedDateTime": "2020-02-28T10:30:00+0100",
            "actualTimeZoneOffset": 60,
            "actualDateTime": "2020-02-28T10:30:00+0100",
            "plannedTrack": "8",
            "checkinStatus": "OVERCHECK",
            "notes": [
              {
                "value": "Station Accessible or Travel Assistance",
                "key": "IS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "Travel Assistance available at this station",
                "key": "SS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "ah",
                "key": "EK",
                "noteType": "INFOTEXT",
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              }
            ]
          },
          "destination": {
            "name": "Utrecht Centraal",
            "lng": 5.110997,
            "lat": 52.089774,
            "countryCode": "NL",
            "uicCode": "8400621",
            "type": "STATION",
            "prognosisType": "PROGNOSED",
            "plannedTimeZoneOffset": 60,
            "plannedDateTime": "2020-02-28T11:32:00+0100",
            "actualTimeZoneOffset": 60,
            "actualDateTime": "2020-02-28T11:32:00+0100",
            "plannedTrack": "7",
            "checkinStatus": "NOTHING",
            "notes": [
              {
                "value": "Station Accessible or Travel Assistance",
                "key": "IS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "Travel Assistance available at this station",
                "key": "SS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "ut",
                "key": "EK",
                "noteType": "INFOTEXT",
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              }
            ]
          },
          "product": {
            "number": "220",
            "categoryCode": "ICE",
            "shortCategoryName": "ICE",
            "longCategoryName": "ICE International",
            "operatorCode": "NSI",
            "operatorName": "NS International",
            "type": "TRAIN",
            "displayName": "ICE"
          },
          "notes": [
            {
              "value": "+eas, source RAST attributonstation, durch TPSI berechnet",
              "key": "ES",
              "noteType": "ATTRIBUTE",
              "priority": 0,
              "routeIdxFrom": 7,
              "routeIdxTo": 7,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "+eas, source RAST attributonstation, durch TPSI berechnet",
              "key": "ES",
              "noteType": "ATTRIBUTE",
              "priority": 0,
              "routeIdxFrom": 8,
              "routeIdxTo": 8,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "Bordbistro",
              "key": "AH",
              "noteType": "ATTRIBUTE",
              "priority": 100,
              "routeIdxFrom": 7,
              "routeIdxTo": 8,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "no bicycle transport",
              "key": "NF",
              "noteType": "ATTRIBUTE",
              "priority": 260,
              "routeIdxFrom": 7,
              "routeIdxTo": 8,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "Supplement",
              "key": "ZA",
              "noteType": "ATTRIBUTE",
              "priority": 350,
              "routeIdxFrom": 7,
              "routeIdxTo": 8,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "Please reserve",
              "key": "AD",
              "noteType": "ATTRIBUTE",
              "priority": 400,
              "routeIdxFrom": 7,
              "routeIdxTo": 8,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            },
            {
              "value": "260",
              "key": "T",
              "noteType": "TICKET",
              "priority": 0,
              "routeIdxFrom": 7,
              "routeIdxTo": 8,
              "link": {
                "uri": "/api/v1/catalogue/toeslag-ice",
                "params": {
                  "lang": "nl"
                }
              },
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            }
          ],
          "messages": [],
          "stops": [
            {
              "uicCode": "8400071",
              "name": "Arnhem Centraal",
              "lng": 5.901364,
              "lat": 51.984538,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Travel Assistance available at this station",
                  "key": "SS",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 7,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T10:30:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "actualDepartureDateTime": "2020-02-28T10:30:00+0100",
              "plannedDepartureTrack": "8",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400621",
              "name": "Utrecht Centraal",
              "lng": 5.110997,
              "lat": 52.089774,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Travel Assistance available at this station",
                  "key": "SS",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 8,
              "plannedArrivalDateTime": "2020-02-28T11:32:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "actualArrivalDateTime": "2020-02-28T11:32:00+0100",
              "arrivalPrognosisType": "PROGNOSED",
              "plannedArrivalTrack": "7",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            }
          ],
          "steps": [],
          "crowdForecast": "LOW",
          "punctuality": 69.2,
          "crossPlatformTransfer": false,
          "shorterStock": false,
          "journeyDetail": [
            {
              "type": "TRAIN_XML",
              "link": {
                "uri": "https://ews-rpx.ns.nl/mobile-api-serviceinfo?companycode=ns&ritnummer=220&datetime=2020-02-28T10%3A30%3A00%2B01%3A00",
                "params": {}
              }
            }
          ],
          "reachable": false
        },
        {
          "idx": "4",
          "name": "SPR 7434",
          "travelType": "PUBLIC_TRANSIT",
          "direction": "Uitgeest",
          "cancelled": false,
          "changePossible": true,
          "alternativeTransport": false,
          "journeyDetailRef": "1|4125|4|884|28022020",
          "origin": {
            "name": "Utrecht Centraal",
            "lng": 5.110997,
            "lat": 52.089774,
            "countryCode": "NL",
            "uicCode": "8400621",
            "type": "STATION",
            "prognosisType": "PROGNOSED",
            "plannedTimeZoneOffset": 60,
            "plannedDateTime": "2020-02-28T11:37:00+0100",
            "plannedTrack": "14",
            "checkinStatus": "NOTHING",
            "notes": [
              {
                "value": "Station Accessible or Travel Assistance",
                "key": "IS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "Travel Assistance available at this station",
                "key": "SS",
                "noteType": "ATTRIBUTE",
                "priority": 0,
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              },
              {
                "value": "ut",
                "key": "EK",
                "noteType": "INFOTEXT",
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              }
            ]
          },
          "destination": {
            "name": "Abcoude",
            "lng": 4.97677,
            "lat": 52.278943,
            "countryCode": "NL",
            "uicCode": "8400047",
            "type": "STATION",
            "prognosisType": "PROGNOSED",
            "plannedTimeZoneOffset": 60,
            "plannedDateTime": "2020-02-28T11:58:00+0100",
            "plannedTrack": "2",
            "exitSide": "LEFT",
            "checkinStatus": "CHECKOUT",
            "notes": [
              {
                "value": "ac",
                "key": "EK",
                "noteType": "INFOTEXT",
                "isPresentationRequired": false,
                "category": "UNKNOWN"
              }
            ]
          },
          "product": {
            "number": "7434",
            "categoryCode": "SPR",
            "shortCategoryName": "SPR",
            "longCategoryName": "Sprinter",
            "operatorCode": "ns",
            "operatorName": "NS",
            "type": "TRAIN",
            "displayName": "NS Sprinter"
          },
          "notes": [
            {
              "value": "+eas, source RAST attributonstation, durch TPSI berechnet",
              "key": "ES",
              "noteType": "ATTRIBUTE",
              "priority": 0,
              "routeIdxFrom": 0,
              "routeIdxTo": 0,
              "isPresentationRequired": false,
              "category": "UNKNOWN"
            }
          ],
          "messages": [],
          "stops": [
            {
              "uicCode": "8400621",
              "name": "Utrecht Centraal",
              "lng": 5.110997,
              "lat": 52.089774,
              "countryCode": "NL",
              "notes": [
                {
                  "value": "Station Accessible or Travel Assistance",
                  "key": "IS",
                  "type": "A",
                  "priority": 0
                },
                {
                  "value": "Travel Assistance available at this station",
                  "key": "SS",
                  "type": "A",
                  "priority": 0
                }
              ],
              "routeIdx": 0,
              "departurePrognosisType": "PROGNOSED",
              "plannedDepartureDateTime": "2020-02-28T11:37:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "plannedDepartureTrack": "14",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400613",
              "name": "Utrecht Zuilen",
              "lng": 5.089746,
              "lat": 52.103213,
              "countryCode": "NL",
              "notes": [],
              "routeIdx": 1,
              "plannedDepartureDateTime": "2020-02-28T11:40:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "plannedArrivalDateTime": "2020-02-28T11:40:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "plannedDepartureTrack": "2",
              "plannedArrivalTrack": "2",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400419",
              "name": "Maarssen",
              "lng": 5.03315,
              "lat": 52.135592,
              "countryCode": "NL",
              "notes": [],
              "routeIdx": 2,
              "plannedDepartureDateTime": "2020-02-28T11:45:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "plannedArrivalDateTime": "2020-02-28T11:45:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "plannedDepartureTrack": "2",
              "plannedArrivalTrack": "2",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400133",
              "name": "Breukelen",
              "lng": 4.990622,
              "lat": 52.171136,
              "countryCode": "NL",
              "notes": [],
              "routeIdx": 3,
              "plannedDepartureDateTime": "2020-02-28T11:49:00+0100",
              "plannedDepartureTimeZoneOffset": 60,
              "plannedArrivalDateTime": "2020-02-28T11:49:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "plannedDepartureTrack": "2",
              "plannedArrivalTrack": "2",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            },
            {
              "uicCode": "8400047",
              "name": "Abcoude",
              "lng": 4.97677,
              "lat": 52.278943,
              "countryCode": "NL",
              "notes": [],
              "routeIdx": 4,
              "plannedArrivalDateTime": "2020-02-28T11:58:00+0100",
              "plannedArrivalTimeZoneOffset": 60,
              "plannedArrivalTrack": "2",
              "cancelled": false,
              "borderStop": false,
              "passing": false
            }
          ],
          "steps": [],
          "crowdForecast": "LOW",
          "punctuality": 100.0,
          "shorterStock": false,
          "journeyDetail": [
            {
              "type": "TRAIN_XML",
              "link": {
                "uri": "https://ews-rpx.ns.nl/mobile-api-serviceinfo?companycode=ns&ritnummer=7434&datetime=2020-02-28T11%3A37%3A00%2B01%3A00",
                "params": {}
              }
            }
          ],
          "reachable": false
        }
      ],
      "overviewPolyLine": [],
      "checksum": "0f1d000e_3",
      "crowdForecast": "LOW",
      "punctuality": 69.2,
      "ctxRecon": "arnu|fromStation=8400045|toStation=8400047|plannedFromTime=2020-02-28T09:30:00+01:00|plannedArrivalTime=2020-02-28T11:58:00+01:00|yearCard=false|excludeHighSpeedTrains=false",
      "actualDurationInMinutes": 147,
      "idx": 0,
      "optimal": false,
      "fares": [
        {
          "priceInCents": 4652,
          "product": "OVCHIPKAART_RETOUR",
          "travelClass": "SECOND_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 730899,
          "product": "BUSINESS_CARD_TRAJECT_VRIJ_JAAR",
          "travelClass": "FIRST_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 438908,
          "product": "BUSINESS_CARD_TRAJECT_VRIJ_JAAR",
          "travelClass": "SECOND_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 7646,
          "product": "OVCHIPKAART_RETOUR",
          "travelClass": "FIRST_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 3064,
          "product": "OVCHIPKAART_ENKELE_REIS",
          "travelClass": "FIRST_CLASS",
          "discountType": "DISCOUNT_20_PERCENT"
        },
        {
          "priceInCents": 4587,
          "product": "OVCHIPKAART_RETOUR",
          "travelClass": "FIRST_CLASS",
          "discountType": "DISCOUNT_40_PERCENT"
        },
        {
          "priceInCents": 36580,
          "product": "TRAJECT_VRIJ_JAAR",
          "travelClass": "SECOND_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 2791,
          "product": "OVCHIPKAART_RETOUR",
          "travelClass": "SECOND_CLASS",
          "discountType": "DISCOUNT_40_PERCENT"
        },
        {
          "priceInCents": 60910,
          "product": "TRAJECT_VRIJ_JAAR",
          "travelClass": "FIRST_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 1874,
          "product": "OVCHIPKAART_ENKELE_REIS",
          "travelClass": "SECOND_CLASS",
          "discountType": "DISCOUNT_20_PERCENT"
        },
        {
          "priceInCents": 2342,
          "product": "OVCHIPKAART_ENKELE_REIS",
          "travelClass": "SECOND_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 3830,
          "product": "OVCHIPKAART_ENKELE_REIS",
          "travelClass": "FIRST_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 6117,
          "product": "OVCHIPKAART_RETOUR",
          "travelClass": "FIRST_CLASS",
          "discountType": "DISCOUNT_20_PERCENT"
        },
        {
          "priceInCents": 2298,
          "product": "OVCHIPKAART_ENKELE_REIS",
          "travelClass": "FIRST_CLASS",
          "discountType": "DISCOUNT_40_PERCENT"
        },
        {
          "priceInCents": 44180,
          "product": "TRAJECT_VRIJ_MAAND",
          "travelClass": "SECOND_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 1405,
          "product": "OVCHIPKAART_ENKELE_REIS",
          "travelClass": "SECOND_CLASS",
          "discountType": "DISCOUNT_40_PERCENT"
        },
        {
          "priceInCents": 73730,
          "product": "TRAJECT_VRIJ_MAAND",
          "travelClass": "FIRST_CLASS",
          "discountType": "NO_DISCOUNT"
        },
        {
          "priceInCents": 3722,
          "product": "OVCHIPKAART_RETOUR",
          "travelClass": "SECOND_CLASS",
          "discountType": "DISCOUNT_20_PERCENT"
        }
      ],
      "productFare": {
        "priceInCents": 2602,
        "product": "OVCHIPKAART_ENKELE_REIS",
        "travelClass": "SECOND_CLASS",
        "priceInCentsExcludingSupplement": 2342,
        "discountType": "NO_DISCOUNT",
        "supplementInCents": 260
      },
      "fareOptions": {
        "isInternationalBookable": false,
        "isInternational": false,
        "isEticketBuyable": true,
        "isPossibleWithOvChipkaart": true,
        "supplementsBasedOnSelectedFare": [
          {
            "supplementPriceInCents": 260,
            "legIdx": "2",
            "fromUICCode": "8400071",
            "toUICCode": "8400621",
            "link": {
              "uri": "/api/v1/catalogue/toeslag-ice",
              "params": {
                "lang": "nl"
              }
            }
          }
        ]
      },
      "type": "NS",
      "shareUrl": {
        "uri": "https://www.ns.nl/rpx?ctx=arnu%7CfromStation%3D8400045%7CtoStation%3D8400047%7CplannedFromTime%3D2020-02-28T09%3A30%3A00%2B01%3A00%7CplannedArrivalTime%3D2020-02-28T11%3A58%3A00%2B01%3A00%7CyearCard%3Dfalse%7CexcludeHighSpeedTrains%3Dfalse",
        "params": {}
      },
      "realtime": true,
      "routeId": "=IhtIgnk="
    }],
  "scrollRequestBackwardContext": "2|OB|MTµ11µ351930µ351930µ352078µ352078µ0µ0µ4µ352349µ-1µ10µ351932µ1µ1|PDHµ1b1ad5ad18934fd8f54e7bcdc35142d9|RDµ28022020|RTµ93200|USµ0",
  "scrollRequestForwardContext": "2|OF|MTµ11µ352080µ352080µ352228µ352228µ0µ0µ485µ352051µ5µ-2147483638µ0µ1µ2|PDHµ1b1ad5ad18934fd8f54e7bcdc35142d9|RDµ28022020|RTµ93200|USµ0"
}
```


<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
