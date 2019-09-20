import * as React from 'react';
import * as Color from 'color';

import { Map, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, LayersControl, ZoomControl } from 'react-leaflet';
import { LatLng, PathOptions } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';
import { CustomTab } from './components';

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
                return {
                    color: '#1f2021',
                    weight: 0.3,
                    fillOpacity: 0.5,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75 
                    ? Color.rgb([215,110,110]).darken(majorityParty.percent / 100.0 - 0.75)
                    : Color.rgb([215,110,110]).lighten(0.75 - majorityParty.percent / 100.0);
                return {
                    color: '#1f2021',
                    weight: 0.3,
                    fillOpacity: 0.5,
                    fillColor: partyColor.hex()
                };
            default:
                return {
                    color: '#1f2021',
                    weight: 0.1,
                    fillOpacity: 0.5,
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
        const rightSidebarStyles = {
            bmBurgerButton: {
              position: 'fixed',
              width: '20px',
              height: '18px',
              right: '20px',
              left: 'auto',
              top: '20px'
            },
            bmBurgerBars: {
              background: '#373a47'
            },
            bmBurgerBarsHover: {
              background: '#a90000'
            },
            bmCrossButton: {
              height: '24px',
              width: '24px'
            },
            bmCross: {
              background: '#bdc3c7'
            },
            bmMenuWrap: {
              position: 'fixed',
              height: '100%'
            },
            bmMenu: {
              background: '#373a47',
              padding: '2.5em 1.5em 0',
              fontSize: '1.15em'
            },
            bmMorphShape: {
              fill: '#373a47'
            },
            bmItemList: {
              color: '#b8b7ad',
              padding: '0.8em'
            },
            bmItem: {
              display: 'inline-block'
            },
            bmOverlay: {
              background: 'rgba(0, 0, 0, 0.3)'
            }
          }

        // TODO: Split menus into their own components
        return (
            <div className="container-fluid d-flex">
                <Menu>
                    <h1>Gerry</h1>
                    <Tabs>
                        <TabList>
                            <CustomTab>Inputs</CustomTab>
                            <CustomTab>Logs</CustomTab>
                            <CustomTab>Statistics</CustomTab>
                        </TabList>

                        <TabPanel>Panel 1</TabPanel>
                        <TabPanel>Panel 2</TabPanel>
                        <TabPanel>Panel 2</TabPanel>
                    </Tabs>
                </Menu>

                
                <Menu right styles={ rightSidebarStyles }>
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
                        onMouseOver={this.onMouseHover}
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
