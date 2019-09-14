import * as React from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLng, PathOptions } from 'leaflet';
import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';
import { GeoJsonObject } from 'geojson';
import * as Color from 'color';

import './test.scss';
import * as CA_DISTRICTS from '../../data/UT-demo.json';

export class Test extends React.Component {

    getDistrictStyle(feature: any, layer: any): PathOptions {
        const majorityParty = this.getMajorityParty(feature.properties);

        switch (majorityParty.party) {
            case 'D':
                let partyColor: Color = majorityParty.percent >= 0.75 
                    ? Color.rgb([49,117,173]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([49,117,173]).lighten(0.75 - majorityParty.percent / 100.0);
                    console.log(partyColor.hex());
                return {
                    color: '#1f2021',
                    weight: 0.5,
                    fillOpacity: 0.5,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75 
                    ? Color.rgb([215,110,110]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([215,110,110]).lighten(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 0.5,
                    fillOpacity: 0.5,
                    fillColor: partyColor.hex()
                };
            default:
                return {
                    color: '#1f2021',
                    weight: 0.5,
                    fillOpacity: 0.5,
                    fillColor: '#fff2af'
                };
        }
    }

    showPopup(feature: any, layer: any) {
        const popupContent = ` <Popup><p>Congressional District Data</p><pre>Historic Vote: <br />${feature.properties.HistoricVote}</pre></Popup>`
        layer.bindPopup(popupContent)
    }

    render() {
        const position = new LatLng(40.3, -96.0);
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
                        style={this.getDistrictStyle.bind(this)}
                        onEachFeature={this.showPopup}
                    />
                </Map>
            </div>
        );
    }

    private getMajorityParty(properties: any): { party: string, percent: number } {
        console.log(properties);
        return properties.DemocratChance > properties.RepublicanChance ? 
            { party: 'D', percent: parseFloat(properties.DemocratChance) } : 
            { party: 'R', percent: parseFloat(properties.RepublicanChance) };
    }
}
