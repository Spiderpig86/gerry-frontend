import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

import { InputTabPanel, FilterTabPanel, LogsTabPanel, StatisticsTabPanel, PhaseZeroTabPanel } from '../';
import { AlgorithmPanel } from '../AlgorithmPanel';
import { LeftSidebarStyles } from '../../../../global_components';

import '../../../../styles/cirrus/tabs.scss';

export class LeftSidebar extends React.Component {

    render() {
        return (
            <Menu styles={LeftSidebarStyles} width={'100%'}>
                <h1 className='px-3'><Link to='/' style={{ color: '#364b62' }}>Gerry</Link></h1>
                <Tabs className='tab-container'>
                    <TabList className='px-3'>
                        <Tab><h6>Phase 0</h6></Tab>
                        <Tab><h6>Inputs</h6></Tab>
                        <Tab><h6>Filter</h6></Tab>
                        <Tab><h6>Logs</h6></Tab>
                        <Tab><h6>Statistics</h6></Tab>
                    </TabList>

                    <TabPanel>
                        <PhaseZeroTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <InputTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <FilterTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <LogsTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <StatisticsTabPanel />
                    </TabPanel>
                </Tabs>
                <AlgorithmPanel />
            </Menu>
        );
    }
}