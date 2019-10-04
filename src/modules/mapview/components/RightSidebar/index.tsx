import * as React from 'react';

import { slide as Menu, } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { ElectionsTabPanel } from '../';
import { DemographicsTabPanel, IDemographicsTabProps } from '../DemographicsTabPanel';
import { VotingAgeTabPanel, IVotingAgeTabProps } from '../VotingAgeTabPanel';
import { PrecinctPropertiesTabPanel, IPrecinctPropertiesTabProps } from '../PrecinctPropertiesTabPanel';
import { MapViewComponent } from '../../mapview';
import { IElectionsTabProps } from '../ElectionsTabPanel';
import { RightSidebarStyles } from '../../../../global_components';

import '../../../../styles/cirrus/tabs.scss';

interface IRightSidebarProps {
    isOpen: boolean;
    mapView: MapViewComponent;
    demographicsProps: IDemographicsTabProps;
    electionsProps: IElectionsTabProps;
    precinctProps: IPrecinctPropertiesTabProps;
    votingAgeProps: IVotingAgeTabProps;
}

export class RightSidebar extends React.Component<IRightSidebarProps, {}> {

    menuHandler(state: any) {
        if (!state.isOpen) {
            this.props.mapView.setState({ isOpen: false });
        }
    }

    render() {
        return (
            <Menu onStateChange={e => this.menuHandler.call(this, e) } isOpen={this.props.isOpen} right styles={ RightSidebarStyles } width={'100%'}>
                <h3 className="px-3">Precinct { this.props.precinctProps && this.props.precinctProps.precinctName } Data</h3>

                <Tabs className='tab-container'>
                    <TabList className='px-3'>
                        <Tab><h6>Election</h6></Tab>
                        <Tab><h6>Demographics</h6></Tab>
                        <Tab><h6>Voting Age</h6></Tab>
                        <Tab><h6>Properties</h6></Tab>
                    </TabList>
                    <TabPanel>
                        <ElectionsTabPanel {...this.props.electionsProps} />
                    </TabPanel>
                    <TabPanel>
                        <DemographicsTabPanel {...this.props.demographicsProps} />
                    </TabPanel>
                    <TabPanel>
                        <VotingAgeTabPanel {...this.props.votingAgeProps} />
                    </TabPanel>
                    <TabPanel>
                        <PrecinctPropertiesTabPanel {...this.props.precinctProps} />
                    </TabPanel>
                </Tabs>
            </Menu>
        );
    }
}
