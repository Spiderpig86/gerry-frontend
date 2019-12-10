import * as React from 'react';
import * as Constants from '../../../../config/constants';
import ReactTable from 'react-table'

import { PhaseZeroResult, PartyEnum, PrecinctBlocSummary } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';

import './blocitem.scss';

interface BlocItemProps {
    phaseZeroResults: PrecinctBlocSummary[];
    highlightedPrecincts: Set<String>;
    setPZeroHighlightedPrecincts: (highlightedPrecincts: Set<String>) => void;
}

interface BlocItemState {
    selectedRow: any;
}

export class BlocItem extends React.Component<BlocItemProps, BlocItemState> {

    private columns = null;
    state = {
        selectedRow: null,
    };

    constructor() {
        super();
        this.columns = [{
            Header: 'Race',
            id: 'demographicType',
            accessor: (e: PrecinctBlocSummary) => EnumNameMapper.getDemographicName(e.demographicType)
        }, {
            Header: 'Avg. Race',
            id: 'demographicMean',
            accessor: (e: PrecinctBlocSummary) => `${(e.meanDemographicPercentage * 100).toFixed(2)}%`
        }, {
            Header: 'Party',
            id: 'partyType',
            accessor: (e: PrecinctBlocSummary) => e.partyType.charAt(0).toUpperCase()
        }, {
            Header: 'Avg. Party',
            id: 'partyMean',
            accessor: (e: PrecinctBlocSummary) => `${(e.meanPartyPercentage * 100).toFixed(2)}%`
        }, {
            Header: '# Precincts',
            id: 'numPrecincts',
            accessor: (e: PrecinctBlocSummary) => `${e.votingBlocCount.toLocaleString()}`,
            sortMethod: (a, b) => {
                return Number(a.replace(',', '')) - Number(b.replace(',', ''));
            }
        }];
    }

    render() {

        return (
            <div className='py-3'>
                <ReactTable
                    getTdProps={(state, rowInfo, column, instance) => {
                        const response = {};
                        if (rowInfo.index === this.state.selectedRow) {
                            response['style'] = {
                                backgroundColor: 'rgba(116, 162, 214, 0.35)'
                            };
                        }
                        return {
                            ...response,
                            onClick: (e, handleOriginal) => {
                                console.log('A Td Element was clicked!')
                                console.log(rowInfo, instance);
                                if (this.props.highlightedPrecincts.size != rowInfo.original.precinctNames.length) {
                                    this.props.setPZeroHighlightedPrecincts(new Set<String>(rowInfo.original.precinctNames));
                                    this.setState({
                                        selectedRow: rowInfo.index
                                    });
                                } else {
                                    this.props.setPZeroHighlightedPrecincts(new Set<String>());
                                    this.setState({
                                        selectedRow: -1
                                    });
                                }
                            },
                            
                        }
                    }}
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
