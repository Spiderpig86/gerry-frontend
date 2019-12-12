import * as React from 'react';

import { round } from '../../../../libs/functions/round';
import { IVoteData } from '../../../../models';

import { Placeholder } from '../../../../global_components';
import ReactTable from 'react-table';

export interface IElectionsTabProps {
    election2016: IElectionTypes;
    election2018: IElectionTypes;
}

export interface IElectionTypes {
    presidentialResults?: IVoteData;
    senatorialResults?: IVoteData;
    houseResults?: IVoteData;
}

export class ElectionsTabPanel extends React.PureComponent<IElectionsTabProps, {}> {
    private columns = null;
    private nameMapper = new Map(Object.entries({
        'democraticVotes': 'Democratic Votes',
        'republicanVotes': 'Republican Votes',
        'otherVotes': 'Other Votes'
    }));

    constructor() {
        super();
        this.columns = [
            {
                Header: 'Party',
                id: 'partyType',
                accessor: (e: any) => this.nameMapper.get(e[0])
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
        if (!this.props.election2016 || !this.props.election2018) {
            return <Placeholder loading={false} title="No precinct selected." subtitle="Select a precinct to view data."></Placeholder>;
        }
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Precinct 2016 Election Returns</h4>
                <p>
                    <b>Presidential</b>
                </p>
                <ReactTable
                    className={'my-3'}
                    columns={this.columns}
                    data={Object.entries(this.props.election2016.presidentialResults)}
                    defaultPageSize={10}
                    minRows={0}
                    showPageSizeOptions={false}
                    showPaginationBottom={false}
                />
                <br />
                <p>
                    <b>House</b>
                </p>
                <ReactTable
                    className={'my-3'}
                    columns={this.columns}
                    data={Object.entries(this.props.election2016.houseResults)}
                    defaultPageSize={10}
                    minRows={0}
                    showPageSizeOptions={false}
                    showPaginationBottom={false}
                />
                <br />
                <p>
                    <b>Senate</b>
                </p>
                <ReactTable
                    className={'my-3'}
                    columns={this.columns}
                    data={Object.entries(this.props.election2016.senatorialResults)}
                    defaultPageSize={10}
                    minRows={0}
                    showPageSizeOptions={false}
                    showPaginationBottom={false}
                />
                <br />
                <h4>Precinct 2018 Election</h4>
                <p>
                    <b>House</b>
                </p>
                <ReactTable
                    className={'my-3'}
                    columns={this.columns}
                    data={Object.entries(this.props.election2018.houseResults)}
                    defaultPageSize={10}
                    minRows={0}
                    showPageSizeOptions={false}
                    showPaginationBottom={false}
                />
                <br />
                <p>
                    <b>Senate</b>
                </p>
                <ReactTable
                    className={'my-3'}
                    columns={this.columns}
                    data={Object.entries(this.props.election2018.senatorialResults)}
                    defaultPageSize={10}
                    minRows={0}
                    showPageSizeOptions={false}
                    showPaginationBottom={false}
                />
            </div>
        );
    }
}
