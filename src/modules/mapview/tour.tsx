import * as React from 'react';
import { Step } from 'react-joyride';
import { Form } from 'react-bootstrap';

export const APP_TOUR: Step[] = [
    {
        target: '.bm-burger-button.burger-left',
        content: (
            <div>
                Looks like this is your first time here. Let's learn a couple of basic features of Gerry.
                <br />
                <br />
                <Form.Check
                    custom
                    type={'checkbox'}
                    id={'showTour'}
                    label={'Do not show again.'}
                    onChange={(e) => localStorage.setItem('show-tour', new Boolean(!e.target.checked).toString())}
                />
            </div>
        ),
        title: '👋 Welcome to Gerry.',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        hideFooter: true,
        placement: 'bottom',
        spotlightClicks: true,
        styles: {
            options: {
                zIndex: 10000
            }
        }
    },
    {
        target: '.menu-left',
        content: (
            <div>
                This button triggers the left sidebar, which is in charge of setting{' '}
                <b>algorithm parameters</b>, <b>view filters</b>, and{' '}
                <b>intermediate results during algorithm execution</b>.
            </div>
        ),
        title: '💎 Left Sidebar (Parameters/Logs)',
        disableBeacon: true,
        placement: 'right',
        styles: {
            options: {
                zIndex: 10000
            }
        }
    },
    {
        target: '.menu-right',
        content: (
            <div>
                The right sidebar is used to display detailed informaiton relating to the selected precinct.
            </div>
        ),
        title: '✨ Right Sidebar (Precinct Data)',
        disableBeacon: true,
        placement: 'left',
        styles: {
            options: {
                zIndex: 10000
            }
        }
    },
    {
        content: (
            <div>
                <h3>🎁 Let's Get Started!</h3>
                <p>To get started, open the <b>left sidebar</b> and select a state in the <b>Phase 0</b> tab or by clicking any state on the map.</p>
            </div>
        ),
        placement: 'center',
        target: 'body',
        styles: {
            options: {
                zIndex: 10000
            }
        }
    }
];