<h1 align=center>Gerry</h1>
<h5 align=center>A gerrymandering analysis tool used to redraw district lines based on numerous heuristics centered around fairness.</h5>

## Features

* A zoomable, pannable map of the United States with display for multiple states.
* Full breakdown of demographic and election data on the state, district and precinct levels.
* Multiple map filters to display chloropleth for different measures.
* A multi-phase breakdown for districting analysis.
  * Phase 0 - vote-block detection.
  * Phase 1 - initial clustering based on multiple factors among intermediate clusters.
  * Phase 2 - adjustment of clusters through swapping precincts to maximize objective function scores.
* Asynchronous updates for data while algorithm is running.
* Algorithm progress logging.

## Built With

* :zap: [React](https://reactjs.org/) - a JavaScript library for building UIs.
* :department_store: [Redux](https://redux.js.org/) - a predictable state container for JS apps.
* :leaves: [Leaflet](https://leafletjs.com/) - an open-source JavaScript library for mobile-friendly interactive maps.
* :stars: [StompJs](https://github.com/stomp-js/stompjs) - a STOMP over WebSocket client for Web browser or node.js. applications.
* :deciduous_tree: [Spring Boot](https://spring.io/projects/spring-boot) - a preconfigured version of Spring.
* :bear: [Hibernate](http://hibernate.org/) - ORM for Java.
* :whale: [MySQL](https://www.mysql.com/) - open source RDBMS.

## Where are the other repositories?
* This is coming soon...

## Media

![Splash Screen](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-landing.gif?raw=true)
<p align="center">Initial load of application.</p>
<br />

![Loading Data](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-2.gif?raw=true)
<p align="center">Selection of state with data being loaded via websockets.</p>
<br />

![Map Filters](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-3.gif?raw=true)
<p align="center">Map filter selection.</p>
<br />

![Phase 0](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-4.gif?raw=true)
<p align="center">Execution of phase 0.</p>
<br />

![Phase 1](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-5.gif?raw=true)
<p align="center">Execution of phase 1.</p>
<br />

![Phase 2](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-6.gif?raw=true)
<p align="center">Execution of phase 2.</p>
<br />

![Phase 2 Post](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-7.gif?raw=true)
<p align="center">Displaying phase 2 results.</p>
<br />

![Phase 1 California](https://github.com/Spiderpig86/gerry-frontend/blob/master/media/gerry-cali.gif?raw=true)
<p align="center">Executing iterative steps for phase 1 for California.</p>
<br />

## Demo

A live preview can be seen [here](https://gerryapp.netlify.com/).

## Testing Locally

### React Setup

Skip this setup if you are viewing the app through Netlify.
First, install all needed dependencies.

```sh
npm i
```

Then, start the application.

```sh
npm start
```

### Server Setup

To test with a mock webserver, `cd` to `./server` and start the server.

```sh
cd ./server && npm i
```

Then, start the server.

```sh
npm start
```