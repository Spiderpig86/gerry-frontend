const socket = require('websocket').server;
const http = require('http');
const fs = require('fs');
const url = require('url');

const CA = JSON.parse(fs.readFileSync('./CA.json', 'utf8'));
const UT = JSON.parse(fs.readFileSync('./UT.json', 'utf8'));
const VA = JSON.parse(fs.readFileSync('./VA.json', 'utf8'));

const CHUNK = 1000;
const port = 9001;
const server = http.createServer();

server.listen(port);
const wsServer = new socket({
    httpServer: server,
    disableNagleAlgorithm: true
});

wsServer.on('request', req => {
    const connection = req.accept(null, req.origin);
    console.log('connected');
    const location = url.parse(req.resourceURL, true).path.replace(`/`, ``);
    let state = UT;

    switch (location) {
        case `CA`:
            state = CA;
            break;
        case `UT`:
            state = UT;
            break;
        case `VA`:
            state = VA;
            break;
        default:
    }
    
    let features = state.features;
    let i = 0;
    while (features.length > 0) {
        const capacity = Math.min(CHUNK, state.features.length);
        let payload = features.slice(0, capacity);
        sendMessage(connection, JSON.stringify(payload));
        features = features.slice(capacity);
        console.log(i);
        i++;
    }
    connection.close();
});

const sendMessage = (connection, json) => {
    // We are sending the current data to all connected clients
    connection.sendUTF(json);
};
