import * as React from 'react';

import { IDemographics } from '../../../../models';
import { Placeholder } from '../../../../global_components';
import ReactTable from 'react-table';

export interface IDemographicsTabProps {
    hispanicDemographics: IDemographics;
    nonHispanicDemographics: IDemographics;
    totalPopulation?: number;

    votingAgeDemographics: IDemographics;
    totalVotingPopulation?: number;
}

export class DemographicsTabPanel extends React.PureComponent<IDemographicsTabProps, {}> {

    private demographicColumns = null;

    constructor() {
        super();
        this.demographicColumns = [{
            Header: 'Demographic',
            id: 'demographicType',
            accessor: (e: any) => e[0]
        }, {
            Header: 'Population',
            id: 'demographicPopulation',
            accessor: (e: any) => Math.round(e[1])
        }];
    }
    
    render() {
        if (!this.props.hispanicDemographics || !this.props.nonHispanicDemographics) {
            return <Placeholder title='No precinct selected.' subtitle='Select a precinct to view data.'></Placeholder>;
        }
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Precinct Demographics</h4>
                <p><b>Total Population: </b> {Math.round(this.props.totalPopulation) || 'N/A'}</p>

                <div className='pt-3'>
                    <b>Non-Hispanic Demographic</b>
                    <ReactTable
                        className={'my-3'}
                        columns={this.demographicColumns}
                        data={Object.entries(this.props.nonHispanicDemographics)}
                        defaultPageSize={10}
                        minRows={0}
                        showPageSizeOptions={false}
                        showPaginationBottom={false}
                    />
                </div>
                <div className='pt-3'>
                    <b>Hispanic Demographic</b>
                    <ReactTable
                        className={'my-3'}
                        columns={this.demographicColumns}
                        data={Object.entries(this.props.hispanicDemographics)}
                        defaultPageSize={10}
                        minRows={0}
                        showPageSizeOptions={false}
                        showPaginationBottom={false}
                    />
                </div>

                <div className='pt-3'>
                    <b>Voting Age Demographic</b>
                    <ReactTable
                        className={'my-3'}
                        columns={this.demographicColumns}
                        data={Object.entries(this.props.votingAgeDemographics)}
                        defaultPageSize={10}
                        minRows={0}
                        showPageSizeOptions={false}
                        showPaginationBottom={false}
                    />
                </div>
            </div>
        )
    }
}