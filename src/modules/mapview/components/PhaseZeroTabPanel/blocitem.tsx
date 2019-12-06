import * as React from 'react';
import ReactTable from 'react-table'

import { PhaseZeroResult, PartyEnum, PrecinctBlocSummary } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';

import './blocitem.scss';

interface BlocItemProps {
    party: PartyEnum;
    phaseZeroResults: PrecinctBlocSummary[];
}

export class BlocItem extends React.Component<BlocItemProps, {}> {

    render() {

        const columns = [{
            Header: 'Demographic',
            id: 'demographicType',
            accessor: (e: PrecinctBlocSummary) => EnumNameMapper.getDemographicName(e.demographicType)
        }, {
            Header: 'Precinct Count',
            accessor: 'votingBlocCount'
        }, {
            Header: 'Party Mean',
            id: 'partyMean',
            accessor: (e: PrecinctBlocSummary) => `${e.meanPartyPercentage.toFixed(2)}%`
        }, {
            Header: 'Demographic Mean',
            id: 'demographicMean',
            accessor: (e: PrecinctBlocSummary) => `${e.meanDemographicPercentage.toFixed(2)}%`
        }];

        return (
            <div className='py-3'>
                <h6 className='text-capitalize'>{this.props.party}</h6>
                <ReactTable
                    columns={columns}
                    data={this.props.phaseZeroResults}
                    defaultPageSize={10}
                    minRows={0}
                    showPageSizeOptions={false}
                />
            </div>
        )
    }
}
