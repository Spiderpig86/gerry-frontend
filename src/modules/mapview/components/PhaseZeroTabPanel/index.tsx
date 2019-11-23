import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Dropdown, DropdownButton, Form, Table, Button } from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PhaseZeroArgs, ElectionEnum, StateEnum, PhaseZeroResult, PartyEnum } from '../../../../models';
import { PhaseZeroService } from '../../../../libs/phase-zero-service';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';
import { BlocItem } from './blocitem';

const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseZeroTabPanelProps {
    selectedState: StateEnum;
    phaseZeroArgs: PhaseZeroArgs;
    setSelectedState: (oldState: string, state: string) => void;
    setPhaseZeroArgs: (phaseZeroArgs: PhaseZeroArgs) => void;
    setPhaseZeroResults: (phaseZeroResult: PhaseZeroResult) => void;
}

interface IPhaseZeroTabPanelState {
    phaseZeroArgs: PhaseZeroArgs;
    phaseZeroResults: PhaseZeroResult;
}

export class PhaseZeroTabPanelComponent extends React.Component<IPhaseZeroTabPanelProps, IPhaseZeroTabPanelState> {
    private electionMap: Map<ElectionEnum, string> = new Map([
        [ElectionEnum.PRES_16, 'Presidential 2016'],
        [ElectionEnum.HOUSE_16, 'Congressional 2016'],
        [ElectionEnum.HOUSE_18, 'Congressional 2018']
    ]);
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
        const dropdownTitle = `Selected State: ${this.props.selectedState === null ? 'N/A' : this.props.selectedState}`;
        return (
            <div className="px-4 py-2" style={{ overflow: 'auto', height: '100%' }}>
                <h4>Phase 0</h4>

                <h6>State Selection</h6>
                <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
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
                            defaultValue={this.props.phaseZeroArgs.populationThreshold * 100}
                            min={50}
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
                        title={this.electionMap.get(this.state.phaseZeroArgs.electionType)}
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
                            defaultValue={this.props.phaseZeroArgs.voteThreshold * 100}
                            min={50}
                            onAfterChange={this.setPartyThreshold.bind(this)}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <div className="d-flex py-3">
                        <Button
                            disabled={!this.props.selectedState}
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
                    {
                        console.log(this.state.phaseZeroResults)
                    }
                    {this.state.phaseZeroResults &&
                        Object.keys(this.state.phaseZeroResults.precinctBlocs).map((key: any) => {
                            return (
                                <BlocItem key={key} party={key} phaseZeroResults={this.state.phaseZeroResults.precinctBlocs[key]} />
                            );
                        })}
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
                this.props.setSelectedState(this.props.selectedState, state);
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
        console.log(phaseZeroResult)
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
