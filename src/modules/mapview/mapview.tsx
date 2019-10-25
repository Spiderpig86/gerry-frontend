import * as React from 'react';
import * as mapActionCreators from '../../redux/modules/state/state';
import { setTooltipData } from '../../redux/modules/maptooltip/maptooltip';

import * as ReactLeaflet from 'react-leaflet';
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
import { Coloring } from '../../libs/coloring';
import { IPrecinct, Properties } from '../../models';
import * as Constants from '../../config/constants';

import './mapview.scss';

export interface IMapViewProps {
    selectedState: string;
    precincts: any;
    precinctMap: Map<string, IPrecinct>;
    filter: string;
    level: string;
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
}

export class MapViewComponent extends React.Component<
    IMapViewProps,
    IMapViewState
> {
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
        }
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
        const statePopulator = new StateBordersApi();
        await Promise.all([
            statePopulator.fetchStateBorder(States.CA),
            statePopulator.fetchStateBorder(States.UT),
            statePopulator.fetchStateBorder(States.VA),
        ]).then(data =>
            this.setState({
                stateBorders: data
            })
        );
        await statePopulator.fetchPrecincts('blank');
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

    onEachFeatureState(feature: any, layer: any) {
        layer.on({
            click: () => {
                this.state.map.leafletElement.fitBounds(layer.getBounds());
                this.props.store.dispatch(
                    mapActionCreators.setSelectedState(this.props.selectedState, feature.state)
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
        const properties: Properties = layer.layer.feature.properties;
        const toolTipProps = this.getMapTooltipProps(
            this.props.filter,
            properties
        );
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

                <ReactLeaflet.Map
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
                    <ReactLeaflet.TileLayer
                        url={MAP_BOX_ENDPOINT + MAP_BOX_TOKEN}
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
                                            key={'precincts'}
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
                                );
                            } else {
                                return (
                                    <ReactLeaflet.GeoJSON
                                        key={data.state}
                                        data={data.data as GeoJsonObject}
                                        style={this.coloring.getDefaultStyle.bind(
                                            this.coloring
                                        )}
                                        onEachFeature={this.onEachFeatureState.bind(
                                            this
                                        )}
                                    />
                                );
                            }
                        })}
                </ReactLeaflet.Map>
            </div>
        );
    }

    private showPrecinctData(feature: any, layer: any) {

        const properties = feature.target.feature.properties;
        const precinct = this.props.precinctMap.get(properties.precinct_name);
        console.log(properties);
        // precinct.properties.v16_ipres += 16;
        console.log(precinct);

        const electionsProps: IElectionsTabProps = {
            election2016: {
                presidentialResults: {
                    democraticVotes: properties.v16_dpres,
                    republicanVotes: properties.v16_rpres,
                    independentVotes: properties.v16_ipres,
                    otherVotes: properties.v16_opres
                },
                senatorialResults: {
                    democraticVotes: properties.v16_dsenate,
                    republicanVotes: properties.v16_rsenate,
                    otherVotes: properties.v16_opres
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
                    otherVotes: properties.v18_opres
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

    
    
    public getMajorityPartyPrecinct(
        properties: any
    ): { party: string; percent: number } {

        // Store the per party info based on election type
        let democratVotes = 0, republicanVotes = 0, independentVotes = 0, otherVotes = 0;

        switch (this.props.filter) {
            case Constants.MAP_FILTER_PRES_2016:
                democratVotes = properties.v16_dpres;
                republicanVotes = properties.v16_rpres;
                independentVotes = properties.v16_ipres || 0;
                otherVotes = properties.v16_opres || 0;
                break;
            case Constants.MAP_FILTER_HOUSE_2016:
                democratVotes = properties.v16_dhouse;
                republicanVotes = properties.v16_rhouse;
                independentVotes = properties.v16_ihouse || 0;
                otherVotes = properties.v16_ohouse || 0;
                break;
            case Constants.MAP_FILTER_SENATE_2016:
                democratVotes = properties.v16_dsenate || 0;
                republicanVotes = properties.v16_rsenate || 0;
                independentVotes = properties.v16_isenate || 0;
                otherVotes = properties.v16_osenate || 0;
                break;
            case Constants.MAP_FILTER_HOUSE_2018:
                democratVotes = properties.v18_dhouse || 0;
                republicanVotes = properties.v18_rhouse || 0;
                independentVotes = properties.v18_ihouse || 0;
                otherVotes = properties.v18_ohouse || 0;
                break;
            case Constants.MAP_FILTER_SENATE_2018:
                democratVotes = properties.v18_dsenate || 0;
                republicanVotes = properties.v18_rsenate || 0;
                independentVotes = properties.v18_isenate || 0;
                otherVotes = properties.v18_osenate || 0;
                break;
        }

        const totalVotes = Number(democratVotes) + Number(republicanVotes) + Number(independentVotes) + Number(otherVotes);

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
        const otherPercent = {
            percent: otherVotes / totalVotes,
            party: 'O'
        };

        return [republicanPercent, democratPercent, independentPercent, otherPercent].reduce(
            (prev: any, cur: any) => (prev.percent < cur.percent ? cur : prev)
        );
    }

    public getPrecinctStyle(feature: any, layer: any): PathOptions {
        const properties = feature.properties; // TODO: Extract different properties based on if district or precinct views are selected
        if (this.props.filter === Constants.MAP_FILTER_PRES_2016 || this.props.filter === Constants.MAP_FILTER_HOUSE_2016 || this.props.filter === Constants.MAP_FILTER_SENATE_2016 || this.props.filter === Constants.MAP_FILTER_HOUSE_2018 || this.props.filter === Constants.MAP_FILTER_SENATE_2018) {
            return this.coloring.colorPolitical(properties, this.props.filter, this.getMajorityPartyPrecinct(properties));
        } else if (this.props.filter === Constants.MAP_FILTER_DEFAULT) {
            return this.coloring.colorDefault(properties, this.props.level, this.props.precinctMap);
        } else {
            return this.coloring.colorDemographic(properties, this.props.filter);
        }
    }

    private getMapTooltipProps(
        filter: string,
        properties: any
    ): IMapTooltipProps {
        switch (filter) {
            case Constants.MAP_FILTER_PRES_2016:
                return {
                    title: '2016 Presidential Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: `${Math.round(properties.v16_dpres)}`
                        },
                        {
                            key: 'Republican Votes',
                            value: `${Math.round(properties.v16_rpres)}`
                        },
                        {
                            key: 'Independent Votes',
                            value: `${Math.round(properties.v16_ipres) || 0}`
                        },
                        {
                            key: 'Other Votes',
                            value: `${Math.round(properties.v16_opres) || 0}`
                        }
                    ]
                };
            case Constants.MAP_FILTER_HOUSE_2016:
                return {
                    title: '2016 House Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: `${Math.round(properties.v16_dhouse)}`
                        },
                        {
                            key: 'Republican Votes',
                            value: `${Math.round(properties.v16_rhouse)}`
                        }
                    ]
                };
            case Constants.MAP_FILTER_SENATE_2016:
                return {
                    title: '2016 Senate Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: `${Math.round(properties.v16_dsenate)}`
                        },
                        {
                            key: 'Republican Votes',
                            value: `${Math.round(properties.v16_rsenate)}`
                        }
                    ]
                };
            case Constants.MAP_FILTER_HOUSE_2018:
                return {
                    title: '2018 House Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: `${Math.round(properties.v18_dhouse)}`
                        },
                        {
                            key: 'Republican Votes',
                            value: `${Math.round(properties.v18_rhouse)}`
                        }
                    ]
                };
            case Constants.MAP_FILTER_SENATE_2018:
                return {
                    title: '2018 Senate Election',
                    subtitle: `Precinct: ${properties.precinct_name}`,
                    statistics: [
                        {
                            key: 'Democratic Votes',
                            value: `${Math.round(properties.v18_dsenate)}`
                        },
                        {
                            key: 'Republican Votes',
                            value: `${Math.round(properties.v18_rsenate)}`
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
                            value: `${Math.round(properties.pop_white_nh)}`
                        },
                        {
                            key: 'Black Population',
                            value: `${Math.round(properties.pop_black_nh)}`
                        },
                        {
                            key: 'Hispanic Population',
                            value: `${Math.round(properties.pop_hispanic)}`
                        },
                        {
                            key: 'Asian Population',
                            value: `${Math.round(properties.pop_asian_nh)}`
                        },
                        {
                            key: 'Native American Population',
                            value: `${Math.round(properties.pop_amin_nh)}`
                        },
                        {
                            key: 'Pacific Islander Population',
                            value: `${Math.round(properties.pop_nhpi_nh)}`
                        },
                        {
                            key: 'Other Population',
                            value: `${Math.round(properties.pop_other_nh)}`
                        },
                        {
                            key: 'Biracial Population',
                            value: `${Math.round(properties.pop_2more_nh)}`
                        }
                    ]
                };
        }
    }
}

function mapStatetoProps(state: any, ownProps: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        precincts: state.stateReducer.precincts,
        precinctMap: state.stateReducer.precinctMap,
        filter: state.stateReducer.filter,
        level: state.stateReducer.level,
        store: ownProps.store
    };
}

export const MapView = connect(
    (state: any, ownProps: any) => mapStatetoProps(state, ownProps),
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(MapViewComponent);
