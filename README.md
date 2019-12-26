<h1 align=center>Gerry</h1>
<br>
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