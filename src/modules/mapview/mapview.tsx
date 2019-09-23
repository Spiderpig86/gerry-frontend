import * as React from 'react';
import * as Color from 'color';

import { Map, Marker, Popup, TileLayer, GeoJSON, LayersControl, ZoomControl } from 'react-leaflet';
import { LatLng, PathOptions } from 'leaflet';
import { GeoJsonObject } from 'geojson';

import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';
import { CustomTab, LeftSidebar, RightSidebar } from './components';
import { StateBordersApi, States } from '../../api/state-borders';

import './mapview.scss';
import * as UT_Districts from '../../data/UT-demo.json';

interface IMapViewState {
    stateBorders: any[]
    selectedState: string
    precincts: any;
}

export class MapView extends React.Component<{}, IMapViewState> {

    state = {
        stateBorders: [],
        selectedState: 'UT',
        precincts: null
    };

    async componentDidMount() {
        const statePopulator = new StateBordersApi();
        await Promise.all([
            statePopulator.fetchStateBorder(States.CA),
            statePopulator.fetchStateBorder(States.UT),
            statePopulator.fetchStateBorder(States.VA),
        ]).then(data => this.setState({
            stateBorders: data
        }));

        const precincts: any = await statePopulator.fetchPrecincts();
        console.log(precincts.data);
        console.log(UT_Districts);
        this.setState({
            precincts: precincts.data.geometry
        });
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
        if (majorityParty.percent === NaN) {
            majorityParty.party = '-';
        }

        switch (majorityParty.party) {
            case 'D':
                let partyColor: Color = majorityParty.percent >= 0.55 
                    ? Color.rgb([49,117,173]).saturate(majorityParty.percent / 100.0 - 0.55)
                    : Color.rgb([49,117,173]).desaturate(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 0.3,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.55 
                    ? Color.rgb([215,110,110]).saturate(majorityParty.percent / 100.0 - 0.55)
                    : Color.rgb([215,110,110]).desaturate(0.75 - majorityParty.percent / 100.0);
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
                    fillColor: '#fff2af'
                };
        }
    }

    getPrecinctStyle(feature: any, layer: any): PathOptions {
        const majorityParty = this.getMajorityPartyPrecinct(feature.properties);
        console.log(majorityParty);

        switch (majorityParty.party) {
            case 'D':
                let partyColor: Color = majorityParty.percent >= 0.75 
                    ? Color.rgb([16,114,195]).saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.rgb([16,114,195]).lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.rgb([16,114,195]).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75 
                    ? Color.rgb([170,57,57]).saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.rgb([170,57,57]).lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.rgb([170,57,57]).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'I':
                partyColor = majorityParty.percent >= 0.55 
                    ? Color.rgb([130,182,127]).saturate((majorityParty.percent - 0.55) * 3).darken((majorityParty.percent - 0.55))
                    : Color.rgb([130,182,127]).lighten((0.55 - majorityParty.percent) * 3);
                return {
                    color: Color.rgb([130,182,127]).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            default:
                return {
                    color: '#1f2021',
                    weight: 0.3,
                    fillOpacity: 0,
                };
        }
    }

    showPopup(feature: any, layer: any) {
        const popupContent = ` <Popup><p>Congressional District Data</p><pre>Historic Vote: <br />${feature.properties.HistoricVote}</pre></Popup>`
        layer.bindPopup(popupContent);
    }

    onMouseHover(layer: any) {
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

                            if (data.state === this.state.selectedState && this.state.precincts) {
                                return (
                                    <div key={'selected'}>
                                        {/* <GeoJSON
                                            data={UT_Districts as GeoJsonObject}
                                            // style={this.getDistrictStyle.bind(this)}
                                            style={{ color: '#222' }}
                                            onEachFeature={this.showPopup}
                                            onMouseOver={this.onMouseHover}
                                        /> */}
                                        <GeoJSON
                                            data={this.state.precincts as GeoJsonObject}
                                            style={this.getPrecinctStyle.bind(this)}
                                        />
                                    </div>
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

    private getMajorityPartyPrecinct(properties: any): { party: string, percent: number } {
        console.log(properties);
        const totalVotes = properties.PRES16R + properties.PRES16D + properties.PRES16I;

        if (totalVotes === 0) {
            return { percent: 0, party: '-' };
        }

        const republicanPercent = { percent: properties.PRES16R / totalVotes, party: 'R' };
        const democratPercent = { percent: properties.PRES16D / totalVotes, party: 'D' };
        const independentPercent = { percent: properties.PRES16I / totalVotes, party: 'I' };
        console.log([republicanPercent, democratPercent, independentPercent]);

        return [republicanPercent, democratPercent, independentPercent].reduce((prev: any, cur: any) => prev.percent < cur.percent ? cur : prev);
    }
}
