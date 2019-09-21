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
                background: '#373a47',
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
            <Menu right styles={ rightSidebarStyles }>
                <a key="0" href=""><i className="fa fa-fw fa-star-o" /><span>Favorites</span></a>
                <a key="1" href=""><i className="fa fa-fw fa-bell-o" /><span>Alerts</span></a>
                <a key="2" href=""><i className="fa fa-fw fa-envelope-o" /><span>Messages</span></a>
                <a key="3" href=""><i className="fa fa-fw fa-comment-o" /><span>Comments</span></a>
                <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o" /><span>Analytics</span></a>
                <a key="5" href=""><i className="fa fa-fw fa-newspaper-o" /><span>Reading List</span></a>
            </Menu>
        );
    }
}
