import * as React from 'react';
import { PhaseZeroResult, PartyEnum } from '../../../../models';
import { Table } from 'react-bootstrap';

interface BlocItemProps {
    party: PartyEnum;
    phaseZeroResults: PhaseZeroResult[];
}

export class BlocItem extends React.Component<BlocItemProps, {}> {

    render() {
        return (
            <div className='py-3'>
                <h6>{this.props.party}</h6>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Precinct Count</th>
                            <th>Demographic</th>
                            <th>Demographic Mean</th>
                            <th>Party</th>
                            <th>Party Mean</th>
                            <th>Min Population</th>
                            <th>Max Population</th>
                            <th>Mean Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.phaseZeroResults &&
                            this.props.phaseZeroResults.map((e: PhaseZeroResult, i: number) => {
                                return (
                                    <tr key={i}>
                                        <td>{e.precinctCount}</td>
                                        <td>{e.demographicType}</td>
                                        <td>{e.meanDemographicPercentage.toFixed(2)}%</td>
                                        <td>{e.partyType}</td>
                                        <td>{e.meanPartyPercentage.toFixed(2)}%</td>
                                        <td>{e.minPrecinctPop.toFixed(0)}</td>
                                        <td>{e.maxPrecinctPop.toFixed(0)}</td>
                                        <td>{e.meanPrecinctPop.toFixed(0)}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
