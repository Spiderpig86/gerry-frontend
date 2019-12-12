import * as React from 'react';

import { Accordion, Card } from 'react-bootstrap';
import ReactTable from 'react-table';

import { DemographicEnum, PartyEnum, ClusterDemographics, IElection, ElectionEnum } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { round } from '../../../../libs/functions/round';

import './styles.scss';

interface StatisticsAccordionProps {
    demographicData: ClusterDemographics;
    electionData: IElection;
}

export class StatisticsAccordionComponent extends React.PureComponent<StatisticsAccordionProps, {}> {
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
        const demographics = [
            [DemographicEnum.WHITE, this.props.demographicData.population.White],
            [DemographicEnum.BLACK, this.props.demographicData.population.AfricanAmerican],
            [DemographicEnum.ASIAN, this.props.demographicData.population.Asian],
            [DemographicEnum.HISPANIC, this.props.demographicData.population.Hispanic],
            [DemographicEnum.PACIFIC_ISLANDER, this.props.demographicData.population.PacificIslander],
            [DemographicEnum.NATIVE_AMERICAN, this.props.demographicData.population.NativeAmerican],
            [DemographicEnum.BIRACIAL, this.props.demographicData.population.Biracial],
            [DemographicEnum.OTHER, this.props.demographicData.population.Other],
        ];

        const pres16 = [
            [PartyEnum.DEMOCRATIC, this.props.electionData.presidential16.democraticVotes],
            [PartyEnum.REPUBLICAN, this.props.electionData.presidential16.republicanVotes],
            [PartyEnum.OTHER, this.props.electionData.presidential16.otherVotes || 0],
        ];
        
        const house16 = [
            [PartyEnum.DEMOCRATIC, this.props.electionData.house16.democraticVotes],
            [PartyEnum.REPUBLICAN, this.props.electionData.house16.republicanVotes],
            [PartyEnum.OTHER, this.props.electionData.house16.otherVotes || 0],
        ];
        
        const house18 = [
            [PartyEnum.DEMOCRATIC, this.props.electionData.house18.democraticVotes],
            [PartyEnum.REPUBLICAN, this.props.electionData.house18.republicanVotes],
            [PartyEnum.OTHER, this.props.electionData.house18.otherVotes || 0],
        ];

        return (
            <Accordion className='statistics-accordion'>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Demographics
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={'px-0 py-0'}>
                            <ReactTable
                                className={'mx-0 my-0'}
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
                        <Card.Body className={'px-0 py-0'}>
                            <ReactTable
                                className={'mx-0 my-0'}
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
                        <Card.Body className={'px-0 py-0'}>
                            <ReactTable
                                className={'mx-0 my-0'}
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
                        <Card.Body className={'px-0 py-0'}>
                            <ReactTable
                                className={'mx-0 my-0'}
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
