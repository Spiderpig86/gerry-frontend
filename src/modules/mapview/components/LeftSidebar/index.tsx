import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { CustomTab, InputTabPanel } from '../';

export class LeftSidebar extends React.Component {

    render() {
        return (
            <Menu width={'500px'}>
                <h1>Gerry</h1>
                <Tabs>
                    <TabList>
                        <CustomTab>Inputs</CustomTab>
                        <CustomTab>Logs</CustomTab>
                        <CustomTab>Statistics</CustomTab>
                    </TabList>

                    <TabPanel>
                        <InputTabPanel />
                    </TabPanel>
                    <TabPanel>Panel 2</TabPanel>
                    <TabPanel>Panel 3</TabPanel>
                </Tabs>
            </Menu>
        );
    }
}