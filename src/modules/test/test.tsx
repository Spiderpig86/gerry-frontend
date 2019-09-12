import "./test.scss";
import * as React from "react";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class Test extends React.Component {

    render() {
        
        const position = [51.505, -0.09];
        return (
            <div className="container-fluid dashboard">
                <h1>Map Testing</h1>
                <Map center={position} zoom={13}>
                    <TileLayer
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}