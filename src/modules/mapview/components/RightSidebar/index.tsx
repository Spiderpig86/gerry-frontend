import * as React from 'react';

import { slide as Menu, slide } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { CustomTab, ElectionsTabPanel } from '../';
import { DemographicsTabPanel } from '../DemographicsTabPanel';
import { VotingAgeTabPanel } from '../VotingAgeTabPanel';
import { PrecinctPropertiesTabPanel } from '../PrecinctPropertiesTabPanel';
import { MapView } from '../../mapview';

interface IRightSidebarProps {
    isOpen: boolean;
    closeSideBarHook: () => void;
    mapView: MapView;
}

export class RightSidebar extends React.Component<IRightSidebarProps, {}> {

    menuHandler(state: any) {
        if (!state.isOpen) {
            this.props.mapView.setState({ isOpen: false });
        }
    }

    render() {
        console.log(this.props);
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
            },
            bmItemList: {

            }
        };
        return (
            <Menu onStateChange={e => this.menuHandler.call(this, e) } isOpen={this.props.isOpen} right width={'500px'} styles={ rightSidebarStyles }>
                <h3 className="px-3">N/A Precinct Data</h3>

                <Tabs>
                    <TabList className='px-3'>
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
