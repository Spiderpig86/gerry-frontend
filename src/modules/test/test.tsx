import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';

import "./test.scss";

export class Test extends React.Component {

    render() {
        
        const position = [40.3,-96.6];
        return (
            <div className="container-fluid dashboard">
                <h1>Map Testing</h1>
                <Map center={position} zoom={5} style={{ height: '700px' }}>
                    <TileLayer
                    url={MAP_BOX_ENDPOINT + MAP_BOX_TOKEN}
                    attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    />
                    <Marker position={position}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}