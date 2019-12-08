import * as React from 'react';
import ReactTable from 'react-table'

import { PhaseZeroResult, PartyEnum, PrecinctBlocSummary } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';

import './blocitem.scss';

interface BlocItemProps {
    phaseZeroResults: PrecinctBlocSummary[];
}

export class BlocItem extends React.Component<BlocItemProps, {}> {

    private columns = null;

    constructor() {
        super();
        this.columns = [{
            Header: 'Race',
            id: 'demographicType',
            accessor: (e: PrecinctBlocSummary) => EnumNameMapper.getDemographicName(e.demographicType)
        }, {
            Header: 'Avg. Race',
            id: 'demographicMean',
            accessor: (e: PrecinctBlocSummary) => `${e.meanDemographicPercentage.toFixed(2)}%`
        },
        {
            Header: 'Party',
            id: 'partyType',
            accessor: (e: PrecinctBlocSummary) => e.partyType.charAt(0).toUpperCase()
        }, {
            Header: 'Avg. Party',
            id: 'partyMean',
            accessor: (e: PrecinctBlocSummary) => `${e.meanPartyPercentage.toFixed(2)}%`
        }, {
            Header: '# Precincts',
            accessor: 'votingBlocCount'
        }];
    }

    render() {

        return (
            <div className='py-3'>
                <ReactTable
                    columns={this.columns}
                    data={this.props.phaseZeroResults}
                    defaultPageSize={10}
                    minRows={0}
                    showPageSizeOptions={false}
                />
            </div>
        )
    }
}
