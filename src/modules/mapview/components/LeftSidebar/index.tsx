import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { InputTabPanel } from '../';
import { AlgorithmPanel } from '../AlgorithmPanel';
import { LogsTabPanel } from '../LogsTabPanel';
import { LeftSidebarStyles } from '../../../../global_components';

import '../../../../styles/cirrus/tabs.scss';

export class LeftSidebar extends React.Component {

    render() {
        return (
            <Menu styles={LeftSidebarStyles} width={'100%'}>
                <h1 className='px-3'>Gerry</h1>
                <Tabs className='tab-container'>
                    <TabList className='px-3'>
                        <Tab><h6>Inputs</h6></Tab>
                        <Tab><h6>Logs</h6></Tab>
                        <Tab><h6>Statistics</h6></Tab>
                    </TabList>

                    <TabPanel>
                        <InputTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <LogsTabPanel />
                    </TabPanel>
                    <TabPanel>Panel 3</TabPanel>
                </Tabs>
                <AlgorithmPanel />
            </Menu>
        );
    }
}