import * as React from 'react';

import { Accordion, Card } from 'react-bootstrap';
import ReactTable from 'react-table';

import { DemographicEnum, PartyEnum } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { round } from '../../../../libs/functions/round';

import './styles.scss';

export class StatisticsAccordionComponent extends React.PureComponent {
    private demographicColumns = null;
    private electionColumns = null;

    constructor() {
        super();
        this.demographicColumns = [
            {
                Header: 'Demographic',
                id: 'demographicType',
                accessor: (e: any) => {
                    return EnumNameMapper.getDemographicName(e[0]);
                }
            },
            {
                Header: 'Population',
                id: 'demographicPopulation',
                accessor: (e: any) => Math.round(e[1]).toLocaleString(),
                sortMethod: (a, b) => {
                    return Number(a.replace(',', '')) - Number(b.replace(',', ''));
                }
            }
        ];

        this.electionColumns = [
            {
                Header: 'Party',
                id: 'partyType',
                accessor: (e: any) => EnumNameMapper.getPartyName(e[0])
            },
            {
                Header: 'Votes',
                id: 'voteCount',
                accessor: (e: any) => round(e[1]).toLocaleString() || 'N/A',
                sortMethod: (a, b) => {
                    return Number(a.replace(',', '')) - Number(b.replace(',', ''));
                }
            }
        ];
    }

    render() {
        // Fake data
        const demographics = [];
        for (const demographic of Object.values(DemographicEnum)) {
            demographics.push([demographic, Math.round(Math.random() * 2000) + 100]);
        }

        const pres16 = [];
        for (const party of [PartyEnum.DEMOCRATIC, PartyEnum.REPUBLICAN, PartyEnum.OTHER]) {
            pres16.push([party, Math.round(Math.random() * 2000) + 100]);
        }

        const house16 = [];
        for (const party of [PartyEnum.DEMOCRATIC, PartyEnum.REPUBLICAN, PartyEnum.OTHER]) {
            house16.push([party, Math.round(Math.random() * 2000) + 100]);
        }

        const house18 = [];
        for (const party of [PartyEnum.DEMOCRATIC, PartyEnum.REPUBLICAN, PartyEnum.OTHER]) {
            house18.push([party, Math.round(Math.random() * 2000) + 100]);
        }

        return (
            <Accordion className='statistics-accordion'>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Demographics
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ReactTable
                                className={'my-3'}
                                columns={this.demographicColumns}
                                data={demographics}
                                defaultPageSize={10}
                                minRows={0}
                                showPageSizeOptions={false}
                                showPaginationBottom={false}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        2016 Presidential Election
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <ReactTable
                                className={'my-3'}
                                columns={this.electionColumns}
                                data={pres16}
                                defaultPageSize={10}
                                minRows={0}
                                showPageSizeOptions={false}
                                showPaginationBottom={false}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                        2016 Congressional Election
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <ReactTable
                                className={'my-3'}
                                columns={this.electionColumns}
                                data={house16}
                                defaultPageSize={10}
                                minRows={0}
                                showPageSizeOptions={false}
                                showPaginationBottom={false}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                        2018 Congressional Election
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body>
                            <ReactTable
                                className={'my-3'}
                                columns={this.electionColumns}
                                data={house18}
                                defaultPageSize={10}
                                minRows={0}
                                showPageSizeOptions={false}
                                showPaginationBottom={false}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}
