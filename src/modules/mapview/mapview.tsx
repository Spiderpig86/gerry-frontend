import * as React from 'react';
import * as mapActionCreators from '../../redux/modules/state/state';

import * as ReactLeaflet from 'react-leaflet';
import * as Constants from '../../config/constants';

import { PathOptions } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Control from 'react-leaflet-control';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';

import { LeftSidebar, RightSidebar, MapTooltip, IMapTooltipProps } from './components';
import { StateBorderService } from '../../libs/state-borders';
import { hashPrecinct } from '../../libs/functions/hash';
import { IDemographicsTabProps } from './components/DemographicsTabPanel';
import { IElectionsTabProps } from './components/ElectionsTabPanel';
import { IPrecinctPropertiesTabProps } from './components/PrecinctPropertiesTabPanel';
import { IVotingAgeTabProps } from './components/VotingAgeTabPanel';
import { Coloring } from '../../libs/coloring';
import { IPrecinct, PrecinctProperties, MapFilterEnum, ViewLevelEnum, StateEnum, ICluster, IVoteData } from '../../models';
import { setTooltipData } from '../../redux/modules/maptooltip/maptooltip';
import { MapNavbar } from './components/MapNavbar';
import { APP_TOUR } from './tour';

import './mapview.scss';

export interface IMapViewProps {
    selectedState: StateEnum;
    precincts: any;
    precinctMap: Map<string, IPrecinct>;
    highlightedPrecincts: Set<String>;
    setPZeroHighlightedPrecincts: (highlightedPrecincts: Set<String>) => void;
    filter: MapFilterEnum;
    level: ViewLevelEnum;
    oldClusters: Map<string, ICluster>;
    newClusters: Map<string, ICluster>;
    store: any;
}

interface IMapViewState {
    stateBorders: any[];
    selectedState: StateEnum;
    districtBorders: Map<StateEnum, any>;
    map: ReactLeaflet.Map;
    rightBarOpen: boolean;
    zoom: number;
    mapProps: {
        demographicsProps: IDemographicsTabProps;
        electionsProps: IElectionsTabProps;
        precinctProps: IPrecinctPropertiesTabProps;
        selectedOldDistrictId: string;
        selectedNewDistrictId: string;
    };
    mapTooltip: IMapTooltipProps;
    selectedPrecinctId: string;
    neighborPrecincts: string[]; // TESTING

    // React Joyride props
    steps: Step[];
    run: boolean;
    stepIndex: number;
    leftBarOpen: boolean;
    hasToured: boolean;
}

export class MapViewComponent extends React.PureComponent<IMapViewProps, IMapViewState> {
    state: IMapViewState = {
        stateBorders: [],
        selectedState: StateEnum.NOT_SET,
        districtBorders: new Map(),
        rightBarOpen: false,
        map: null,
        zoom: 5,
        mapProps: {
            demographicsProps: null,
            electionsProps: null,
            precinctProps: null,
            selectedOldDistrictId: '0',
            selectedNewDistrictId: '0',
        },
        mapTooltip: {
            title: null,
            subtitle: null,
            statistics: null
        },
        selectedPrecinctId: null,
        neighborPrecincts: [],
        steps: [],
        run: false,
        stepIndex: 0,
        leftBarOpen: false,
        hasToured: false
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
            });
        });
        await Promise.all([
            statePopulator.fetchDistrictBorder(StateEnum.CA),
            statePopulator.fetchDistrictBorder(StateEnum.UT),
            statePopulator.fetchDistrictBorder(StateEnum.VA)
        ]).then(data => {
            const map = new Map();
            for (const district of data) {
                map.set(district.state, district.data);
            }
            this.setState({
                districtBorders: map
            });
        });
        this.setState({
            run: true,
            steps: APP_TOUR
        });
    }

    async componentWillReceiveProps(newProps) {
        if (newProps.selectedState === this.state.selectedState) {
            this.setState({
                selectedState: StateEnum.NOT_SET
            });
        }
    }

    /**
     * LEAFLET EVENTS
     */

    onEachFeatureState(feature: any, layer: any) {
        layer.on({
            click: () => {
                this.state.map.leafletElement.fitBounds(layer.getBounds());
                this.setState(
                    {
                        selectedState: feature.state
                    },
                    () =>
                        this.props.store.dispatch(
                            mapActionCreators.setSelectedStateCreator(this.props.selectedState, feature.state)
                        )
                );
            }
        });
    }

    onEachFeaturePrecinct(feature: any, layer: any) {
        layer.on({
            click: () => {
                // this.props.setPZeroHighlightedPrecincts(new Set<string>());
                const neighbors = feature.properties.neighbors.replace(/, /g, ',');
                this.setState({
                    neighborPrecincts: neighbors.split(',')
                });

                // Hide neighbors
                if (hashPrecinct(feature.properties) === this.state.selectedPrecinctId) {
                    this.setState({
                        neighborPrecincts: []
                    });
                }

                this.fetchPrecinctData(feature, layer);
               // this.state.map.leafletElement.fitBounds(layer.getBounds(), {
               //     paddingBottomRight: [500, 0]
               // });
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
        const properties: PrecinctProperties = layer.layer.feature.properties;
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
                {
                    (localStorage.getItem('show-tour') === null || localStorage.getItem('show-tour') === 'true') &&
                    (
                        <Joyride
                            continuous={true}
                            run={this.state.run}
                            steps={this.state.steps}
                            stepIndex={this.state.stepIndex}
                            scrollToFirstStep={true}
                            showProgress={true}
                            showSkipButton={true}
                            callback={this.handleJoyrideCallback}
                        />
                    )
                }
                <LeftSidebar leftOpen={this.state.leftBarOpen} handleStateChange={this.handleLeftSidebar.bind(this)} />
                <RightSidebar
                    {...this.state.mapProps}
                    mapView={this}
                    rightSidebarHandler={this.handleRightSidebar.bind(this)}
                    isOpen={this.state.rightBarOpen}
                    coloring={this.coloring}
                    selectedPrecinct={this.state.selectedPrecinctId}
                />

                <MapNavbar />

                <ReactLeaflet.Map
                    className="row flex-fill"
                    ref={ref => {
                        this.state.map = ref;
                    }}
                    center={Constants.MAP_CENTER}
                    zoomControl={false}
                    zoom={4}
                    zoomSnap={1}
                    animate={false}
                    easeLinearly={false}
                    zoomAnimate={false}
                    preferCanvas={true}
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
                                this.props.precinctMap &&
                                this.state.zoom > 5
                            ) {
                                return (
                                    <ReactLeaflet.GeoJSON
                                        key={`precinct${this.props.precinctMap.size}`}
                                        data={Array.from(this.props.precinctMap.values()) as any}
                                        style={this.getShapeStyle.bind(this)}
                                        onMouseOver={this.onMouseHoverPrecinct.bind(this)}
                                        onEachFeature={this.onEachFeaturePrecinct.bind(this)}
                                    />
                                );
                            } else if (data.state === this.state.selectedState && this.state.zoom > 5) {
                                const district = this.state.districtBorders.get(data.state);
                                return (
                                    district &&
                                    district.features.map((data: any, i: number) => {
                                        return (
                                            <ReactLeaflet.GeoJSON
                                                key={data.properties.Code}
                                                data={data as GeoJsonObject}
                                                style={(feature) => this.coloring.colorDistrictLoading(feature, this.state.zoom)}
                                            />
                                        );
                                    })
                                );
                            } else {
                                return (
                                    <ReactLeaflet.GeoJSON
                                        key={data.state}
                                        data={data.data as GeoJsonObject}
                                        style={this.coloring.colorDefault.bind(this)}
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
                NativeAmerican: properties.pop_amin_nh,
                PacificIslander: properties.pop_nhpi_nh,
                Other: properties.pop_other_nh,
                Biracial: properties.pop_2more_nh
            },
            hispanicDemographics: {
                Hispanic: properties.pop_hispanic,
                White: properties.pop_white_h,
                AfricanAmerican: properties.pop_black_h,
                Asian: properties.pop_asian_h,
                NativeAmerican: properties.pop_amin_h,
                PacificIslander: properties.pop_nhpi_h,
                Other: properties.pop_other_h,
                Biracial: properties.pop_2more_h
            },
            totalVotingPopulation: properties.pop_total_voting,
            votingAgeDemographics: {
                White: properties.pop_white_voting,
                AfricanAmerican: properties.pop_black_voting,
                Hispanic: properties.pop_hispanic_voting,
                NativeAmerican: properties.pop_amin_voting,
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
            rightBarOpen: true,
            mapProps: {
                electionsProps,
                demographicsProps,
                precinctProps,
                selectedOldDistrictId: precinctProps.congressionalDistrictId || '0',
                selectedNewDistrictId: this.props.precinctMap.get(hashPrecinct(properties)) ? this.props.precinctMap.get(hashPrecinct(properties)).newCdId : '0'
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

        return this.findMajority(Number(democratVotes), Number(republicanVotes), Number(otherVotes));
    }

    public findMajority(democratVotes: number, republicanVotes: number, otherVotes: number): { party: string; percent: number } {
        const totalVotes = democratVotes + republicanVotes + otherVotes;
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

    public getShapeStyle(feature: any, layer: any): PathOptions {
        if (this.props.level === ViewLevelEnum.PRECINCTS) {
            return this.getPrecinctStyle(feature, layer);
        } else {
            return this.getDistrictStyle(feature, layer);
        }
    }

    public getDistrictStyle(feature: any, layer: any): PathOptions {
        const properties = feature.properties;
        let style = {};

        // TODO: Test
        const precinct = this.props.precinctMap.get(hashPrecinct(properties));
        if (!properties.cd) {
            return this.coloring.getBlankStyle();
        }

        const district =
            this.props.level === ViewLevelEnum.OLD_DISTRICTS
                ? this.props.oldClusters.get(properties.cd.toString())
                : this.props.newClusters.get(precinct.newCdId.toString() || '0');
        if (!district) {
            return this.coloring.getBlankStyle();
        }
        
        if (this.state.neighborPrecincts.includes(hashPrecinct(properties))) {
            style = this.coloring.colorNeighborPrecinct(this.state.zoom);
        } else if (this.props.highlightedPrecincts.has(hashPrecinct(properties))) {
            style = this.coloring.colorPhaseZeroHighlight(this.state.zoom);
        } else if (
            this.props.filter === MapFilterEnum.PRES_2016 ||
            this.props.filter === MapFilterEnum.HOUSE_2016 ||
            this.props.filter === MapFilterEnum.HOUSE_2018
        ) {
            let electionData: IVoteData = null;
            switch (this.props.filter) {
                case MapFilterEnum.HOUSE_2016:
                    electionData = district.electionData.house16
                    break;
                case MapFilterEnum.HOUSE_2018:
                    electionData = district.electionData.house18
                    break;
                default:
                    electionData = district.electionData.presidential16
            }

            if (!electionData) {
                return this.coloring.getBlankStyle();
            }

            style = this.coloring.getPoliticalStyle(
                this.findMajority(electionData.democraticVotes, electionData.republicanVotes, electionData.otherVotes || 0),
                this.state.zoom
            );
        } else if (this.props.filter === MapFilterEnum.DEFAULT) {
            style = this.coloring.colorDefaultDistrict(properties, this.props.level, this.props.precinctMap, this.state.zoom);
        } else {
            style = this.coloring.getDemographicStyleDistrict(properties, district, this.props.filter, this.props.level, this.props.precinctMap, this.state.zoom);
        }
        return {
            ...style,
            weight: this.state.selectedPrecinctId && this.state.selectedPrecinctId === hashPrecinct(properties) ? 5 : 0.75
        };
    }

    public getPrecinctStyle(feature: any, layer: any): PathOptions {
        const properties = feature.properties;
        let style = {};

        if (this.state.neighborPrecincts.includes(hashPrecinct(properties))) {
            style = this.coloring.colorNeighborPrecinct(this.state.zoom);
        } else if (this.props.highlightedPrecincts.has(hashPrecinct(properties))) {
            style = this.coloring.colorPhaseZeroHighlight(this.state.zoom);
        } else if (
            this.props.filter === MapFilterEnum.PRES_2016 ||
            this.props.filter === MapFilterEnum.HOUSE_2016 ||
            this.props.filter === MapFilterEnum.HOUSE_2018
        ) {
            style = this.coloring.getPoliticalStyle(
                this.getMajorityPartyInPrecinct(properties),
                this.state.zoom
            );
        } else if (this.props.filter === MapFilterEnum.DEFAULT) {
            style = this.coloring.colorDefault();
        } else {
            style = this.coloring.getDemographicStyle(properties, this.props.filter, this.state.zoom);
        }
        return {
            ...style,
            weight:
                this.state.selectedPrecinctId && this.state.selectedPrecinctId === hashPrecinct(properties) ? 5 : 0.75
        };
    }

    private getMapTooltipProps(filter: MapFilterEnum, properties: any): IMapTooltipProps {
        if (this.props.level === ViewLevelEnum.OLD_DISTRICTS || this.props.level === ViewLevelEnum.NEW_DISTRICTS) {
            return this.fetchDistrictProperties(filter, this.props.level, properties);
        } else {
            return this.fetchPrecinctProperties(filter, properties);
        }
    }

    private fetchPrecinctProperties(filter: MapFilterEnum, properties: any): IMapTooltipProps {
        switch (filter) {
            case MapFilterEnum.PRES_2016:
                return {
                    title: '2016 Presidential Election',
                    subtitle: `Precinct: ${properties.precinct_name || properties.precinct_id}`,
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
                            key: 'Multiracial Population',
                            value: Math.round(properties.pop_2more_nh || 0),
                            needsPercent: true
                        }
                    ]
                };
        }
    }

    private fetchDistrictProperties(filter: MapFilterEnum, level: ViewLevelEnum, properties: any): IMapTooltipProps {
        const response: IMapTooltipProps = {
            title: 'District Data',
            subtitle: 'District information is not available.',
            statistics: []
        };

        // Find the correct district statistics
        const precinct: IPrecinct = this.props.precinctMap.get(properties.precinct_id);
        if (!precinct) {
            response.subtitle = 'Data not available for this precinct.'
            return response;
        }

        const cdData =
            level === ViewLevelEnum.OLD_DISTRICTS
                ? this.props.oldClusters.get(precinct.originalCdId.toString())
                : this.props.newClusters.get(precinct.newCdId.toString() || '0'); // Get correct cd data based on filter

        if (!cdData) {
            return;
        }
        
        response.subtitle = `District: ${cdData.name.substring(1)}`

        switch (filter) {
            case MapFilterEnum.DEFAULT:
                response.statistics = response.statistics.concat(
                    {
                        key: 'Total District Population',
                        value: cdData ? cdData.demographicData.totalPopulation : 0
                    },
                );
                break;
            case MapFilterEnum.PRES_2016:
                response.statistics = response.statistics.concat([
                    {
                        key: 'Democratic Vote',
                        value: cdData && cdData.electionData.presidential16 ? cdData.electionData.presidential16.democraticVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Republican Vote',
                        value: cdData && cdData.electionData.presidential16 ? cdData.electionData.presidential16.republicanVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Other Vote',
                        value: cdData && cdData.electionData.presidential16 ? cdData.electionData.presidential16.otherVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Total District Votes',
                        value: cdData && cdData.electionData.presidential16 ? cdData.electionData.presidential16.totalVotes : 0
                    }
                ]);
                break;
            case MapFilterEnum.HOUSE_2016:
                response.statistics = response.statistics.concat([
                    {
                        key: 'Democratic Vote',
                        value: cdData && cdData.electionData.house16 ? cdData.electionData.house16.democraticVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Republican Vote',
                        value: cdData && cdData.electionData.house16 ? cdData.electionData.house16.republicanVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Other Vote',
                        value: cdData && cdData.electionData.house16 ? cdData.electionData.house16.otherVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Total District Votes',
                        value: cdData && cdData.electionData.house16 ? cdData.electionData.house16.totalVotes : 0
                    }
                ]);
                break;
            case MapFilterEnum.HOUSE_2018:
                response.statistics = response.statistics.concat([
                    {
                        key: 'Democratic Vote',
                        value: cdData && cdData.electionData.house18 ? cdData.electionData.house18.democraticVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Republican Vote',
                        value: cdData && cdData.electionData.house18 ? cdData.electionData.house18.republicanVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Other Vote',
                        value: cdData && cdData.electionData.house18 ? cdData.electionData.house18.otherVotes : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Total District Votes',
                        value: cdData && cdData.electionData.house18 ? cdData.electionData.house18.totalVotes : 0
                    }
                ]);
                break;
            default:
                response.statistics = response.statistics.concat([
                    {
                        key: 'African American',
                        value: cdData ? cdData.demographicData.population.AfricanAmerican : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Asian',
                        value: cdData ? cdData.demographicData.population.Asian : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Hispanic',
                        value: cdData ? cdData.demographicData.population.Hispanic : 0,
                        needsPercent: true
                    },
                    {
                        key: 'White',
                        value: cdData ? cdData.demographicData.population.White : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Pacific Islander',
                        value: cdData ? cdData.demographicData.population.PacificIslander : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Native American',
                        value: cdData ? cdData.demographicData.population.NativeAmerican : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Biracial',
                        value: cdData ? cdData.demographicData.population.Biracial : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Other',
                        value: cdData ? cdData.demographicData.population.Other : 0,
                        needsPercent: true
                    },
                    {
                        key: 'Total District Population',
                        value: cdData ? cdData.demographicData.totalPopulation : 0
                    }
                ]);
        }

        return response;
    }

    private handleRightSidebar({ isOpen }) {
        if (!isOpen) {
            this.setState({ rightBarOpen: false });
            this.setState({ selectedPrecinctId: null });
        }
    }

    private handleLeftSidebar = ({ isOpen }) => {
        if (!this.state.hasToured && isOpen) {
            this.setState({
                leftBarOpen: isOpen,
                run: this.state.stepIndex === 0 ? false : this.state.run,
                stepIndex: this.state.stepIndex === 0 ? 1 : this.state.stepIndex
            });
        }
    };

    private handleJoyrideCallback = (data: CallBackProps) => {
        if (this.state.hasToured) {
            return;
        }

        const { action, index, type, status } = data;

        if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            this.setState({ run: false, stepIndex: 0, hasToured: true });
        } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
            const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
            if (this.state.leftBarOpen && index === 0) {
                setTimeout(() => {
                    this.setState({ run: true, hasToured: false });
                }, 600);
            } else if (this.state.leftBarOpen && index === 1 && action === ACTIONS.PREV) {
                this.setState(
                    {
                        run: false,
                        stepIndex,
                        leftBarOpen: false,
                        rightBarOpen: false,
                        hasToured: false
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({ run: true });
                        }, 600);
                    }
                );
            } else if (this.state.leftBarOpen && index === 1 && action === ACTIONS.NEXT) {
                this.setState(
                    {
                        run: false,
                        stepIndex,
                        leftBarOpen: false,
                        rightBarOpen: true
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({ run: true });
                        }, 600);
                    }
                );
            } else if (this.state.leftBarOpen && index === 1) {
                this.setState(
                    {
                        run: false,
                        leftBarOpen: false,
                        stepIndex,
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({ run: true });
                        }, 600);
                    }
                );
            } else if (index === 2 && action === ACTIONS.PREV) {
                this.setState(
                    {
                        run: false,
                        stepIndex,
                        leftBarOpen: true,
                        rightBarOpen: false
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({ run: true });
                        }, 600);
                    }
                );
            } else if (index === 3 && action === ACTIONS.PREV) {
                this.setState(
                    {
                        run: false,
                        stepIndex,
                        leftBarOpen: false,
                        rightBarOpen: true
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({ run: true });
                        }, 600);
                    }
                );
            } else if (index === 2) {
                this.setState(
                    {
                        run: false,
                        stepIndex,
                        leftBarOpen: false,
                        rightBarOpen: false
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({ run: true });
                        }, 600);
                    }
                );
            } else {
                // Update state to advance the tour
                this.setState({
                    leftBarOpen: false,
                    stepIndex
                });
            }
        }
    };
}

function mapStatetoProps(state: any, ownProps: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        precincts: state.stateReducer.precincts,
        precinctMap: state.stateReducer.precinctMap,
        clusters: state.stateReducer.newClusters,
        filter: state.stateReducer.filterArgs.mapFilter,
        level: state.stateReducer.filterArgs.viewLevel,
        oldClusters: state.stateReducer.oldClusters,
        newClusters: state.stateReducer.newClusters,
        highlightedPrecincts: state.stateReducer.highlightedPrecincts,
        setPZeroHighlightedPrecincts: state.stateReducer.setPZeroHighlightedPrecincts,
        store: ownProps.store
    };
}

export const MapView = connect(
    (state: any, ownProps: any) => mapStatetoProps(state, ownProps),
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(MapViewComponent);
