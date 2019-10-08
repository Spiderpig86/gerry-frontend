import * as React from 'react';

import { Dropdown, DropdownButton} from 'react-bootstrap';
import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';

export class StatisticsTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Statistics</h4>

                <h6>District Statistics</h6>
                <DropdownButton id="dropdown-basic-button" title='Selected District: N/A'>
                    <Dropdown.Item onClick={() => {}}>District 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => {}}>District 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => {}}>District 3</Dropdown.Item>
                </DropdownButton>

                <br />

                <p><b>Before</b></p>
                <StatisticsAccordionComponent />

                <br />

                <p><b>After</b></p>
                <StatisticsAccordionComponent />
            </div>
        );
    }
}