import * as React from 'react';
import * as mapActionCreators from '../../redux/modules/state/state';

import * as ReactLeaflet from 'react-leaflet';
import * as Constants from '../../config/constants';

import { LatLng, PathOptions } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Control from 'react-leaflet-control';

import { LeftSidebar, RightSidebar, MapTooltip, IMapTooltipProps } from './components';
import { StateBorderService } from '../../libs/state-borders';
import { hashPrecinct } from '../../libs/functions/hash';
import { IDemographicsTabProps } from './components/DemographicsTabPanel';
import { IElectionsTabProps } from './components/ElectionsTabPanel';
import { IPrecinctPropertiesTabProps } from './components/PrecinctPropertiesTabPanel';
import { IVotingAgeTabProps } from './components/VotingAgeTabPanel';
import { Coloring } from '../../libs/coloring';
import { IPrecinct, Properties, MapFilterEnum, ViewLevelEnum, StateEnum } from '../../models';
import { setTooltipData } from '../../redux/modules/maptooltip/maptooltip';

import './mapview.scss';

export interface IMapViewProps {
    selectedState: string;
    precincts: any;
    precinctMap: Map<string, IPrecinct>;
    filter: MapFilterEnum;
    level: ViewLevelEnum;
    store: any;
}

interface IMapViewState {
    stateBorders: any[];
    map: ReactLeaflet.Map;
    isOpen: boolean;
    zoom: number;
    mapProps: {
        demographicsProps: IDemographicsTabProps;
        electionsProps: IElectionsTabProps;
        precinctProps: IPrecinctPropertiesTabProps;
        votingAgeProps: IVotingAgeTabProps;
    };
    mapTooltip: IMapTooltipProps;
    selectedPrecinctId: string;
}

export class MapViewComponent extends React.Component<IMapViewProps, IMapViewState> {
    state: IMapViewState = {
        stateBorders: [],
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
        },
        selectedPrecinctId: null
    };
    public coloring: Coloring;

    constructor() {
        super();
        this.coloring = new Coloring();
    }

    /**
     * LIFECYCLE HOOKS
     */
    async componentDidMount() {
        const statePopulator = new StateBorderService();
        await Promise.all([
            statePopulator.fetchStateBorder(StateEnum.CA),
            statePopulator.fetchStateBorder(StateEnum.UT),
            statePopulator.fetchStateBorder(StateEnum.VA)
        ]).then(data => {
            this.setState({
                stateBorders: data
            })
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.mapTooltip.statistics !== nextState.mapTooltip.statistics) {
            return false;
        }
        return true;
    }

    /**
     * LEAFLET EVENTS
     */

    onEachFeatureState(feature: any, layer: any) {
        layer.on({
            click: () => {
                this.state.map.leafletElement.fitBounds(layer.getBounds());
                this.props.store.dispatch(mapActionCreators.setSelectedState(this.props.selectedState, feature.state));
            }
        });
    }

    onEachFeaturePrecinct(feature: any, layer: any) {
        layer.on({
            click: () => {
                this.fetchPrecinctData(feature, layer);
                this.state.map.leafletElement.fitBounds(layer.getBounds(), {
                    paddingBottomRight: [500, 0]
                });
                this.setState({
                    selectedPrecinctId: hashPrecinct(feature.properties)
                });
            },
            mouseover: () => {
                layer.setStyle({
                    weight: 5,
                    color: layer.options.color
                });
            },
            mouseout: () => {
                layer.setStyle({
                    weight:
                        this.state.selectedPrecinctId &&
                        this.state.selectedPrecinctId === hashPrecinct(feature.properties)
                            ? 5
                            : 0.75,
                    color: layer.options.color
                });
            }
        });
    }

    onMouseHoverPrecinct(layer: any) {
        const properties: Properties = layer.layer.feature.properties;
        const toolTipProps = this.getMapTooltipProps(this.props.filter, properties);
        this.props.store.dispatch(setTooltipData(toolTipProps));
    }

    onZoom(e: any) {
        this.setState({
            zoom: this.state.map.viewport.zoom
        });
    }

    render() {
        return (
            <div className="container-fluid d-flex">
                <LeftSidebar />
                <RightSidebar
                    {...this.state.mapProps}
                    mapView={this}
                    resetSelectedPrecinctHandler={this.resetSelectedPrecinct.bind(this)}
                    isOpen={this.state.isOpen}
                />

                <ReactLeaflet.Map
                    className="row flex-fill"
                    ref={ref => {
                        this.state.map = ref;
                    }}
                    center={Constants.MAP_CENTER}
                    zoomControl={false}
                    zoom={4}
                    animate={true}
                    easeLinearly={true}
                    onZoomEnd={this.onZoom.bind(this)}
                >
                    <ReactLeaflet.TileLayer
                        url={Constants.MAP_BOX_ENDPOINT + Constants.MAP_BOX_TOKEN}
                        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    />
                    <ReactLeaflet.LayersControl position="bottomright">
                        <ReactLeaflet.LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                            <ReactLeaflet.TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                            />
                        </ReactLeaflet.LayersControl.BaseLayer>
                        <ReactLeaflet.LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
                            <ReactLeaflet.TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </ReactLeaflet.LayersControl.BaseLayer>
                        <ReactLeaflet.LayersControl.BaseLayer checked name="Mapbox Light">
                            <ReactLeaflet.TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A"
                            />
                        </ReactLeaflet.LayersControl.BaseLayer>
                        <ReactLeaflet.LayersControl.BaseLayer name="Mapbox Dark">
                            <ReactLeaflet.TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A"
                            />
                        </ReactLeaflet.LayersControl.BaseLayer>
                        <ReactLeaflet.LayersControl.BaseLayer name="Mapbox Streets">
                            <ReactLeaflet.TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3BpZGVycGlnODYiLCJhIjoiY2swaXV5amZhMDQwbjNob2M4ZDlkaTdpeCJ9.qSP-Dad2FIXnIJ7eAwaq6A"
                            />
                        </ReactLeaflet.LayersControl.BaseLayer>
                    </ReactLeaflet.LayersControl>

                    <Control position="bottomleft">
                        <MapTooltip {...this.state.mapTooltip} />
                    </Control>

                    <ReactLeaflet.ZoomControl position={'bottomright'} />

                    {this.state.stateBorders &&
                        this.state.stateBorders.map((data: any, i: number) => {
                            if (
                                data.state === this.props.selectedState &&
                                this.props.precincts &&
                                this.state.zoom > 5
                            ) {
                                return (
                                    <ReactLeaflet.GeoJSON
                                        key={`precinct${this.props.precincts.features.length}`}
                                        data={this.props.precincts as GeoJsonObject}
                                        preferCanvas={true}
                                        style={this.getPrecinctStyle.bind(this)}
                                        onMouseOver={this.onMouseHoverPrecinct.bind(this)}
                                        onEachFeature={this.onEachFeaturePrecinct.bind(this)}
                                    />
                                );
                            } else {
                                return (
                                    <ReactLeaflet.GeoJSON
                                        key={data.state}
                                        data={data.data as GeoJsonObject}
                                        style={this.coloring.colorDefault.bind(this.coloring)}
                                        onEachFeature={this.onEachFeatureState.bind(this)}
                                    />
                                );
                            }
                        })}
                </ReactLeaflet.Map>
            </div>
        );
    }

    private fetchPrecinctData(feature: any, layer: any) {
        const properties = feature.properties;
        const electionsProps: IElectionsTabProps = {
            election2016: {
                presidentialResults: {
                    democraticVotes: properties.v16_dpres,
                    republicanVotes: properties.v16_rpres,
                    otherVotes: properties.v16_opres
                },
                senatorialResults: {
                    democraticVotes: properties.v16_dsenate,
                    republicanVotes: properties.v16_rsenate,
                    otherVotes: properties.v16_osenate
                },
                houseResults: {
                    democraticVotes: properties.v16_dhouse,
                    republicanVotes: properties.v16_rhouse,
                    otherVotes: properties.v16_ohouse
                }
            },
            election2018: {
                senatorialResults: {
                    democraticVotes: properties.v18_dsenate,
                    republicanVotes: properties.v18_rsenate,
                    otherVotes: properties.v18_oseante
                },
                houseResults: {
                    democraticVotes: properties.v18_dhouse,
                    republicanVotes: properties.v18_rhouse,
                    otherVotes: properties.v18_ohouse
                }
            }
        };
        const demographicsProps: IDemographicsTabProps = {
            totalPopulation: properties.pop_total,
            nonHispanicDemographics: {
                White: properties.pop_white_nh,
                AfricanAmerican: properties.pop_black_nh,
                Asian: properties.pop_asian_nh,
                NativeAmericans: properties.pop_amin_nh,
                PacificIslander: properties.pop_nhpi_nh,
                Other: properties.pop_other_nh,
                Biracial: properties.pop_2more_nh
            },
            hispanicDemographics: {
                Hispanic: properties.pop_hispanic,
                White: properties.pop_white_h,
                AfricanAmerican: properties.pop_black_h,
                Asian: properties.pop_asian_h,
                NativeAmericans: properties.pop_amin_h,
                PacificIslander: properties.pop_nhpi_h,
                Other: properties.pop_other_h,
                Biracial: properties.pop_2more_h
            }
        };
        const votingAgeProps: IVotingAgeTabProps = {
            totalVotingPopulation: properties.pop_total_voting,
            votingAgeDemographics: {
                White: properties.pop_white_voting,
                AfricanAmerican: properties.pop_black_voting,
                Hispanic: properties.pop_hispanic_voting,
                NativeAmericans: properties.pop_amin_voting,
                Asian: properties.pop_asian_voting,
                PacificIslander: properties.pop_nhpi_voting,
                Other: properties.pop_other_voting,
                Biracial: properties.pop_2more_voting
            }
        };
        const precinctProps: IPrecinctPropertiesTabProps = {
            precinctName: properties.precinct_name,
            subPrecinctNumber: properties.SbPrcnc,
            municipalityName: properties.AliasNm,
            countyName: properties.county_name,
            jurisdictionName: properties.jrsdctn,
            congressionalDistrictId: properties.cd
        };
        console.log(properties);
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

    public getMajorityPartyInPrecinct(properties: any): { party: string; percent: number } {
        let democratVotes = 0,
            republicanVotes = 0,
            otherVotes = 0;
        switch (this.props.filter) {
            case MapFilterEnum.PRES_2016:
                democratVotes = properties.v16_dpres;
                republicanVotes = properties.v16_rpres;
                otherVotes = properties.v16_opres || 0;
                break;
            case MapFilterEnum.HOUSE_2016:
                democratVotes = properties.v16_dhouse;
                republicanVotes = properties.v16_rhouse;
                otherVotes = properties.v16_ohouse || 0;
                break;
            case MapFilterEnum.SENATE_2016:
                democratVotes = properties.v16_dsenate || 0;
                republicanVotes = properties.v16_rsenate || 0;
                otherVotes = properties.v16_osenate || 0;
                break;
            case MapFilterEnum.HOUSE_2018:
                democratVotes = properties.v18_dhouse || 0;
                republicanVotes = properties.v18_rhouse || 0;
                otherVotes = properties.v18_ohouse || 0;
                break;
            case MapFilterEnum.SENATE_2018:
                democratVotes = properties.v18_dsenate || 0;
                republicanVotes = properties.v18_rsenate || 0;
                otherVotes = properties.v18_osenate || 0;
                break;
        }
        const totalVotes = Number(democratVotes) + Number(republicanVotes) + Number(otherVotes);
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
        const otherPercent = {
            percent: otherVotes / totalVotes,
            party: 'O'
        };
        return [republicanPercent, democratPercent, otherPercent].reduce((prev: any, cur: any) =>
            prev.percent < cur.percent ? cur : prev
        );
    }

    public getPrecinctStyle(feature: any, layer: any): PathOptions {
        const properties = feature.properties;
        let style = {};
        if (this.props.filter === MapFilterEnum.PRES_2016 || this.props.filter === MapFilterEnum.HOUSE_2016 ||
            this.props.filter === MapFilterEnum.SENATE_2016 || this.props.filter === MapFilterEnum.HOUSE_2018 ||
            this.props.filter === MapFilterEnum.SENATE_2018) {
            style = this.coloring.getPoliticalStyle(properties, this.props.filter,
                this.getMajorityPartyInPrecinct(properties));
        } else if (this.props.filter === MapFilterEnum.DEFAULT) {
            style = this.coloring.colorDefault(properties, this.props.level, this.props.precinctMap);
        } else {
            style = this.coloring.getDemographicStyle(properties, this.props.filter);
        }
        return {
            ...style,
            weight: this.state.selectedPrecinctId && this.state.selectedPrecinctId === hashPrecinct(properties) ? 5 : 0.75
        };
    }

    private getMapTooltipProps(filter: string, properties: any): IMapTooltipProps {
        if (this.props.level === ViewLevelEnum.OLD_DISTRICTS || this.props.level === ViewLevelEnum.NEW_DISTRICTS) {
            return this.fetchDistrictProperties(filter, properties);
        } else {
            return this.fetchPrecinctProperties(filter, properties);
        }
    }

    private fetchPrecinctProperties(filter: string, properties: any): IMapTooltipProps {
        switch (filter) {
            case MapFilterEnum.PRES_2016:
                return {
                    title: '2016 Presidential Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: Math.round(properties.v16_dpres),
                            needsPercent: true,
                            barColor: Constants.COLOR_DEMOCRAT
                        },
                        {
                            key: 'Republican Votes',
                            value: Math.round(properties.v16_rpres),
                            needsPercent: true,
                            barColor: Constants.COLOR_REPUBLICAN
                        },
                        {
                            key: 'Other Votes',
                            value: Math.round(properties.v16_opres) || 0,
                            needsPercent: true,
                            barColor: Constants.COLOR_INDEPENDENT
                        }
                    ]
                };
            case MapFilterEnum.HOUSE_2016:
                const total = properties.v16_house + properties.v16_rhouse;
                return {
                    title: '2016 House Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: Math.round(properties.v16_dhouse),
                            needsPercent: true,
                            barColor: Constants.COLOR_DEMOCRAT
                        },
                        {
                            key: 'Republican Votes',
                            value: Math.round(properties.v16_rhouse),
                            needsPercent: true,
                            barColor: Constants.COLOR_REPUBLICAN
                        }
                    ]
                };
            case MapFilterEnum.SENATE_2016:
                return {
                    title: '2016 Senate Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: Math.round(properties.v16_dsenate),
                            needsPercent: true,
                            barColor: Constants.COLOR_DEMOCRAT
                        },
                        {
                            key: 'Republican Votes',
                            value: Math.round(properties.v16_rsenate),
                            needsPercent: true,
                            barColor: Constants.COLOR_REPUBLICAN
                        }
                    ]
                };
            case MapFilterEnum.HOUSE_2018:
                return {
                    title: '2018 House Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: Math.round(properties.v18_dhouse),
                            needsPercent: true,
                            barColor: Constants.COLOR_DEMOCRAT
                        },
                        {
                            key: 'Republican Votes',
                            value: Math.round(properties.v18_rhouse),
                            needsPercent: true,
                            barColor: Constants.COLOR_REPUBLICAN
                        }
                    ]
                };
            case MapFilterEnum.SENATE_2018:
                return {
                    title: '2018 Senate Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: Math.round(properties.v18_dsenate),
                            needsPercent: true,
                            barColor: Constants.COLOR_DEMOCRAT
                        },
                        {
                            key: 'Republican Votes',
                            value: Math.round(properties.v18_rsenate),
                            needsPercent: true,
                            barColor: Constants.COLOR_REPUBLICAN
                        }
                    ]
                };
            default:
                return {
                    title: 'Demographic Data',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'White Population',
                            value: Math.round(properties.pop_white_nh || 0),
                            needsPercent: true
                        },
                        {
                            key: 'Black Population',
                            value: Math.round(properties.pop_black_nh || 0),
                            needsPercent: true
                        },
                        {
                            key: 'Hispanic Population',
                            value: Math.round(properties.pop_hispanic || 0),
                            needsPercent: true
                        },
                        {
                            key: 'Asian Population',
                            value: Math.round(properties.pop_asian_nh || 0),
                            needsPercent: true
                        },
                        {
                            key: 'Native American Population',
                            value: Math.round(properties.pop_amin_nh || 0),
                            needsPercent: true
                        },
                        {
                            key: 'Pacific Islander Population',
                            value: Math.round(properties.pop_nhpi_nh || 0),
                            needsPercent: true
                        },
                        {
                            key: 'Other Population',
                            value: Math.round(properties.pop_other_nh || 0),
                            needsPercent: true
                        },
                        {
                            key: 'Biracial Population',
                            value: Math.round(properties.pop_2more_nh || 0),
                            needsPercent: true
                        }
                    ]
                };
        } 
    }

    private fetchDistrictProperties(filter: string, properties: any): IMapTooltipProps {
        return {
            title: 'District Data',
            subtitle: 'District information',
            statistics: [
                {
                    key: 'Democratic Vote',
                    value: 120000,
                    needsPercent: true,
                    barColor: Constants.COLOR_DEMOCRAT
                },
                {
                    key: 'Republican Vote',
                    value: 120000,
                    needsPercent: true
                },
                {
                    key: 'Total District Population',
                    value: 240000
                },
                {
                    key: 'Political Fairness Score',
                    value: 0.6
                },
                {
                    key: 'Population Equality Score',
                    value: 0.6
                },
                {
                    key: 'Compactness Score',
                    value: 0.6
                },
                {
                    key: 'Contiguity Score',
                    value: 0.6
                }
            ]
        };
    }

    private resetSelectedPrecinct() {
        this.setState({ selectedPrecinctId: null });
    }
}

function mapStatetoProps(state: any, ownProps: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        precincts: state.stateReducer.precincts,
        precinctMap: state.stateReducer.precinctMap,
        filter: state.stateReducer.filterArgs.mapFilter,
        level: state.stateReducer.filterArgs.viewLevel,
        store: ownProps.store
    };
}

export const MapView = connect(
    (state: any, ownProps: any) => mapStatetoProps(state, ownProps),
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(MapViewComponent);
