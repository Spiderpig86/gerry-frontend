import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Dropdown, DropdownButton, Form, Table, Button } from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PhaseZeroArgs, ElectionEnum, StateEnum, PhaseZeroResult } from '../../../../models';
import { PhaseZeroService } from '../../../../libs/algorithms/phase-zero-service';
import { Placeholder } from '../../../../global_components/placeholder/placeholder';
import { BlocItem } from './blocitem';
import { EnumNameMapper } from '../../../../libs/enum-name';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseZeroTabPanelProps {
    selectedState: StateEnum;
    phaseZeroArgs: PhaseZeroArgs;
    setSelectedStateCreator: (oldState: string, state: string) => void;
    setPhaseZeroArgs: (phaseZeroArgs: PhaseZeroArgs) => void;
    setPhaseZeroResults: (phaseZeroResult: PhaseZeroResult) => void;
}

interface IPhaseZeroTabPanelState {
    phaseZeroArgs: PhaseZeroArgs;
    phaseZeroResults: PhaseZeroResult;
}

export class PhaseZeroTabPanelComponent extends React.Component<IPhaseZeroTabPanelProps, IPhaseZeroTabPanelState> {
    private service: PhaseZeroService;

    constructor() {
        super();
        this.service = new PhaseZeroService();
    }

    componentWillMount() {
        this.setState({
            phaseZeroArgs: this.props.phaseZeroArgs,
            phaseZeroResults: null
        });
    }

    render() {
        return (
            <div className="px-4 py-2" style={{ overflow: 'auto', height: '100%' }}>
                <h4>Phase 0</h4>

                <h6>State Selection</h6>
                <DropdownButton id="dropdown-basic-button" title={`Selected State: ${EnumNameMapper.getStateName(this.props.selectedState)}`}>
                    <Dropdown.Item onClick={() => this.setSelectedState(StateEnum.CA)}>
                        California
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setSelectedState(StateEnum.UT)}>
                        Utah
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setSelectedState(StateEnum.VA)}>
                        Virginia
                    </Dropdown.Item>
                </DropdownButton>

                <div className="py-3">
                    <h6>Demographic Population Threshold</h6>
                    <p className="alert alert-info">
                        First, select the minimum percentage of a demographic must be populated in percinct to be
                        considered.
                    </p>
                    <Form.Group className="form-group d-flex align-items-center py-2">
                        <Form.Label className={'col-4'}>Majority Demographic:</Form.Label>
                        <TooltipSlider
                            className={'col-8'}
                            defaultValue={this.props.phaseZeroArgs.populationThreshold}
                            min={51}
                            onAfterChange={this.setDemographicThreshold.bind(this)}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                </div>

                <div className="py-3">
                    <h6>Demographic Party Threshold</h6>
                    <p className="alert alert-info">
                        Then, select the threshold for the minimum winning party percentage for the selected election to
                        see if the demographic voted en masse for the winning party.
                    </p>

                    <DropdownButton
                        id="phase0Election"
                        title={EnumNameMapper.getElectionName(this.state.phaseZeroArgs.electionType)}
                    >
                        <Dropdown.Item
                            onClick={() => {
                                this.setElectionData(ElectionEnum.PRES_16);
                            }}
                        >
                            Presidential 2016
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                this.setElectionData(ElectionEnum.HOUSE_16);
                            }}
                        >
                            Congressional 2016
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                this.setElectionData(ElectionEnum.HOUSE_18);
                            }}
                        >
                            Congressional 2018
                        </Dropdown.Item>
                    </DropdownButton>

                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className={'col-4'}>Winning Party:</Form.Label>
                        <TooltipSlider
                            className={'col-8'}
                            defaultValue={this.props.phaseZeroArgs.voteThreshold}
                            min={51}
                            onAfterChange={this.setPartyThreshold.bind(this)}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <div className="d-flex py-3">
                        <Button
                            disabled={this.props.selectedState === StateEnum.NOT_SET}
                            className="w-100"
                            onClick={async () => {
                                await this.fetchPrecinctBlocs();
                            }}
                        >
                            Analyze Precincts
                        </Button>
                    </div>
                </div>

                <div className="py-3">
                    <h6>Voting Bloc Precincts</h6>
                    <p className="alert alert-info">
                        This will analyze all precincts within the state to find which ones have a demographic and political make up above the threshold set above.
                        It is best to set a higher threshold for results that better indicate the existence of a bloc (preferably above 80%).
                    </p>
                    {
                        this.state.phaseZeroResults && (
                            <p><b>Total Precinct Count:</b> {this.state.phaseZeroResults.totalVoteBlocCount}</p>
                        )
                    }
                    {this.state.phaseZeroResults ?
                        Object.keys(this.state.phaseZeroResults.precinctBlocs).map((key: any) => {
                            return (
                                <BlocItem key={key} party={key} phaseZeroResults={this.state.phaseZeroResults.precinctBlocs[key]} />
                            );
                        }) :
                        <div className='mt-5'>
                            <Placeholder title='No Data' subtitle='Please select a state and click "Analyze Precincts".'></Placeholder>
                        </div>}
                </div>
            </div>
        );
    }

    private setSelectedState(state: StateEnum): void {
        this.setState(
            {
                phaseZeroArgs: {
                    ...this.state.phaseZeroArgs,
                    stateType: state
                }
            },
            () => {
                this.props.setSelectedStateCreator(this.props.phaseZeroArgs.stateType, state);
                this.props.setPhaseZeroArgs(this.state.phaseZeroArgs);
            }
        );
    }

    private setDemographicThreshold(value: number): void {
        this.setState(
            {
                phaseZeroArgs: {
                    ...this.state.phaseZeroArgs,
                    populationThreshold: value
                }
            },
            () => this.props.setPhaseZeroArgs(this.state.phaseZeroArgs)
        );
    }

    private setElectionData(value: ElectionEnum): void {
        this.setState(
            {
                phaseZeroArgs: {
                    ...this.state.phaseZeroArgs,
                    electionType: value
                }
            },
            () => this.props.setPhaseZeroArgs(this.state.phaseZeroArgs)
        );
    }

    private setPartyThreshold(value: number): void {
        this.setState(
            {
                phaseZeroArgs: {
                    ...this.state.phaseZeroArgs,
                    voteThreshold: value
                }
            },
            () => this.props.setPhaseZeroArgs(this.state.phaseZeroArgs)
        );
    }

    private async fetchPrecinctBlocs(): Promise<void> {
        const phaseZeroResult = await this.service.runPhaseZero(this.state.phaseZeroArgs);
        if (phaseZeroResult) {
            this.setState(
                {
                    phaseZeroResults: phaseZeroResult.data
                },
                () => this.props.setPhaseZeroResults(this.state.phaseZeroResults)
            );
        }
    }
}

function mapStateToProps(state: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        phaseZeroArgs: state.stateReducer.phaseZeroArgs,
        setSelectedStateCreator: state.stateReducer.setSelectedStateCreator,
        setPhaseZeroArgs: state.stateReducer.setPhaseZeroArgs,
        setPhaseZeroResults: state.stateReducer.setPhaseZeroResults
    };
}

export const PhaseZeroTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseZeroTabPanelComponent);
