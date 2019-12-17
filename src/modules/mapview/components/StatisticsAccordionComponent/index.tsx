import * as React from 'react';

import { Accordion, Card } from 'react-bootstrap';
import ReactTable from 'react-table';

import {
    DemographicEnum,
    PartyEnum,
    ClusterDemographics,
    IElection,
    ElectionEnum,
    PhaseTwoMeasuresEnum,
    Scores
} from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { round } from '../../../../libs/functions/round';

import './styles.scss';

interface StatisticsAccordionProps {
    demographicData: ClusterDemographics;
    electionData: IElection;
    scores: Scores;
    additionalScores?: Scores;
}

export class StatisticsAccordionComponent extends React.PureComponent<StatisticsAccordionProps, {}> {
    private demographicColumns = null;
    private electionColumns = null;
    private scoreColumns = null;

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
            },
            {
                Header: '% of Total',
                id: 'percentage',
                accessor: (e: any) => `${(e[2] * 100).toFixed(2)}%`
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
            },
            {
                Header: '% of Total',
                id: 'percentage',
                accessor: (e: any) => `${(e[2] * 100).toFixed(2)}%`
            }
        ];

        this.scoreColumns = [
            {
                Header: 'Measure',
                id: 'scoreCat',
                accessor: (e: any) => {
                    return EnumNameMapper.getMeasuresName(e[0]) || e[0];
                }
            },
            {
                Header: 'Score (out of 1)',
                id: 'score',
                accessor: (e: any) => `${e[1].toFixed(4)}`
            }
        ];
    }

    render() {
        const demographics = [
            [
                DemographicEnum.WHITE,
                this.props.demographicData.population.White,
                this.props.demographicData.population.White / this.props.demographicData.totalPopulation
            ],
            [
                DemographicEnum.BLACK,
                this.props.demographicData.population.AfricanAmerican,
                this.props.demographicData.population.AfricanAmerican / this.props.demographicData.totalPopulation
            ],
            [
                DemographicEnum.ASIAN,
                this.props.demographicData.population.Asian,
                this.props.demographicData.population.Asian / this.props.demographicData.totalPopulation
            ],
            [
                DemographicEnum.HISPANIC,
                this.props.demographicData.population.Hispanic,
                this.props.demographicData.population.Hispanic / this.props.demographicData.totalPopulation
            ],
            [
                DemographicEnum.PACIFIC_ISLANDER,
                this.props.demographicData.population.PacificIslander,
                this.props.demographicData.population.PacificIslander / this.props.demographicData.totalPopulation
            ],
            [
                DemographicEnum.NATIVE_AMERICAN,
                this.props.demographicData.population.NativeAmerican,
                this.props.demographicData.population.NativeAmerican / this.props.demographicData.totalPopulation
            ],
            [
                DemographicEnum.BIRACIAL,
                this.props.demographicData.population.Biracial,
                this.props.demographicData.population.Biracial / this.props.demographicData.totalPopulation
            ],
            [
                DemographicEnum.OTHER,
                this.props.demographicData.population.Other,
                this.props.demographicData.population.Other / this.props.demographicData.totalPopulation
            ]
        ];

        let scores = [];
        if (this.props.scores) {
            scores = [
                [PhaseTwoMeasuresEnum.POPULATION_EQUALITY, this.props.scores.populationEquality.score],
                [PhaseTwoMeasuresEnum.COMPACTNESS, this.props.scores.compactness.score],
                [PhaseTwoMeasuresEnum.PARTISAN_FAIRNESS, this.props.scores.fairness.score],
                [PhaseTwoMeasuresEnum.POLITICAL_COMPETITIVENESS, this.props.scores.competitiveness.score],
                [PhaseTwoMeasuresEnum.POPULATION_HOMOGENEITY, this.props.scores.populationHomogeneity.score],
                ['Population % Diff', this.props.scores.mostToLeastPercentDifference || 0],
                ['Sum', this.props.scores.sum || 0]
            ];
        }

        let additionalScores = [];
        if (this.props.additionalScores) {
            additionalScores = [
                [PhaseTwoMeasuresEnum.POPULATION_EQUALITY, this.props.additionalScores.populationEquality.score],
                [PhaseTwoMeasuresEnum.COMPACTNESS, this.props.additionalScores.compactness.score],
                [PhaseTwoMeasuresEnum.PARTISAN_FAIRNESS, this.props.additionalScores.fairness.score],
                [PhaseTwoMeasuresEnum.POLITICAL_COMPETITIVENESS, this.props.additionalScores.competitiveness.score],
                [PhaseTwoMeasuresEnum.POPULATION_HOMOGENEITY, this.props.additionalScores.populationHomogeneity.score],
                ['Population % Diff', this.props.additionalScores.mostToLeastPercentDifference || 0],
                ['Sum', this.props.additionalScores.sum || 0]
            ];
        }
        console.log(scores, additionalScores);
        

        const pres16 = this.fillPresidential16(this.props.electionData);
        const house16 = this.fillHouse16(this.props.electionData);
        const house18 = this.fillHouse18(this.props.electionData);

        return (
            <Accordion className="statistics-accordion">
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
                {pres16.length > 0 && (
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
                )}

                {house16.length > 0 && (
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
                )}

                {house18.length > 0 && (
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
                )}

                {this.props.scores && (
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5">
                            Objective Function Scores
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body className={'px-0 py-0'}>
                                <ReactTable
                                    className={'mx-0 my-0'}
                                    columns={this.scoreColumns}
                                    data={scores}
                                    defaultPageSize={10}
                                    minRows={0}
                                    showPageSizeOptions={false}
                                    showPaginationBottom={false}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )}

                {this.props.additionalScores && (
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="6">
                            New Objective Function Scores
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="6">
                            <Card.Body className={'px-0 py-0'}>
                                <ReactTable
                                    className={'mx-0 my-0'}
                                    columns={this.scoreColumns}
                                    data={additionalScores}
                                    defaultPageSize={10}
                                    minRows={0}
                                    showPageSizeOptions={false}
                                    showPaginationBottom={false}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )}
            </Accordion>
        );
    }

    private fillPresidential16(electionData: any): any[] {
        if (electionData.presidential16) {
            return [
                [
                    PartyEnum.DEMOCRATIC,
                    this.props.electionData.presidential16.democraticVotes,
                    this.props.electionData.presidential16.democraticVotes /
                        this.props.electionData.presidential16.totalVotes
                ],
                [
                    PartyEnum.REPUBLICAN,
                    this.props.electionData.presidential16.republicanVotes,
                    this.props.electionData.presidential16.republicanVotes /
                        this.props.electionData.presidential16.totalVotes
                ],
                [
                    PartyEnum.OTHER,
                    this.props.electionData.presidential16.otherVotes || 0,
                    (this.props.electionData.presidential16.otherVotes || 0) /
                        this.props.electionData.presidential16.totalVotes
                ]
            ];
        }
        return [];
    }

    private fillHouse16(electionData: any): any[] {
        if (electionData.house16) {
            return [
                [
                    PartyEnum.DEMOCRATIC,
                    this.props.electionData.house16.democraticVotes,
                    this.props.electionData.house16.democraticVotes / this.props.electionData.house16.totalVotes
                ],
                [
                    PartyEnum.REPUBLICAN,
                    this.props.electionData.house16.republicanVotes,
                    this.props.electionData.house16.republicanVotes / this.props.electionData.house16.totalVotes
                ],
                [
                    PartyEnum.OTHER,
                    this.props.electionData.house16.otherVotes || 0,
                    (this.props.electionData.house16.otherVotes || 0) / this.props.electionData.house16.totalVotes
                ]
            ];
        }
        return [];
    }

    private fillHouse18(electionData: any): any[] {
        if (electionData.house18) {
            return [
                [
                    PartyEnum.DEMOCRATIC,
                    this.props.electionData.house18.democraticVotes,
                    this.props.electionData.house18.democraticVotes / this.props.electionData.house18.totalVotes
                ],
                [
                    PartyEnum.REPUBLICAN,
                    this.props.electionData.house18.republicanVotes,
                    this.props.electionData.house18.republicanVotes / this.props.electionData.house18.totalVotes
                ],
                [
                    PartyEnum.OTHER,
                    this.props.electionData.house18.otherVotes || 0,
                    (this.props.electionData.house18.otherVotes || 0) / this.props.electionData.house18.totalVotes
                ]
            ];
        }
        return [];
    }
}
