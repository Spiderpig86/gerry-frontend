import * as React from 'react';

import { Accordion, Card } from 'react-bootstrap';

import './styles.scss';

export class StatisticsAccordionComponent extends React.PureComponent {
    render() {
        return (
            <Accordion className='statistics-accordion'>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Demographics
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <p>White: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>African Americans: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Native Americans: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Hispanic: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Asian: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Pacific Islander: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Other: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Biracial: {Math.round(Math.random() * 2000) + 100}</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Voting Age Population
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <p>Voting Age White: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Voting Age African Americans: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Voting Age Native Americans: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Voting Age Asian: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Voting Age Pacific Islander: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Voting Age Other: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Voting Age Biracial: {Math.round(Math.random() * 2000) + 100}</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        2016 Presidential Election
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <p>Republican: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Democrat: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Independent: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Other: {Math.round(Math.random() * 2000) + 100}</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                        2016 Congressional Election
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <p>Republican: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Democrat: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Independent: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Other: {Math.round(Math.random() * 2000) + 100}</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                        2018 Congressional Election
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body>
                            <p>Republican: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Democrat: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Independent: {Math.round(Math.random() * 2000) + 100}</p>
                            <p>Other: {Math.round(Math.random() * 2000) + 100}</p>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}
