import * as React from 'react';
import * as Color from 'color';
import * as mapActionCreators from '../../redux/modules/state/state';
import { setTooltipData } from '../../redux/modules/maptooltip/maptooltip';

import {
    Map,
    TileLayer,
    GeoJSON,
    LayersControl,
    ZoomControl
} from 'react-leaflet';
import { LatLng, PathOptions } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Control from 'react-leaflet-control';

import { MAP_BOX_ENDPOINT, MAP_BOX_TOKEN } from '../../config/constants';
import {
    LeftSidebar,
    RightSidebar,
    MapTooltip,
    IMapTooltipProps
} from './components';
import { StateBordersApi, States } from '../../libs/state-borders';
import { IDemographicsTabProps } from './components/DemographicsTabPanel';
import { IElectionsTabProps } from './components/ElectionsTabPanel';
import { IPrecinctPropertiesTabProps } from './components/PrecinctPropertiesTabPanel';
import { IVotingAgeTabProps } from './components/VotingAgeTabPanel';
import * as Constants from '../../config/constants';

import './mapview.scss';
import * as UT_Districts from '../../data/UT-demo.json';

interface IMapViewProps {
    selectedState: string;
    precincts: any;
    filter: string;
    store: any;
}

interface IMapViewState {
    stateBorders: any[];
    selectedState: string;
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

export class MapViewComponent extends React.Component<
    IMapViewProps,
    IMapViewState
    > {
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

    /**
     * LIFECYCLE HOOKS
     */

    async componentDidMount() {
        const statePopulator = new StateBordersApi();
        await Promise.all([
            statePopulator.fetchStateBorder(States.CA),
            statePopulator.fetchStateBorder(States.UT),
            statePopulator.fetchStateBorder(States.VA)
        ]).then(data =>
            this.setState({
                stateBorders: data
            })
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.mapTooltip.statistics !== nextState.mapTooltip.statistics
        ) {
            return false;
        }

        return true;
    }

    /**
     * LEAFLET EVENTS
     */

    onEachFeatureDistrict(feature: any, layer: any) {
        layer.on({
            click: () => {
                this.state.map.leafletElement.fitBounds(layer.getBounds());
                this.props.store.dispatch(
                    mapActionCreators.setSelectedState(feature.state)
                );
            }
        });
    }

    onEachFeaturePrecinct(feature: any, layer: any) {
        layer.on({
            click: this.showPrecinctData.bind(this),
            mouseover: () => {
                layer.setStyle({
                    weight: 5,
                    color: layer.options.color
                });
            },
            mouseout: () => {
                layer.setStyle({
                    weight: 0.5,
                    color: layer.options.color
                });
            }
        });
    }

    onMouseHover(layer: any) {
        const popupContent = ` <Popup><p>Congressional District Data</p><pre>Historic Vote: <br />${layer.layer.feature.properties.HistoricVote}</pre></Popup>`;
        layer.target.bindPopup(popupContent);
        layer.target.openPopup(layer.latlng);
    }

    onMouseHoverPrecinct(layer: any) {
        const properties: any = layer.layer.feature.properties;
        const toolTipProps = this.getMapTooltipProps(this.props.filter, properties);
        this.props.store.dispatch(setTooltipData(toolTipProps));
    }

    onMouseLeavePrecinct(layer: any) {
        this.props.store.dispatch(
            setTooltipData({
                mapTooltip: {
                    title: null,
                    subtitle: null,
                    statistics: null
                }
            })
        );
    }

    onZoom(e: any) {
        this.setState({
            zoom: this.state.map.viewport.zoom
        });
    }

    render() {
        const position = new LatLng(40.3, -96.0);

        return (
            <div className="container-fluid d-flex">
                <LeftSidebar />
                <RightSidebar
                    {...this.state.mapProps}
                    mapView={this}
                    isOpen={this.state.isOpen}
                />

                <Map
                    className="row flex-fill"
                    ref={ref => {
                        this.state.map = ref;
                    }}
                    center={position}
                    zoomControl={false}
                    zoom={4}
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
                    {this.state.stateBorders &&
                        this.state.stateBorders.map((data: any, i: number) => {
                            if (
                                data.state === this.props.selectedState &&
                                this.props.precincts &&
                                this.state.zoom > 5
                            ) {
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
                                            data={
                                                this.props
                                                    .precincts as GeoJsonObject
                                            }
                                            preferCanvas={true}
                                            style={this.getPrecinctStyle.bind(
                                                this
                                            )}
                                            onMouseOver={this.onMouseHoverPrecinct.bind(
                                                this
                                            )}
                                            onMouseOut={this.onMouseLeavePrecinct.bind(
                                                this
                                            )}
                                            onEachFeature={this.onEachFeaturePrecinct.bind(
                                                this
                                            )}
                                        />
                                    </div>
                                );
                            } else {
                                return (
                                    <GeoJSON
                                        key={data.state}
                                        data={data.data as GeoJsonObject}
                                        style={this.getStateStyle.bind(this)}
                                        onEachFeature={this.onEachFeatureDistrict.bind(
                                            this
                                        )}
                                    />
                                );
                            }
                        })}
                </Map>
            </div>
        );
    }

    private showPrecinctData(feature: any, layer: any) {
        const properties = feature.target.feature.properties;
        const electionsProps: IElectionsTabProps = {
            presidentialResults: {
                democraticVotes: properties.PRES16D,
                republicanVotes: properties.PRES16R,
                independentVotes: properties.PRES16I
            },
            senatorialResults: {
                democraticVotes: properties.SEN16D,
                republicanVotes: properties.SEN16R
            },
            gubernatorialResults: {
                democraticVotes: properties.GOV16D,
                republicanVotes: properties.GOV16R
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
        };
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

    private getStateStyle(feature: any, layer: any): PathOptions {
        return {
            color: 'rgb(51, 136, 255)',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: 'rgb(51, 136, 255)'
        };
    }

    private getPrecinctStyle(feature: any, layer: any): PathOptions {
        if (this.props.filter === Constants.MAP_FILTER_PRES_2016 || this.props.filter === Constants.MAP_FILTER_CONGRESS_2016 || this.props.filter === Constants.MAP_FILTER_CONGRESS_2018) {
            return this.colorPolitical(feature, this.props.filter);
        } else if (this.props.filter === Constants.MAP_FILTER_DISTRICTS) {
            return this.colorDistricts(feature, this.props.filter);
        } else {
            return this.colorDemographic(feature, this.props.filter);
        }
    }

    private colorPolitical(feature: any, filter: string) {
        const majorityParty = this.getMajorityPartyPrecinct(feature.properties);

        switch (majorityParty.party) {
            case 'D':
                let partyColor: Color = majorityParty.percent >= 0.75
                    ? Color.rgb([16, 114, 195]).saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.rgb([16, 114, 195]).lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.rgb([16, 114, 195]).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'R':
                partyColor = majorityParty.percent >= 0.75
                    ? Color.rgb([170, 57, 57]).saturate((majorityParty.percent - 0.75) * 3).darken((majorityParty.percent - 0.75))
                    : Color.rgb([170, 57, 57]).lighten((0.75 - majorityParty.percent) * 3);
                return {
                    color: Color.rgb([170, 57, 57]).darken(.25).hex(),
                    weight: 0.5,
                    fillOpacity: 0.75,
                    fillColor: partyColor.hex()
                };
            case 'I':
                partyColor = majorityParty.percent >= 0.55
                    ? Color.rgb([130, 182, 127]).saturate((majorityParty.percent - 0.55) * 3).darken((majorityParty.percent - 0.55))
                    : Color.rgb([130, 182, 127]).lighten((0.55 - majorityParty.percent) * 3);
                return {
                    color: Color.rgb([130, 182, 127]).darken(.25).hex(),
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

    private colorDemographic(feature: any, filter: string) {
        const properties = feature.properties;
        const demographicPercent = this.getPopulationPercentByDemographic(properties, filter);
        let color = Color.rgb([252, 210, 122]).saturate((demographicPercent - 0.75) * 3)
            .darken(demographicPercent - 0.75)
            .hex();
        if (demographicPercent < 0.75) {
            color = Color.rgb([252, 210, 122])
                .lighten(0.75 - demographicPercent)
                .hex();
        }

        if (properties.TOTPOP === 0) {
            color = Color.rgb([0, 0, 0]).alpha(0).hex();
        }

        return {
            color: Color.rgb([252, 210, 122])
                .darken(0.5)
                .hex(),
            weight: 0.5,
            fillOpacity: 0.75,
            fillColor: color
        };
    }

    private colorDistricts(feature: any, filter: string) {
        const properties = feature.properties;
        const color = Constants.DISTRICT_COLORS[properties.CD - 1];

        return {
            color: Color.default(color)
                .darken(0.5)
                .hex(),
            weight: 0.5,
            fillOpacity: 0.75,
            fillColor: color
        };
    }

    private getPopulationPercentByDemographic(properties: any, filter: string): number {
        let demographicPopulation = 0;
        switch (filter) {
            case Constants.MAP_FILTER_WHITE_DENSITY:
                demographicPopulation = properties.NH_WHITE
                break;
            case Constants.MAP_FILTER_BLACK_DENSITY:
                demographicPopulation = properties.NH_BLACK;
                break;
            case Constants.MAP_FILTER_ASIAN_DENSITY:
                demographicPopulation = properties.NH_ASIAN;
                break;
            case Constants.MAP_FILTER_HISPANIC_DENSITY:
                demographicPopulation = properties.HISP;
                break;
            case Constants.MAP_FILTER_NATIVE_AMERICAN_DENSITY:
                demographicPopulation = properties.NH_AMIN;
                break;
            case Constants.MAP_FILTER_PACIFIC_ISLANDER_DENSITY:
                demographicPopulation = properties.NH_NHPI;
                break;
            case Constants.MAP_FILTER_OTHER_DENSITY:
                demographicPopulation = properties.NH_OTHER;
                break;
            case Constants.MAP_FILTER_BIRACIAL_DENSITY:
                demographicPopulation = properties.NH_2MORE;
                break;
        }

        return demographicPopulation / properties.TOTPOP;
    }

    private getMapTooltipProps(filter: string, properties: any): IMapTooltipProps {
        switch (filter) {
            case Constants.MAP_FILTER_PRES_2016:
                return {
                    title: '2016 Presidential Election',
                    subtitle: `Precinct: ${properties.PrcncID}`,
                    statistics: [
                        { key: 'Democratic Votes: ', value: `${properties.PRES16D}` },
                        { key: 'Republican Votes: ', value: `${properties.PRES16R}` },
                        { key: 'Independent Votes: ', value: `${properties.PRES16I}` }
                    ]
                };
            case Constants.MAP_FILTER_CONGRESS_2016:
                return {
                    title: '2016 Congressional Election',
                    subtitle: `Precinct: ${properties.PrcncID}`,
                    statistics: [
                        { key: 'Democratic Votes: ', value: `${properties.SEN16D}` },
                        { key: 'Republican Votes: ', value: `${properties.SEN16R}` }
                    ]
                };
            case Constants.MAP_FILTER_CONGRESS_2018:
                return {
                    title: '2018 Congressional Election',
                    subtitle: `Precinct: ${properties.PrcncID}`,
                    statistics: [
                        { key: 'Democratic Votes: ', value: `${properties.PRES16D}` },
                        { key: 'Republican Votes: ', value: `${properties.PRES16R}` },
                    ]
                };
            default:
                return {
                    title: 'Demographic Data',
                    subtitle: `Precinct: ${properties.PrcncID}`,
                    statistics: [
                        { key: 'White Population: ', value: `${Math.round(properties.NH_WHITE)}` },
                        { key: 'Black Population: ', value: `${Math.round(properties.NH_BLACK)}` },
                        { key: 'Hispanic Population: ', value: `${Math.round(properties.HISP)}` },
                        { key: 'Asian Population: ', value: `${Math.round(properties.NH_ASIAN)}` },
                        { key: 'Native American Population: ', value: `${Math.round(properties.NH_AMIN)}` },
                        { key: 'Pacific Islander Population: ', value: `${Math.round(properties.NH_NHPI)}` },
                        { key: 'Other Population: ', value: `${Math.round(properties.NH_OTHER)}` },
                        { key: 'Biracial Population: ', value: `${Math.round(properties.NH_OTHER)}` },
                    ]
                };
        }
    }

    private getMajorityPartyPrecinct(
        properties: any
    ): { party: string; percent: number } {

        // Store the per party info based on election type
        let democratVotes = 0, republicanVotes = 0, independentVotes = 0;

        switch (this.props.filter) {
            case Constants.MAP_FILTER_PRES_2016:
                democratVotes = properties.PRES16D;
                republicanVotes = properties.PRES16R;
                independentVotes = properties.PRES16I;
                break;
            case Constants.MAP_FILTER_CONGRESS_2016:
                democratVotes = properties.SEN16D;
                republicanVotes = properties.SEN16R;
                independentVotes = properties.SEN16I || 0;
                break;
            case Constants.MAP_FILTER_CONGRESS_2018:
                break;
        }

        const totalVotes = democratVotes + republicanVotes + independentVotes;

        if (totalVotes === 0) {
            return { percent: 0, party: '-' };
        }

        const democratPercent = {
            percent: democratVotes / totalVotes,
            party: 'D'
        };
        const republicanPercent = {
            percent: republicanVotes / totalVotes,
            party: 'R'
        };
        const independentPercent = {
            percent: independentVotes / totalVotes,
            party: 'I'
        };

        return [republicanPercent, democratPercent, independentPercent].reduce(
            (prev: any, cur: any) => (prev.percent < cur.percent ? cur : prev)
        );
    }
}

function mapStatetoProps(state: any, ownProps: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        precincts: state.stateReducer.precincts,
        filter: state.stateReducer.filter,
        store: ownProps.store
    };
}

export const MapView = connect(
    (state: any, ownProps: any) => mapStatetoProps(state, ownProps),
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(MapViewComponent);
