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
import { StateEnum, ICluster, ClusterProperties, PartyEnum } from '../../../../models';
import { Coloring } from '../../../../libs/coloring';

import '../../../../styles/cirrus/tabs.scss';

interface IRightSidebarProps {
    selectedState: StateEnum;
    stateData: ICluster;
    oldClusters: Map<string, ICluster>;
    newClusters: Map<string, ICluster>;
    isOpen: boolean;
    mapView: MapViewComponent;
    demographicsProps: IDemographicsTabProps;
    electionsProps: IElectionsTabProps;
    precinctProps: IPrecinctPropertiesTabProps;
    selectedOldDistrictId: string;
    selectedNewDistrictId: string;
    rightSidebarHandler: (param) => void;

    coloring: Coloring;
}

interface IRightSidebarState {
    clusterProperties: ClusterProperties;
}

export class RightSidebarComponent extends React.Component<IRightSidebarProps, IRightSidebarState> {

    state = {
        clusterProperties: {
            republicanRepCount: 0,
            democraticRepCount: 0,
            house16: null,
            house18: null
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
            newProps.oldClusters.forEach((cluster: ICluster) => {
                if (cluster.incumbent.party === PartyEnum.DEMOCRATIC) {
                    properties.democraticRepCount++;
                } else {
                    properties.republicanRepCount++;
                }
            });
            properties.house16 = newProps.stateData.electionData.house16;
            properties.house18 = newProps.stateData.electionData.house18;

            this.setState({
                clusterProperties: properties
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
                        <StatisticsTabPanel clusterProperties={this.state.clusterProperties} stateData={this.props.stateData} selectedState={this.props.selectedState} />
                    </TabPanel>
                    <TabPanel>
                        <DistrictTabPanel oldClusters={this.props.oldClusters} newClusters={this.props.newClusters} selectedState={this.props.selectedState} coloring={this.props.coloring} selectedOldDistrictId={this.props.selectedOldDistrictId} selectedNewDistrictId={this.props.selectedNewDistrictId} />
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
}

function mapStatetoProps(state: any, ownProps: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        stateData: state.stateReducer.stateData,
        oldClusters: state.stateReducer.oldClusters,
        newClusters: state.stateReducer.newClusters,
        ...ownProps
    };
}

export const RightSidebar = connect(
    (state: any, ownProps: any) => mapStatetoProps(state, ownProps),
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(RightSidebarComponent);