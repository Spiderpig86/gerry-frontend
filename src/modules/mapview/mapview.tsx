import * as React from 'react';
import * as Color from 'color';

import { Map, Marker, Popup, TileLayer, GeoJSON, LayersControl, ZoomControl } from 'react-leaflet';
import { LatLng, PathOptions } from 'leaflet';
import { GeoJsonObject } from 'geojson';

import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';
import { CustomTab, LeftSidebar, RightSidebar } from './components';
import { StateBordersApi, States } from '../../api/state-borders';

import './mapview.scss';
import * as UT_Precincts from '../../data/UT-demo.json';

interface IMapViewState {
    stateBorders: any[]
    selectedState: string
}

export class MapView extends React.Component<{}, IMapViewState> {

    state = {
        stateBorders: [],
        selectedState: 'UT'
    };

    async componentDidMount() {
        console.log('aergaegre');
        const statePopulator = new StateBordersApi();
        await Promise.all([
            statePopulator.fetchStateBorder(States.CA),
            statePopulator.fetchStateBorder(States.UT),
            statePopulator.fetchStateBorder(States.VA),
        ]).then(data => this.setState({
            stateBorders: data
        }));
        console.log(this.state.stateBorders);
    }

    getStateStyle(feature: any, layer: any): PathOptions {
        return {
            color: 'rgb(51, 136, 255)',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: 'rgb(51, 136, 255)'
        };
    }

    getDistrictStyle(feature: any, layer: any): PathOptions {
        const majorityParty = this.getMajorityParty(feature.properties);

        switch (majorityParty.party) {
            case 'D':
                let partyColor: Color = majorityParty.percent >= 0.75 
                    ? Color.rgb([49,117,173]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([49,117,173]).lighten(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 0.3,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75 
                    ? Color.rgb([215,110,110]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([215,110,110]).lighten(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 0.3,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            default:
                return {
                    color: '#1f2021',
                    weight: 0.1,
                    fillOpacity: 0.75,
                    fillColor: '#fff2af'
                };
        }
    }

    getDistrictStyleHovered(feature: any, layer: any): PathOptions {
        const majorityParty = this.getMajorityParty(feature.properties);

        switch (majorityParty.party) {
            case 'D':
                let partyColor: Color = majorityParty.percent >= 0.75 
                    ? Color.rgb([49,117,173]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([49,117,173]).lighten(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 1,
                    fillOpacity: 0.5,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75 
                    ? Color.rgb([215,110,110]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([215,110,110]).lighten(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 1,
                    fillOpacity: 0.5,
                    fillColor: partyColor.hex()
                };
            case 'I':
                partyColor = majorityParty.percent >= 0.75 
                    ? Color.rgb([130, 182, 127]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([30, 182, 127]).lighten(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 1,
                    fillOpacity: 0.5,
                    fillColor: partyColor.hex()
                };
            default:
                return {
                    color: '#1f2021',
                    weight: 1,
                    fillOpacity: 0.5,
                    fillColor: '#fff2af'
                };
        }
    }

    showPopup(feature: any, layer: any) {
        console.log(layer);
        const popupContent = ` <Popup><p>Congressional District Data</p><pre>Historic Vote: <br />${feature.properties.HistoricVote}</pre></Popup>`
        layer.bindPopup(popupContent);
    }

    onMouseHover(layer: any) {
        console.log(layer);
        const popupContent = ` <Popup><p>Congressional District Data</p><pre>Historic Vote: <br />${layer.layer.feature.properties.HistoricVote}</pre></Popup>`
        layer.target.bindPopup(popupContent);
        layer.target.openPopup(layer.latlng);
    }

    render() {
        const position = new LatLng(40.3, -96.0);
        console.log(this.state);

        // TODO: Split menus into their own components
        return (
            <div className="container-fluid d-flex">
                
                <LeftSidebar />
                <RightSidebar />
                
                <Map className="row flex-fill" center={position} zoomControl={false} zoom={5} style={{ height: '700px' }} animate={true} easeLinearly={true}>
                    <TileLayer
                        url={MAP_BOX_ENDPOINT + MAP_BOX_TOKEN}
                        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    />
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
                        <LayersControl.BaseLayer checked name="Mapbox Light">
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
                    {
                        this.state.stateBorders && this.state.stateBorders.map((data: any, i: number) => {

                            if (data.state === this.state.selectedState) {
                                return (
                                    <GeoJSON
                                        data={UT_Precincts as GeoJsonObject}
                                        style={this.getDistrictStyle.bind(this)}
                                        onEachFeature={this.showPopup}
                                        onMouseOver={this.onMouseHover}
                                    />
                                )
                            } else {
                                return (
                                    <GeoJSON
                                        key={data.state}
                                        data={data.data as GeoJsonObject}
                                        style={this.getStateStyle.bind(this)}
                                    />
                                )
                            }
                        })
                    }
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

    // private getMajorityParty(properties: any): { party: string, percent: number } {
    //     console.log(properties);
    //     const totalVotes = properties.PRES16R + properties.PRES16D + properties.PRES16I;

    //     const republicanPercent = { percent: properties.PRES16R / totalVotes, party: 'R' };
    //     const democratPercent = { percent: properties.PRES16D / totalVotes, party: 'D' };
    //     const independentPercent = { percent: properties.PRES16I / totalVotes, party: 'I' };

    //     return [republicanPercent, democratPercent, independentPercent].reduce((prev: any, cur: any) => prev.percent < cur.percent ? cur : prev);
    // }
}
