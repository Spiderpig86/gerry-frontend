import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { slide as Menu, } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { ElectionsTabPanel, StatisticsTabPanel, DistrictTabPanel } from '../';
import { DemographicsTabPanel, IDemographicsTabProps } from '../DemographicsTabPanel';
import { PrecinctPropertiesTabPanel, IPrecinctPropertiesTabProps } from '../PrecinctPropertiesTabPanel';
import { MapViewComponent } from '../../mapview';
import { IElectionsTabProps } from '../ElectionsTabPanel';
import { RightSidebarStyles } from '../../../../global_components';
import { StateEnum, ICluster, ClusterProperties, PartyEnum, ClusterCount, MapFilterEnum, IVoteData, ElectionEnum, Scores } from '../../../../models';
import { Coloring } from '../../../../libs/coloring';

import '../../../../styles/cirrus/tabs.scss';

interface IRightSidebarProps {
    selectedState: StateEnum;
    stateData: ICluster;
    oldClusters: Map<string, ICluster>;
    newClusters: Map<string, ICluster>;
    isOpen: boolean;
    mapView: MapViewComponent;
    mapFilter: MapFilterEnum;
    demographicsProps: IDemographicsTabProps;
    electionsProps: IElectionsTabProps;
    precinctProps: IPrecinctPropertiesTabProps;
    selectedOldDistrictId: string;
    selectedNewDistrictId: string;
    oldStateScores: Scores;
    newStateScores: Scores;
    rightSidebarHandler: (param) => void;

    coloring: Coloring;
}

interface IRightSidebarState {
    clusterProperties: ClusterProperties;
    oldClusterCount: ClusterCount;
    newClusterCount: ClusterCount;
}

export class RightSidebarComponent extends React.Component<IRightSidebarProps, IRightSidebarState> {

    state = {
        clusterProperties: {
            republicanRepCount: 0,
            democraticRepCount: 0,
            house16: null,
            house18: null
        },
        oldClusterCount: {
            republicanCount: 0,
            democraticCount: 0,
            tieCount: 0
        },
        newClusterCount: {
            republicanCount: 0,
            democraticCount: 0,
            tieCount: 0
        }
    };

    componentWillReceiveProps(newProps: IRightSidebarProps) {
        
        if (newProps.oldClusters && newProps.oldClusters.size > 0) {
            const properties = {
                republicanRepCount: 0,
                democraticRepCount: 0,
                house16: null,
                house18: null
            };
            const oldClusterCount = {
                republicanCount: 0,
                democraticCount: 0,
                tieCount: 0
            } as ClusterCount;
            newProps.oldClusters.forEach((cluster: ICluster) => {
                if (cluster.incumbent.party === PartyEnum.DEMOCRATIC) {
                    properties.democraticRepCount++;
                } else {
                    properties.republicanRepCount++;
                }

                const voteDataByElection = this.getVoteData(cluster, newProps.mapFilter);
                if (voteDataByElection.voteData.winners.length === 1) {
                    if (voteDataByElection.voteData.winners[0] === PartyEnum.DEMOCRATIC) {
                        oldClusterCount.democraticCount++;
                    } else {
                        oldClusterCount.republicanCount++;
                    }
                } else {
                    oldClusterCount.tieCount++;
                }
                oldClusterCount.election = voteDataByElection.election;
            });
            
            properties.house16 = newProps.stateData.electionData.house16;
            properties.house18 = newProps.stateData.electionData.house18;

            this.setState({
                clusterProperties: properties,
                oldClusterCount
            });
        }

        if (newProps.newClusters && newProps.newClusters.size > 0) {
            const newClusterCount = {
                republicanCount: 0,
                democraticCount: 0,
                tieCount: 0
            } as ClusterCount;
            newProps.newClusters.forEach((cluster: ICluster) => {
                const voteDataByElection = this.getVoteData(cluster, newProps.mapFilter);
                if (voteDataByElection.voteData.winners.length === 1) {
                    if (voteDataByElection.voteData.winners[0] === PartyEnum.DEMOCRATIC) {
                        newClusterCount.democraticCount++;
                    } else {
                        newClusterCount.republicanCount++;
                    }
                } else {
                    newClusterCount.tieCount++;
                }
                newClusterCount.election = voteDataByElection.election;
            });
            this.setState({
                newClusterCount
            });
        }
    }

    render() {
        return (
            <Menu onStateChange={this.props.rightSidebarHandler} isOpen={this.props.isOpen} right styles={RightSidebarStyles} width={'100%'} burgerButtonClassName={"burger-right"} menuClassName={"menu-right"}>
                <h3 className="px-3">{this.props.precinctProps && this.props.precinctProps.precinctName} Data</h3>

                <Tabs className='tab-container'>
                    <TabList className='px-3'>
                        <Tab><h6>State Statistics</h6></Tab>
                        <Tab><h6>District Statistics</h6></Tab>
                        <Tab><h6>Election</h6></Tab>
                        <Tab><h6>Demographics</h6></Tab>
                        <Tab><h6>Properties</h6></Tab>
                    </TabList>
                    <TabPanel>
                        <StatisticsTabPanel clusterProperties={this.state.clusterProperties} stateData={this.props.stateData} selectedState={this.props.selectedState} oldStateScores={this.props.oldStateScores} newStateScores={this.props.newStateScores} />
                    </TabPanel>
                    <TabPanel>
                        <DistrictTabPanel oldClusters={this.props.oldClusters} newClusters={this.props.newClusters} selectedState={this.props.selectedState} coloring={this.props.coloring} selectedOldDistrictId={this.props.selectedOldDistrictId} mapFilter={this.props.mapFilter} selectedNewDistrictId={this.props.selectedNewDistrictId} oldClusterCount={this.state.oldClusterCount} newClusterCount={this.state.newClusterCount} />
                    </TabPanel>
                    <TabPanel>
                        <ElectionsTabPanel {...this.props.electionsProps} />
                    </TabPanel>
                    <TabPanel>
                        <DemographicsTabPanel {...this.props.demographicsProps} />
                    </TabPanel>
                    <TabPanel>
                        <PrecinctPropertiesTabPanel {...this.props.precinctProps} />
                    </TabPanel>
                </Tabs>
            </Menu>
        );
    }

    private getVoteData(cluster: ICluster, filter: MapFilterEnum): {voteData: IVoteData, election: ElectionEnum} {
        let voteData: IVoteData = {
            republicanVotes: 0,
            democraticVotes: 0,
            otherVotes: 0,
            totalVotes: 0,
            winners: []
        };
        let election = null;
        
        switch (filter) {
            case MapFilterEnum.HOUSE_2016:
                voteData = cluster.electionData.house16 || voteData;
                election = ElectionEnum.HOUSE_16;
                console.log(election);
                
                break;
            case MapFilterEnum.HOUSE_2018:
                voteData = cluster.electionData.house18 || voteData;
                election = ElectionEnum.HOUSE_18;
                
                break;
            default:
                voteData = cluster.electionData.presidential16 || voteData;
                election = ElectionEnum.PRES_16;
        }
        return {
            voteData,
            election
        };
    }
}

function mapStatetoProps(state: any, ownProps: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        stateData: state.stateReducer.stateData,
        oldClusters: state.stateReducer.oldClusters,
        newClusters: state.stateReducer.newClusters,
        mapFilter: state.stateReducer.filterArgs.mapFilter,
        oldStateScores: state.stateReducer.oldStateObjectiveScores,
        newStateScores: state.stateReducer.newStateObjectiveScores,
        ...ownProps
    };
}

export const RightSidebar = connect(
    (state: any, ownProps: any) => mapStatetoProps(state, ownProps),
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(RightSidebarComponent);