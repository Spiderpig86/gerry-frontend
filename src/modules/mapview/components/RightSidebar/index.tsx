import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { slide as Menu, } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ElectionsTabPanel, StatisticsTabPanel, DistrictTabPanel } from '../';
import { DemographicsTabPanel, IDemographicsTabProps } from '../DemographicsTabPanel';
import { PrecinctPropertiesTabPanel, IPrecinctPropertiesTabProps } from '../PrecinctPropertiesTabPanel';
import { MapViewComponent } from '../../mapview';
import { IElectionsTabProps } from '../ElectionsTabPanel';
import { RightSidebarStyles } from '../../../../global_components';
import { StateEnum } from '../../../../models';

import '../../../../styles/cirrus/tabs.scss';

interface IRightSidebarProps {
    selectedState: StateEnum;
    isOpen: boolean;
    mapView: MapViewComponent;
    demographicsProps: IDemographicsTabProps;
    electionsProps: IElectionsTabProps;
    precinctProps: IPrecinctPropertiesTabProps;
    rightSidebarHandler: (param) => void;
}

export class RightSidebarComponent extends React.Component<IRightSidebarProps, {}> {

    render() {
        return (
            <Menu onStateChange={this.props.rightSidebarHandler} isOpen={this.props.isOpen} right styles={ RightSidebarStyles } width={'100%'} burgerButtonClassName={ "burger-right" } menuClassName={ "menu-right" }>
                <h3 className="px-3">Precinct { this.props.precinctProps && this.props.precinctProps.precinctName } Data</h3>

                <Tabs className='tab-container'>
                    <TabList className='px-3'>
                        <Tab><h6>State Statistics</h6></Tab>
                        <Tab><h6>District Statistics</h6></Tab>
                        <Tab><h6>Election</h6></Tab>
                        <Tab><h6>Demographics</h6></Tab>
                        <Tab><h6>Properties</h6></Tab>
                    </TabList>
                    <TabPanel>
                        <StatisticsTabPanel selectedState={this.props.selectedState} />
                    </TabPanel>
                    <TabPanel>
                        <DistrictTabPanel selectedState={this.props.selectedState} />
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
        ...ownProps
    };
}

export const RightSidebar = connect(
    (state: any, ownProps: any) => mapStatetoProps(state, ownProps),
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(RightSidebarComponent);