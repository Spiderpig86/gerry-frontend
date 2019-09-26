import * as React from 'react';

import { slide as Menu, slide } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { CustomTab, ElectionsTabPanel } from '../';
import { DemographicsTabPanel, IDemographicsTabProps } from '../DemographicsTabPanel';
import { VotingAgeTabPanel, IVotingAgeTabProps } from '../VotingAgeTabPanel';
import { PrecinctPropertiesTabPanel, IPrecinctPropertiesTabProps } from '../PrecinctPropertiesTabPanel';
import { MapView } from '../../mapview';
import { IElectionsTabProps } from '../ElectionsTabPanel';
import { RightSidebarStyles } from '../../../../global_components';

interface IRightSidebarProps {
    isOpen: boolean;
    closeSideBarHook: () => void;
    mapView: MapView;
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
        console.log(this.props);
        return (
            <Menu onStateChange={e => this.menuHandler.call(this, e) } isOpen={this.props.isOpen} right styles={ RightSidebarStyles } width={'100%'}>
                <h3 className="px-3">N/A Precinct Data</h3>

                <Tabs>
                    <TabList className='px-3'>
                        <CustomTab>Election</CustomTab>
                        <CustomTab>Demographics</CustomTab>
                        <CustomTab>Voting Age</CustomTab>
                        <CustomTab>Properties</CustomTab>
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
