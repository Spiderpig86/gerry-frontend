import * as React from 'react';

import { Accordion, Card } from 'react-bootstrap';

import './styles.scss';

export class StatisticsAccordionComponent extends React.PureComponent {
    render() {
        return (
            <Accordion class='statistics-accordion'>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Demographics
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <p>Voting Age White: </p>
                            <p>Voting Age African Americans: </p>
                            <p>Voting Age Native Americans: </p>
                            <p>Voting Age Asian: </p>
                            <p>Voting Age Pacific Islander: </p>
                            <p>Voting Age Other: </p>
                            <p>Voting Age Biracial: </p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Voting Age Population
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <p>Voting Age White: </p>
                            <p>Voting Age African Americans: </p>
                            <p>Voting Age Native Americans: </p>
                            <p>Voting Age Asian: </p>
                            <p>Voting Age Pacific Islander: </p>
                            <p>Voting Age Other: </p>
                            <p>Voting Age Biracial: </p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}
