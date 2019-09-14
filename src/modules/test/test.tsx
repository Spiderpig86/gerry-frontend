import * as React from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';

import './test.scss';
import * as CA_DISTRICTS from '../../data/UT-demo.json';
import { GeoJsonObject } from 'geojson';

export class Test extends React.Component {

    getDistrctStyle() {
        return {
            color: '#1f2021',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: '#fff2af'
        };
    }

    render() {
        const position = new LatLng(40.3, -96.0);
        console.log(CA_DISTRICTS);
        return (
            <div className="container-fluid dashboard">
                <h1>Map Testing</h1>
                <Map center={position} zoom={5} style={{ height: '700px' }} animate={true} easeLinearly={true}>
                    <TileLayer
                        url={MAP_BOX_ENDPOINT + MAP_BOX_TOKEN}
                        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup.
                            <br />
                            Easily customizable.
                        </Popup>
                    </Marker>
                    <GeoJSON
                        data={CA_DISTRICTS as GeoJsonObject}
                        style={this.getDistrctStyle()}
                    />
                </Map>
            </div>
        );
    }
}
