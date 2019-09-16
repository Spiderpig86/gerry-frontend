import * as React from 'react';
import * as Color from 'color';

import { Map, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, LayersControl, ZoomControl } from 'react-leaflet';
import { LatLng, PathOptions } from 'leaflet';
import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';
import { GeoJsonObject } from 'geojson';
import { slide as Menu } from 'react-burger-menu';

import './mapview.scss';
import * as CA_DISTRICTS from '../../data/UT-demo.json';

export class MapView extends React.Component {

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
            <div className="container-fluid d-flex">
                <Menu>
                    <a key="0" href=""><i className="fa fa-fw fa-star-o" /><span>Favorites</span></a>
                    <a key="1" href=""><i className="fa fa-fw fa-bell-o" /><span>Alerts</span></a>
                    <a key="2" href=""><i className="fa fa-fw fa-envelope-o" /><span>Messages</span></a>
                    <a key="3" href=""><i className="fa fa-fw fa-comment-o" /><span>Comments</span></a>
                    <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o" /><span>Analytics</span></a>
                    <a key="5" href=""><i className="fa fa-fw fa-newspaper-o" /><span>Reading List</span></a>
                </Menu>
                <Map className="row flex-fill" center={position} zoomControl={false} zoom={5} style={{ height: '700px' }} animate={true} easeLinearly={true}>
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
                    <LayersControl position="bottomright">
                        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Mapbox Light">
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A"
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Mapbox Dark">
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A"
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="Mapbox Streets">
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A"
                            />
                        </LayersControl.BaseLayer>
                    </LayersControl>
                    <ZoomControl position={'bottomright'} />
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
