import * as React from 'react';

import { Dropdown, DropdownButton, Image} from 'react-bootstrap';
import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { Card } from 'react-bootstrap';

export class DistrictTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div style={{ padding: '0 1.5rem' }}>

                <h6>Old District Statistics</h6>

                <Card className='my-3'>
                    <Card.Body>
                        <Image className='float-left' style={{ width: '64px'}} roundedCircle src="https://www.wkar.org/sites/wkar/files/styles/medium/public/201905/IMG_7968.jpg" />

                        <div className="message">
                            <h5>Samuel Stanley</h5>
                            <h6>Seawolf Party</h6>
                        </div>
                    </Card.Body>
                </Card>

                <br />
                <DropdownButton id="dropdown-basic-button" title='Selected District: N/A'>
                    <Dropdown.Item onClick={() => {}}>District 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => {}}>District 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => {}}>District 3</Dropdown.Item>
                </DropdownButton>

                <br />

                <StatisticsAccordionComponent />

                <br />

                <h6>New District Statistics</h6>
                <DropdownButton id="dropdown-basic-button" title='Selected District: N/A'>
                    <Dropdown.Item onClick={() => {}}>District 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => {}}>District 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => {}}>District 3</Dropdown.Item>
                </DropdownButton>
                
                <br />

                <StatisticsAccordionComponent />
            </div>
        );
    }
}