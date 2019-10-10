import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Dropdown, DropdownButton, Form, Table } from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseZeroTabPanelProps {
    selectedState: string;
    setSelectedState: (state: string) => void;
}

export class PhaseZeroTabPanelComponent extends React.Component<
    IPhaseZeroTabPanelProps,
    {}
    > {
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
                        onClick={() => this.props.setSelectedState('CA')}
                    >
                        California
                        </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => this.props.setSelectedState('UT')}
                    >
                        Utah
                        </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => this.props.setSelectedState('VA')}
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
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <DropdownButton
                            className={'col-6 px-0'}
                            id="dropdown-basic-button"
                            title={'Bloc Demographic'}
                        >
                            <Dropdown.Item onClick={() => { }}>
                                White
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { }}>
                                African American
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { }}>
                                Hispanic
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { }}>
                                Asian
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { }}>
                                Native American
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { }}>
                                Pacific Islander
                            </Dropdown.Item>
                        </DropdownButton>
                        <TooltipSlider
                            className={'col-6 px-0'}
                            defaultValue={0}
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
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className={'col-4'}>
                            Winning Party:
                        </Form.Label>
                        <TooltipSlider
                            className={'col-8'}
                            defaultValue={0}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                </div>

                <div className="py-3">
                    <h6>Voting Bloc Precincts</h6>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>District ID</th>
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
                                        <tr>
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
}

function mapStateToProps(state: any) {
    return { selectedState: state.stateReducer.selectedState };
}

export const PhaseZeroTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseZeroTabPanelComponent);
