const port = 9001;
const socket = require('websocket').server;
const http = require('http');
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./UT.json', 'utf8'));

const server = http.createServer();
server.listen(port);
const wsServer = new socket({
    httpServer: server
});

wsServer.on('request', (req) => {
    const connection = req.accept(null, req.origin);

    for (let i = 0; i < 300; i++) {
        // setTimeout(() => {
            sendMessage(connection, JSON.stringify(obj.features[i]));
    
        // }, 2000);
    }

    // setInterval(() => {
    //     const object = {"type": "Feature", "geometry": {"type": "Polygon", "coordinates": [[[Math.random() * 10 + -110.23738539590879, Math.random() * 10 + 40.21862198456313], [Math.random() * 10 + -110.23738544737823, Math.random() * 10 + 40.21858594759239], [Math.random() * 10 + -110.2378458370849, Math.random() * 10 + 40.21487947833992], [Math.random() * 10 + -110.23691103158102, Math.random() * 10 + 40.214403031995396], [Math.random() * 10 + -110.23637600302133, Math.random() * 10 + 40.21399201130025]]]}, "properties": {"VistaID": "DU11", "SbPrcnc": "", "AliasNm": "", "DsslvID": "7PDU11", "jrsdctn": "Duchesne", "SENDIST": 26, "HDIST": 69, "county_id": 7, "precinct_name": "DU11", "county_name": "Duchesne County", "county_fips": 49013, "v16_dpres": 20, "v16_rpres": 219, "v16_opres": 17, "v16_dsenate": 27, "v16_rsenate": 221, "v16_dgov": 24, "v16_rgov": 215, "pop_total": 504.4102544747859, "pop_white_nh": 430.29685596634425, "pop_black_nh": 0.004635374238234, "pop_amin_nh": 1.01699533316232, "pop_asian_nh": 1.001545124746078, "pop_nhpi_nh": 0.004635374238234, "pop_other_nh": 5.473073877000391, "pop_2more_nh": 6.001544832824667, "pop_hispanic": 60.610968592231686, "pop_white_h": 18.991745359867213, "pop_black_h": 0.004635374238234, "pop_amin_h": 3.003090249492156, "pop_asian_h": 0.003090249492156, "pop_nhpi_h": 0, "pop_other_h": 36.25389455933765, "pop_2more_h": 2.354512799804279, "pop_total_voting": 337.0797582972571, "pop_hispanic_voting": 33.244119822079185, "pop_white_voting": 298.57512561836774, "pop_black_voting": 0.004635374238234, "pop_amin_voting": 1.01699533316232, "pop_asian_voting": 1.001545124746078, "pop_nhpi_voting": 0.004635374238234, "pop_other_voting": 3.231156525679183, "pop_2more_voting": 0.001545124746078, "cd": 1}}
        
    //     sendMessage(connection, JSON.stringify(object));

    // }, 500);
    connection.close();
});

const sendMessage = (connection, json) => {
    // We are sending the current data to all connected clients
    connection.sendUTF(json);
  }