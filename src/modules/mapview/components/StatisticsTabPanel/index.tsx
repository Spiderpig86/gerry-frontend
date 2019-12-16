import * as React from 'react';

import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { StateEnum, ICluster, ClusterProperties } from '../../../../models';
import { Placeholder } from '../../../../global_components';
import { Button } from 'react-bootstrap';

import './styles.scss';
import * as Redistricting from './redistricting.json';
import ReactTable from 'react-table';

interface StatisticsTabPanelProps {
    selectedState: StateEnum;
    stateData: ICluster;
    clusterProperties: ClusterProperties;
}

export class StatisticsTabPanel extends React.PureComponent<StatisticsTabPanelProps, {}> {

    private votingPatternsColumns = null;

    constructor() {
        super();
        
        this.votingPatternsColumns = [
            {
                Header: 'Statistic',
                id: 'statType',
                accessor: (e: any) => e[0]
            },
            {
                Header: 'Democratic',
                id: 'demCount',
                accessor: (e: any) => `${Math.round(e[1]).toLocaleString()}`,
                sortMethod: (a, b) => {
                    return Number(a.replace(',', '')) - Number(b.replace(',', ''));
                }
            },
            {
                Header: 'Dem. %',
                id: 'demPerc',
                accessor: (e: any) => `${(e[2] * 100).toFixed(2)}%`,
            },
            {
                Header: 'Republican',
                id: 'repCount',
                accessor: (e: any) => `${Math.round(e[3]).toLocaleString()}`,
                sortMethod: (a, b) => {
                    return Number(a.replace(',', '')) - Number(b.replace(',', ''));
                }
            },
            {
                Header: 'Rep. %',
                id: 'repPerc',
                accessor: (e: any) => `${(e[4] * 100).toFixed(2)}%`,
            }
        ];
    }

    render() {
        if (this.props.selectedState === StateEnum.NOT_SET) {
            return <Placeholder loading={false} title="No state selected." subtitle="Select a state to view all district data."></Placeholder>;
        }

        if (!this.props.stateData) {
            return <Placeholder loading={true} title="" subtitle=""></Placeholder>;
        }

        let votingPatterns = [];
        if (this.props.clusterProperties && this.props.clusterProperties.house16 && this.props.clusterProperties.house18) {
            const repTotal = this.props.clusterProperties.democraticRepCount + this.props.clusterProperties.republicanRepCount;
            const house16Total = this.props.clusterProperties.house16.democraticVotes + this.props.clusterProperties.house16.republicanVotes;
            const house18Total = this.props.clusterProperties.house18.democraticVotes + this.props.clusterProperties.house18.republicanVotes;
            votingPatterns = [
                ['Elected Count', this.props.clusterProperties.democraticRepCount, this.props.clusterProperties.democraticRepCount / repTotal, this.props.clusterProperties.republicanRepCount, this.props.clusterProperties.republicanRepCount / repTotal],
                ['House 2016 Votes', this.props.clusterProperties.house16.democraticVotes, this.props.clusterProperties.house16.democraticVotes / house16Total, this.props.clusterProperties.house16.republicanVotes, this.props.clusterProperties.house16.republicanVotes / house16Total],
                ['House 2018 Votes', this.props.clusterProperties.house18.democraticVotes, this.props.clusterProperties.house18.democraticVotes / house18Total, this.props.clusterProperties.house18.republicanVotes, this.props.clusterProperties.house18.republicanVotes / house18Total],
            ];
        }

        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>State Statistics</h4>
                <p>Total Population: {this.props.stateData.demographicData.totalPopulation.toLocaleString()}</p>
                <StatisticsAccordionComponent demographicData={this.props.stateData.demographicData} electionData={this.props.stateData.electionData} />
                <br/>

                <h5>Statewide Voting Patterns</h5>
                <ReactTable
                        className={'my-3'}
                        columns={this.votingPatternsColumns}
                        data={votingPatterns}
                        defaultPageSize={10}
                        minRows={0}
                        showPageSizeOptions={false}
                        showPaginationBottom={false}
                    />
                <br />

                <h5>Redistricting Guidelines</h5>
                <div className='redistrict' dangerouslySetInnerHTML={{__html: unescape(Redistricting[this.props.selectedState].html)}} />
                <a href={Redistricting[this.props.selectedState].link} target='_blank'>
                    <Button className='mb-3'>More Info</Button>
                </a>
            </div>
        );
    }
}