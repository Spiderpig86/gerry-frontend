import * as React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { CustomTab } from '../';

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
                padding: '2.5em 1.5em 0',
                fontSize: '1.15em'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em'
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

                <h5>2016 Election</h5>

                <p><b>Presidential</b></p>
                <p><b>Democratic Votes:</b></p>
                <p><b>Republican Votes:</b></p>
                <p><b>Independent Votes:</b></p>

                <p><b>Senatorial</b></p>
                <p><b>Democratic Votes:</b></p>
                <p><b>Republican Votes:</b></p>
                <p><b>Independent Votes:</b></p>

                <p><b>Gubernatorial</b></p>
                <p><b>Democratic Votes:</b></p>
                <p><b>Republican Votes:</b></p>
                <p><b>Independent Votes:</b></p>

                <h5>Demographics</h5>
                <p><b>Non-Hispanic White:</b></p>
                <p><b>Non-Hispanic African Americans:</b></p>
                <p><b>Non-Hispanic Native Americans:</b></p>
                <p><b>Non-Hispanic Asian:</b></p>
                <p><b>Non-Hispanic Pacific Islander:</b></p>
                <p><b>Non-Hispanic Other:</b></p>
                <p><b>Non-Hispanic Biracial:</b></p>
                
                <p><b>Hispanic:</b></p>
                <p><b>Hispanic White:</b></p>
                <p><b>Hispanic African Americans:</b></p>
                <p><b>Hispanic Native Americans:</b></p>
                <p><b>Hispanic Asian:</b></p>
                <p><b>Hispanic Pacific Islander:</b></p>
                <p><b>Hispanic Other:</b></p>
                <p><b>Hispanic Biracial:</b></p>

                <h5>Voting Age</h5>
                <p><b>Voting Age White:</b></p>
                <p><b>Voting Age African Americans:</b></p>
                <p><b>Voting Age Native Americans:</b></p>
                <p><b>Voting Age Asian:</b></p>
                <p><b>Voting Age Pacific Islander:</b></p>
                <p><b>Voting Age Other:</b></p>
                <p><b>Voting Age Biracial:</b></p>

                <h5>Precinct Properties</h5>
                <p><b>Precinct Name:</b></p>
                <p><b>Sub-precinct Number:</b></p>
                <p><b>Municipality Name:</b></p>
                <p><b>County Name:</b></p>
                <p><b>Jurisdiction Name:</b></p>
                <p><b>Congressional District ID:</b></p>
            </Menu>
        );
    }
}
