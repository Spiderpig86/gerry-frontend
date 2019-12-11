import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Form, DropdownButton, Dropdown } from 'react-bootstrap';
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PhaseOneArgs, ElectionEnum, DemographicEnum, CompactnessEnum, PoliticalFairnessEnum, PopulationEqualityEnum, PhaseTwoDepthEnum } from '../../../../models';

import '../../../../styles/slider.scss';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { PhaseOneAlgorithmPanel } from './algorithm';

const TooltipRange = createSliderWithTooltip(Range);
const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseOneTabPanelProps {
    phaseOneArgs: PhaseOneArgs;
    selectedState: string;
    setPhaseOneArgs: (phaseOneArgs: PhaseOneArgs) => void;
}

interface IPhaseOneTabPanelState {
    phaseOneArgs: PhaseOneArgs;
}

export class PhaseOneTabPanelComponent extends React.Component<
    IPhaseOneTabPanelProps,
    IPhaseOneTabPanelState
    > {

    state = {
        phaseOneArgs: this.props.phaseOneArgs
    };

    render() {
        return (
            <>
                <div className="px-4 py-2" style={{ overflow: 'auto', height: '100%' }}>
                    <h4>District Properties</h4>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Label
                            className={'col-6'}
                            id={'numDistricts'}
                        >Number of Districts to Generate</Form.Label>
                        <Form.Control type={'number'}
                            required
                            className={'col-6'}
                            min={1}
                            max={100}
                            defaultValue={this.state.phaseOneArgs.numDistricts.toString()}
                            onChange={(e: any) => this.setNumberDistricts(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2 mb-4">
                        <Form.Label
                            className={'col-6'}
                            id={'electionData'}
                        >Election Data to Use</Form.Label>

                        <DropdownButton
                            id="dropdown-basic-button"
                            title={EnumNameMapper.getElectionName(this.state.phaseOneArgs.electionData)}
                        >
                            <Dropdown.Item
                                onClick={() => this.setElectionData(ElectionEnum.PRES_16)}
                            >
                                Presidential 2016
                                </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => this.setElectionData(ElectionEnum.HOUSE_16)}
                            >
                                Congressional 2016
                                </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => this.setElectionData(ElectionEnum.HOUSE_18)}
                            >
                                Congressional 2018
                                </Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>

                    <div className="mb-4">
                        <h6>Majority Minority District Threshold</h6>
                        <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                            <Form.Label
                                className={'col-6'}
                                title={'Min/Max Minority Percentage of Population'}
                            >Min/Max Minority Percentage of Population</Form.Label>
                            <TooltipRange
                                className={'col-6'}
                                count={1}
                                allowCross={false}
                                pushable={false}
                                min={51}
                                max={100}
                                defaultValue={[this.state.phaseOneArgs.lowerBound, this.state.phaseOneArgs.upperBound]}
                                tipFormatter={value => `${value}%`}
                                onAfterChange={this.setMajorityMinorityThreshold.bind(this)}
                            />
                        </Form.Group>

                        <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                            <Form.Check
                                custom
                                className={'col-12'}
                                type={'checkbox'}
                                id={'minorityGroupCheckAfrican'}
                                label={'African Americans'}
                                defaultChecked={this.containsDemographic(DemographicEnum.BLACK)}
                                onChange={(e) => this.toggleSelectedDemographics(DemographicEnum.BLACK, e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                            <Form.Check
                                custom
                                className={'col-12'}
                                type={'checkbox'}
                                id={'minorityGroupCheckAsian'}
                                label={'Asians'}
                                defaultChecked={this.containsDemographic(DemographicEnum.ASIAN)}
                                onChange={(e) => this.toggleSelectedDemographics(DemographicEnum.ASIAN, e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                            <Form.Check
                                custom
                                className={'col-12'}
                                type={'checkbox'}
                                id={'minorityGroupCheckPacific'}
                                label={'Pacific Islanders'}
                                defaultChecked={this.containsDemographic(DemographicEnum.PACIFIC_ISLANDER)}
                                onChange={(e) => this.toggleSelectedDemographics(DemographicEnum.PACIFIC_ISLANDER, e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                            <Form.Check
                                custom
                                className={'col-12'}
                                type={'checkbox'}
                                id={'minorityGroupCheckHispanic'}
                                label={'Hispanics'}
                                defaultChecked={this.containsDemographic(DemographicEnum.HISPANIC)}
                                onChange={(e) => this.toggleSelectedDemographics(DemographicEnum.HISPANIC, e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                            <Form.Check
                                custom
                                className={'col-12'}
                                type={'checkbox'}
                                id={'minorityGroupCheckNHWhite'}
                                label={'Non-Hispanic Whites'}
                                defaultChecked={this.containsDemographic(DemographicEnum.WHITE)}
                                onChange={(e) => this.toggleSelectedDemographics(DemographicEnum.WHITE, e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                            <Form.Check
                                custom
                                className={'col-12'}
                                type={'checkbox'}
                                id={'biracialGroupOther'}
                                label={'Multiracial'}
                                defaultChecked={this.containsDemographic(DemographicEnum.BIRACIAL)}
                                onChange={(e) => this.toggleSelectedDemographics(DemographicEnum.BIRACIAL, e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                            <Form.Check
                                custom
                                className={'col-12'}
                                type={'checkbox'}
                                id={'minorityGroupOther'}
                                label={'Other'}
                                defaultChecked={this.containsDemographic(DemographicEnum.OTHER)}
                                onChange={(e) => this.toggleSelectedDemographics(DemographicEnum.OTHER, e.target.checked)}
                            />
                        </Form.Group>
                    </div>
                </div>
                <PhaseOneAlgorithmPanel />
            </>
        );
    }

    private setNumberDistricts(numDistricts: number): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                numDistricts
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private setElectionData(electionData: ElectionEnum): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                electionData
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private setMajorityMinorityThreshold(values: number[]): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                lowerBound: values[0],
                upperBound: values[1]
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private toggleSelectedDemographics(demographic: DemographicEnum, insert: boolean): void {
        const demographics = this.state.phaseOneArgs.demographicTypes;
        if (insert) {
            demographics.add(demographic);
        } else {
            demographics.delete(demographic);
        }
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                demographicTypes: demographics
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private containsDemographic(demographic: DemographicEnum): boolean {
        return this.state.phaseOneArgs.demographicTypes.has(demographic);
    }
}

function mapStateToProps(state: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        phaseOneArgs: state.stateReducer.phaseOneArgs,
        setPhaseOneArgs: state.stateReducer.setPhase
    };
}

export const PhaseOneTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseOneTabPanelComponent);
