import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { CustomTab, InputTabPanel } from '../';
import { AlgorithmPanel } from '../AlgorithmPanel';
import { LogsTabPanel } from '../LogsTabPanel';
import { LeftSidebarStyles } from '../../../../global_components';

export class LeftSidebar extends React.Component {

    render() {
        return (
            <Menu styles={LeftSidebarStyles} width={'100%'}>
                <h1 className='px-3'>Gerry</h1>
                <Tabs>
                    <TabList className='px-3'>
                        <CustomTab>Inputs</CustomTab>
                        <CustomTab>Logs</CustomTab>
                        <CustomTab>Statistics</CustomTab>
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