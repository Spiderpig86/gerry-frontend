import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { CustomTab, ElectionsTabPanel } from '../';
import { DemographicsTabPanel } from '../DemographicsTabPanel';
import { VotingAgeTabPanel } from '../VotingAgeTabPanel';
import { PrecinctPropertiesTabPanel } from '../PrecinctPropertiesTabPanel';

export class RightSidebar extends React.Component {
    render() {
        const rightSidebarStyles = {
            bmBurgerButton: {
                position: 'fixed',
                width: '20px',
                height: '18px',
                right: '20px',
                left: 'auto',
                top: '20px'
            },
            bmBurgerBars: {
                background: '#373a47'
            },
            bmBurgerBarsHover: {
                background: '#a90000'
            },
            bmCrossButton: {
                height: '24px',
                width: '24px'
            },
            bmCross: {
                background: '#bdc3c7'
            },
            bmMenuWrap: {
                position: 'fixed',
                height: '100%'
            },
            bmMenu: {
                background: '#fff',
                padding: '2.5rem 1.5rem 0',
                fontSize: '1rem'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItem: {
                display: 'inline-block'
            },
            bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
            }
        };
        return (
            <Menu right width={'500px'} styles={ rightSidebarStyles }>
                <h3>N/A Precinct Data</h3>

                <Tabs>
                    <TabList>
                        <CustomTab>Election</CustomTab>
                        <CustomTab>Demographics</CustomTab>
                        <CustomTab>Voting Age</CustomTab>
                        <CustomTab>Properties</CustomTab>
                    </TabList>
                    <TabPanel>
                        <ElectionsTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <DemographicsTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <VotingAgeTabPanel />
                    </TabPanel>
                    <TabPanel>
                        <PrecinctPropertiesTabPanel />
                    </TabPanel>
                </Tabs>
            </Menu>
        );
    }
}
