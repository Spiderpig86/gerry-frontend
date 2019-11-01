import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Dropdown, DropdownButton, Form, Table, Button } from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PhaseZeroArgs, ElectionEnum, StateEnum } from '../../../../models';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseZeroTabPanelProps {
    selectedState: StateEnum;
    phaseZeroArgs: PhaseZeroArgs;
    setSelectedState: (oldState: string, state: string) => void;
    setPhaseZeroArgs: (phaseZeroArgs: PhaseZeroArgs) => void;
}

interface IPhaseZeroTabPanelState {
    phaseZeroArgs: PhaseZeroArgs;
}

export class PhaseZeroTabPanelComponent extends React.Component<
    IPhaseZeroTabPanelProps,
    IPhaseZeroTabPanelState
    > {

    componentWillMount() {
        this.setState({
            phaseZeroArgs: this.props.phaseZeroArgs
        });
    }

    render() {
        const dropdownTitle = `Selected State: ${this.props.selectedState}`;
        return (
            <div className="px-4 py-2" style={{ overflow: 'auto', height: '100%' }}>
                <h4>Phase 0</h4>

                <h6>State Selection</h6>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={dropdownTitle}
                >
                    <Dropdown.Item
                        onClick={() => this.props.setSelectedState(this.props.selectedState, 'CA')}
                    >
                        California
                        </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => this.props.setSelectedState(this.props.selectedState, 'UT')}
                    >
                        Utah
                        </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => this.props.setSelectedState(this.props.selectedState, 'VA')}
                    >
                        Virginia
                        </Dropdown.Item>
                </DropdownButton>

                <div className="py-3">
                    <h6>Demographic Bloc Population Threshold</h6>
                    <p className="alert alert-info">
                        First, select the minimum percentage of a demographic
                        must be populated in percinct to be considered.
                    </p>
                    <Form.Group className="form-group d-flex align-items-center py-2">
                        <Form.Label className={'col-4'}>
                            Majority Demographic:
                        </Form.Label>
                        <TooltipSlider
                            className={'col-8'}
                            defaultValue={0}
                            onAfterChange={this.setDemographicThreshold.bind(this)}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                </div>

                <div className="py-3">
                    <h6>Demographic Bloc Party Threshold</h6>
                    <p className="alert alert-info">
                        Then, select the threshold for the minimum winning party
                        percentage for the selected election to see if the
                        demographic voted en masse for the winning party.
                    </p>

                    <DropdownButton
                        id='phase0Election'
                        title='Select Election Data'
                    >
                        <Dropdown.Item onClick={() => { this.setElectionData(ElectionEnum.PRES_16) }}>
                            Presidential 2016
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { this.setElectionData(ElectionEnum.HOUSE_16) }}>
                            Congressional 2016
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {this.setElectionData(ElectionEnum.HOUSE_18)}}>
                            Congressional 2018
                        </Dropdown.Item>
                    </DropdownButton>

                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className={'col-4'}>
                            Winning Party:
                        </Form.Label>
                        <TooltipSlider
                            className={'col-8'}
                            defaultValue={0}
                            onAfterChange={this.setPartyThreshold.bind(this)}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <div className="d-flex py-3">
                        <Button className='w-100'>Analyze Precincts</Button>
                    </div>
                </div>

                <div className="py-3">
                    <h6>Voting Bloc Precincts</h6>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Precincts ID</th>
                                <th colSpan={2}>Demographic</th>
                                <th colSpan={2}>Party</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [1, 2, 3, 4, 5].map((e: any, i: number) => {
                                    const demographicPercentage = Math.random() * 30 + 70;
                                    const partyPercentage = Math.random() * 30 + 70;
                                    const demographics = ['White', 'African American', 'Hispanic', 'Asian', 'Native American', 'Pacific Islander'];
                                    const parties = ['Democratic', 'Republican'];
                                    const demographic = demographics[~~(Math.random() * parties.length)];
                                    const party = parties[~~(Math.random() * parties.length)];
                                    return (
                                        <tr key={i}>
                                            <td>{i}</td>
                                            <td>{demographic}</td>
                                            <td>{demographicPercentage.toFixed(2)}%</td>
                                            <td>{party}</td>
                                            <td>{partyPercentage.toFixed(2)}%</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

    private setDemographicThreshold(value: number): void {
        console.log(value);
        this.setState({
            phaseZeroArgs: {
                ...this.state.phaseZeroArgs,
                demographicThreshold: value / 100.0
            }
        }, () => this.props.setPhaseZeroArgs(this.state.phaseZeroArgs));
    }
    
    private setElectionData(value: ElectionEnum): void {
        console.log(value);
        this.setState({
            phaseZeroArgs: {
                ...this.state.phaseZeroArgs,
                selectedElection: value
            }
        }, () => this.props.setPhaseZeroArgs(this.state.phaseZeroArgs));
    }

    private setPartyThreshold(value: number): void {
        console.log(value);
        this.setState({
            phaseZeroArgs: {
                ...this.state.phaseZeroArgs,
                partyThreshold: value / 100.0
            }
        }, 
        () => this.props.setPhaseZeroArgs(this.state.phaseZeroArgs));
    }
}

function mapStateToProps(state: any) {
    return { 
        selectedState: state.stateReducer.selectedState,
        phaseZeroArgs: state.stateReducer.phaseZeroArgs,
        setPhaseZeroArgs: state.stateReducer.setPhaseZeroArgs
     };
}

export const PhaseZeroTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseZeroTabPanelComponent);
