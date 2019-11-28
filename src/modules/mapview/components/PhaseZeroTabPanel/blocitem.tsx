import * as React from 'react';
import ReactTable from 'react-table'

import { PhaseZeroResult, PartyEnum, PrecinctBlocSummary } from '../../../../models';
import { Table } from 'react-bootstrap';
import { EnumNameMapper } from '../../../../libs/enum-name';

interface BlocItemProps {
    party: PartyEnum;
    phaseZeroResults: PrecinctBlocSummary[];
}

export class BlocItem extends React.Component<BlocItemProps, {}> {

    render() {
        // return (
        //     <div className='py-3'>
        //         <h6>{this.props.party}</h6>
        //         <Table striped bordered hover responsive>
        //             <thead>
        //                 <tr>
        //                     <th>Voting Bloc Count</th>
        //                     <th>Party Mean</th>
        //                     <th>Demographic</th>
        //                     <th>Demographic Mean</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {this.props.phaseZeroResults &&
        //                     this.props.phaseZeroResults.map((e: PrecinctBlocSummary, i: number) => {
        //                         return (
        //                             <tr key={i}>
        //                                 <td>{e.votingBlocCount}</td>
        //                                 <td>{e.meanPartyPercentage.toFixed(2)}%</td>
        //                                 <td>{EnumNameMapper.getDemographicName(e.demographicType)}</td>
        //                                 <td>{e.meanDemographicPercentage.toFixed(2)}%</td>
        //                             </tr>
        //                         );
        //                     })}
        //             </tbody>
        //         </Table>
        //     </div>
        // );

        const columns = [{
            Header: 'Voting Bloc Count',
            accessor: 'votingBlocCount'
        }, {
            Header: 'Party Mean',
            accessor: 'meanPartyPercentage'
        }, {
            Header: 'Demographic',
            accessor: 'demographicType'
        }, {
            Header: 'Demographic Mean',
            accessor: 'meanDemographicPercentage'
        }];
        console.log()

        return (
            <div className='py-3'>
                <h6>{this.props.party}</h6>
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
