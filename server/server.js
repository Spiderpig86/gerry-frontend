const socket = require('websocket').server;
const http = require('http');
const fs = require('fs');
const url = require('url');

const UT = JSON.parse(fs.readFileSync('./UT.json', 'utf8'));
const VA = JSON.parse(fs.readFileSync('./VA.json', 'utf8'));

const CHUNK = 100;
const port = 9001;
const server = http.createServer();

server.listen(port);
const wsServer = new socket({
    httpServer: server
});

wsServer.on('request', req => {
    const connection = req.accept(null, req.origin);
    console.log('connected');
    const location = url.parse(req.resourceURL, true).path.replace(`/`, ``);
    let state = UT;

    switch (location) {
        case `UT`:
            state = UT;
            break;
        case `VA`:
            state = VA;
            break;
        default:
    }

    for (
        let i = 0;
        i < state.features.length;
        i += Math.min(CHUNK, state.features.length - i + 1)
    ) {
        let payload = [];
        for (
            let j = i;
            j < Math.min(CHUNK, state.features.length - i) + i;
            j++
        ) {
            payload.push(state.features[j]);
        }
        sendMessage(connection, JSON.stringify(payload));
    }
    connection.close();
});

const sendMessage = (connection, json) => {
    // We are sending the current data to all connected clients
    connection.sendUTF(json);
};
