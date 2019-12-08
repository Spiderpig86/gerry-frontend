import * as React from 'react';

import { Col, Row, Dropdown, DropdownButton, Image} from 'react-bootstrap';
import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { Card } from 'react-bootstrap';

import './styles.scss';

export class StatisticsTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Statistics</h4>

                <h6>State Statistics</h6>

                <p>Total Population: {Math.round(Math.random() * 10000) + 1000000}</p>
                <StatisticsAccordionComponent />

                <br/>
            </div>
        );
    }
}