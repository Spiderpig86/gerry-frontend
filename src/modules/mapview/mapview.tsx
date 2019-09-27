import * as React from 'react';
import * as Color from 'color';
import * as mapActionCreators from '../../redux/modules/state/state';

import { Map, TileLayer, GeoJSON, LayersControl, ZoomControl } from 'react-leaflet';
import { LatLng, PathOptions } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Control from 'react-leaflet-control';

import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';
import { LeftSidebar, RightSidebar, MapTooltip, IMapTooltipProps } from './components';
import { StateBordersApi, States } from '../../api/state-borders';
import { IDemographicsTabProps } from './components/DemographicsTabPanel';
import { IElectionsTabProps } from './components/ElectionsTabPanel';
import { IPrecinctPropertiesTabProps } from './components/PrecinctPropertiesTabPanel';
import { IVotingAgeTabProps } from './components/VotingAgeTabPanel';

import './mapview.scss';
import * as UT_Districts from '../../data/UT-demo.json';

interface IMapViewProps {
    selectedState: string;
    precincts: any;
}

interface IMapViewState {
    stateBorders: any[]
    selectedState: string
    precincts: any;
    map: Map;
    isOpen: boolean;
    zoom: number;
    
    mapProps: {
        demographicsProps: IDemographicsTabProps;
        electionsProps: IElectionsTabProps;
        precinctProps: IPrecinctPropertiesTabProps;
        votingAgeProps: IVotingAgeTabProps;
    };

    mapTooltip: IMapTooltipProps;
}

export class MapViewComponent extends React.Component<IMapViewProps, IMapViewState> {

    state: IMapViewState = {
        stateBorders: [],
        selectedState: 'UT',
        precincts: null,
        isOpen: false,
        map: null,
        zoom: 5,
        mapProps: {
            demographicsProps: null,
            electionsProps: null,
            precinctProps: null,
            votingAgeProps: null
        },
        mapTooltip: {
            title: null,
            subtitle: null,
            statistics: null
        }
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

        const precincts: any = await statePopulator.fetchPrecincts(this.props.selectedState);
        this.setState({
            precincts: precincts.data.geometry
        });
    }

    onEachFeatureDistrict(feature: any, layer: any) {
        layer.on({
            click: (() => this.state.map.leafletElement.fitBounds(layer.getBounds()))
        });
    }

    onEachFeaturePrecinct(feature: any, layer: any) {
        layer.on({
            click: this.showPrecinctData.bind(this)
        });
    }

    showPopup(feature: any, layer: any) {
        const popupContent = ` <Popup><p>Congressional District Data</p><pre>Historic Vote: <br />${feature.properties.HistoricVote}</pre></Popup>`
        layer.bindPopup(popupContent);
    }

    showPrecinctData(feature: any, layer: any) {
        const properties = feature.target.feature.properties;
        console.log(properties);
        const electionsProps: IElectionsTabProps = {
            presidentialResults: {
                democraticVotes: properties.PRES16D,
                republicanVotes: properties.PRES16R,
                independentVotes: properties.PRES16I
            },
            senatorialResults: {
                democraticVotes: properties.SEN16D,
                republicanVotes: properties.SEN16R,
            },
            gubernatorialResults: {
                democraticVotes: properties.GOV16D,
                republicanVotes: properties.GOV16R,
            }
        };
        const demographicsProps: IDemographicsTabProps = {
            totalPopulation: properties.TOTPOP,
            nonHispanicDemographics: {
                White: properties.NH_WHITE,
                AfricanAmerican: properties.NH_BLACK,
                Asian: properties.NH_ASIAN,
                NativeAmericans: properties.NH_AMIN,
                PacificIslander: properties.NH_NHPI,
                Other: properties.NH_OTHER,
                Biracial: properties.NH_2MORE
            },
            hispanicDemographics: {
                White: properties.H_WHITE,
                AfricanAmerican: properties.H_BLACK,
                Asian: properties.H_ASIAN,
                NativeAmericans: properties.H_AMIN,
                PacificIslander: properties.H_NHPI,
                Other: properties.H_OTHER,
                Biracial: properties.H_2MORE,
                Hispanic: properties.HISP
            }
        };
        const votingAgeProps: IVotingAgeTabProps = {
            totalVotingPopulation: properties.VAP,
            votingAgeDemographics: {
                White: properties.WVAP,
                AfricanAmerican: properties.BVAP,
                Hispanic: properties.HVAP,
                NativeAmericans: properties.AMINVAP,
                Asian: properties.ASIANVAP,
                PacificIslander: properties.NHPIVAP,
                Other: properties.OTHERVAP,
                Biracial: properties['2MOREVAP']
            }
        };
        const precinctProps: IPrecinctPropertiesTabProps = {
            precinctName: properties.PrcncID,
            subPrecinctNumber: properties.SbPrcnc,
            municipalityName: properties.AliasNm,
            countyName: properties.cnty_nm,
            jurisdictionName: properties.jrsdctn,
            congressionalDistrictId: properties.CD
        }
        this.setState({
            isOpen: true,
            mapProps: {
                electionsProps,
                demographicsProps,
                votingAgeProps,
                precinctProps
            }
        });
    }

    onMouseHover(layer: any) {
        const popupContent = ` <Popup><p>Congressional District Data</p><pre>Historic Vote: <br />${layer.layer.feature.properties.HistoricVote}</pre></Popup>`
        layer.target.bindPopup(popupContent);
        layer.target.openPopup(layer.latlng);
    }

    onMouseHoverPrecinct(layer: any) {
        const properties: any = layer.layer.feature.properties;
        // const popupContent = ` <Popup><p class="text-align-center"><b>Precinct ${properties.PrcncID} Data</b></p><ul>
        //     <li><b>Democratic Votes:</b> ${properties.PRES16D}</li>
        //     <li><b>Republican Votes:</b> ${properties.PRES16R}</li>
        //     <li><b>Independent Votes:</b> ${properties.PRES16I}</li>
        //     <li><b>Total Population:</b> ${Math.round(properties.TOTPOP)}</li>
        // </ul></Popup>`
        // layer.target.bindPopup(popupContent);
        // layer.target.openPopup(layer.latlng);
        const toolTipProps = {
            title: 'Precinct Data',
            subtitle: `Precinct: ${properties.PrcncID}`,
            statistics: [
                {key: 'Democratic Votes: ', value: `${properties.PRES16D}`},
                {key: 'Republican Votes: ', value: `${properties.PRES16R}`},
                {key: 'Independent Votes: ', value: `${properties.PRES16I}`},
            ]
        };
        this.setState({
            mapTooltip: toolTipProps
        });
    }

    onMouseLeavePrecinct(layer: any) {
        this.setState({
            mapTooltip: {
                title: null,
                subtitle: null,
                statistics: null
            }
        });
    }

    onZoom(e) {
        this.setState({
            zoom: this.state.map.viewport.zoom
        });
    }

    render() {
        const position = new LatLng(40.3, -96.0);

        // TODO: Split menus into their own components
        return (
            <div className="container-fluid d-flex">
                
                <LeftSidebar />
                <RightSidebar {...this.state.mapProps} mapView={this} isOpen={this.state.isOpen}/>
                
                <Map 
                    className="row flex-fill"
                    ref={(ref) => { this.state.map = ref }}
                    center={position}
                    zoomControl={false}
                    zoom={5}
                    style={{ height: '700px' }}
                    animate={true}
                    easeLinearly={true}
                    onZoomEnd={this.onZoom.bind(this)}
                >
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

                    <Control position="bottomleft">
                        <MapTooltip {...this.state.mapTooltip} />
                    </Control>

                    <ZoomControl position={'bottomright'} />
                    {
                        this.state.stateBorders && this.state.stateBorders.map((data: any, i: number) => {
                            console.log(this.props);

                            if (data.state === this.props.selectedState && this.props.precincts && this.state.zoom > 5) {
                                console.log(this.props.precincts);
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
                                            data={this.props.precincts as GeoJsonObject}
                                            style={this.getPrecinctStyle.bind(this)}
                                            onMouseOver={this.onMouseHoverPrecinct.bind(this)}
                                            onMouseOut={this.onMouseLeavePrecinct.bind(this)}
                                            onEachFeature={this.onEachFeaturePrecinct.bind(this)}
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <GeoJSON
                                        key={data.state}
                                        data={data.data as GeoJsonObject}
                                        style={this.getStateStyle.bind(this)}
                                        onEachFeature={this.onEachFeatureDistrict.bind(this)}
                                    />
                                )
                            }
                        })
                    }
                </Map>
            </div>
        );
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

    private getMajorityParty(properties: any): { party: string, percent: number } {
        return properties.DemocratChance > properties.RepublicanChance ? 
            { party: 'D', percent: parseFloat(properties.DemocratChance) } : 
            { party: 'R', percent: parseFloat(properties.RepublicanChance) };
    }

    private getMajorityPartyPrecinct(properties: any): { party: string, percent: number } {
        const totalVotes = properties.PRES16R + properties.PRES16D + properties.PRES16I;

        if (totalVotes === 0) {
            return { percent: 0, party: '-' };
        }

        const republicanPercent = { percent: properties.PRES16R / totalVotes, party: 'R' };
        const democratPercent = { percent: properties.PRES16D / totalVotes, party: 'D' };
        const independentPercent = { percent: properties.PRES16I / totalVotes, party: 'I' };

        return [republicanPercent, democratPercent, independentPercent].reduce((prev: any, cur: any) => prev.percent < cur.percent ? cur : prev);
    }
}

export const MapView = connect(
    (state: any) => {
        return ({ selectedState: state.stateReducer.selectedState, precincts: state.stateReducer.precincts })
    },
    (dispatch) => bindActionCreators(mapActionCreators, dispatch)
)(MapViewComponent);