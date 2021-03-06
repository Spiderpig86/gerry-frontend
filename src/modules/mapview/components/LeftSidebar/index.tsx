import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

import { PhaseOneTabPanel, FilterTabPanel, LogsTabPanel, PhaseZeroTabPanel, PhaseTwoTabPanel } from '../';
import { LeftSidebarStyles } from '../../../../global_components';

import '../../../../styles/cirrus/tabs.scss';

interface LeftSidebarProps {
    leftOpen: boolean;
    handleStateChange: (param) => void;
}

export class LeftSidebar extends React.Component<LeftSidebarProps, {}> {

    render() {
        return (
            <Menu styles={LeftSidebarStyles} width={'100%'} isOpen={this.props.leftOpen} burgerButtonClassName={ "burger-left" } menuClassName={ "menu-left" } onStateChange={this.props.handleStateChange}>
                <h1 className='px-3'><Link to='/' style={{ color: '#364b62' }}>Gerry</Link></h1>
                <Tabs className='tab-container'>
                    <TabList className='px-3'>
                        <Tab><h6>Phase 0</h6></Tab>
                        <Tab><h6>Phase 1</h6></Tab>
                        <Tab><h6>Phase 2</h6></Tab>
                        <Tab><h6>Filter</h6></Tab>
                        <Tab><h6>Logs</h6></Tab>
                    </TabList>

                    <TabPanel>
                        <PhaseZeroTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <PhaseOneTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <PhaseTwoTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <FilterTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <LogsTabPanel />
                    </TabPanel>
                </Tabs>
                {/* <AlgorithmPanel /> */}
            </Menu>
        );
    }
}