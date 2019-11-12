import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Form, DropdownButton, Dropdown } from 'react-bootstrap';
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PhaseOneArgs, ElectionEnum, DemographicEnum, CompactnessEnum, PoliticalFairnessEnum } from '../../../../models';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipRange = createSliderWithTooltip(Range);
const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseOneTabPanelProps {
    phaseOneArgs: PhaseOneArgs;
    selectedState: string;
    setPhaseOneArgs: (phaseOneArgs: PhaseOneArgs) => void;
}

interface IPhaseZeroTabPanelState {
    phaseOneArgs: PhaseOneArgs;
}

export class PhaseOneTabPanelComponent extends React.Component<
    IPhaseOneTabPanelProps,
    IPhaseZeroTabPanelState
    > {

    private electionMap: Map<ElectionEnum, string> = new Map([
        [ElectionEnum.PRES_16, 'Presidential 2016'],
        [ElectionEnum.HOUSE_16, 'Congressional 2016'],
        [ElectionEnum.HOUSE_18, 'Congressional 2018'],
    ]);
    state = {
        phaseOneArgs: this.props.phaseOneArgs
    };

    render() {
        return (
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
                        title={this.electionMap.get(this.state.phaseOneArgs.electionData)}
                    >
                            <Dropdown.Item
                            onClick={() => this.setElectionData(ElectionEnum.PRES_16) }
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
                    <p className="alert alert-info">
                        The minimum is to prevent cracking (low thresholds will
                        dilute voters). The maximum is to prevent packing.
                        Select the demographics you want to consider
                        collectively as minorities.
                    </p>
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
                            min={50}
                            max={100}
                            defaultValue={[this.state.phaseOneArgs.minPopulationPercent, this.state.phaseOneArgs.maxPopulationPercent]}
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
                            label={'Biracial'}
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

                
                <h4>Compactness Options</h4>
                <p className="alert alert-info">
                    Specify algorithm for measuring compactness.
                </p>
                <div className="mb-4">
                    {[{name: 'PolsbyPopper', key: CompactnessEnum.POLSBY_POPPER}, {name: 'Schwartzberg', key: CompactnessEnum.SCHWARTZBERG}].map(
                        (e: any, i: number) => {
                            return (
                                <Form.Group
                                    key={`compactGroup${i}`}
                                    className="w-100 py-2 row form-group d-flex align-items-center"
                                >
                                    <Form.Check
                                        name={`compactnessAlgo`}
                                        data-compactness={e.key}
                                        key={e.key}
                                        custom
                                        type={'radio'}
                                        id={`compactGroup${i}`}
                                        label={`${e.name}`}
                                        defaultChecked={e.key === this.state.phaseOneArgs.compactnessOption}
                                        onChange={(e) => this.setCompactness(e.target.getAttribute('data-compactness'))}
                                    />
                                </Form.Group>
                            );
                        }
                    )}
                </div>

                <h4>Political Fairness Options</h4>
                <p className="alert alert-info">
                    Specify factors for measuring political fairness.
                </p>
                <div className="mb-4">
                    {[{name: 'Efficiency Gap', key: PoliticalFairnessEnum.EFFICIENCY_GAP}, {name: 'Lopsided Margins', key: PoliticalFairnessEnum.LOPSIDED_MARGINS}, {name: 'Mean-Median Difference', key: PoliticalFairnessEnum.MEAN_MEDIAN_DIFFERENCE}].map(
                        (e: any, i: number) => {
                            return (
                                <Form.Group
                                    key={`algoGroup${i}`}
                                    className="w-100 py-2 row form-group d-flex align-items-center"
                                >
                                    <Form.Check
                                        name={`politicalAlgo`}
                                        key={e.key}
                                        data-political={e.key}
                                        custom
                                        type={'radio'}
                                        id={`algoOption${i}`}
                                        label={`${e.name}`}
                                        defaultChecked={e.key === this.state.phaseOneArgs.politicalFairnessOption}
                                        onChange={(e) => this.setPoliticalFairness(e.target.getAttribute('data-political'))}
                                    />
                                </Form.Group>
                            );
                        }
                    )}
                </div>

                <div className="mb-4">
                    <h4>Objective Function Weights</h4>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className="col-6 mb-0">
                            Population Equality
                        </Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            min={0}
                            max={100}
                            defaultValue={this.state.phaseOneArgs.objectivePopulationEquality}
                            tipFormatter={value => `${value}%`}
                            onAfterChange={this.setObjectivePopulationEquality.bind(this)}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className="col-6 mb-0">Compactness</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            min={0}
                            max={100}
                            defaultValue={this.state.phaseOneArgs.objectiveCompactness}
                            tipFormatter={value => `${value}%`}
                            onAfterChange={this.setObjectiveCompactness.bind(this)}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className="col-6 mb-0">
                            Partisan Fairness
                        </Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            min={0}
                            max={100}
                            defaultValue={this.state.phaseOneArgs.objectivePartisanFairness}
                            tipFormatter={value => `${value}%`}
                            onAfterChange={this.setObjectivePartisanFairness.bind(this)}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className="col-6 mb-0">Contiguity</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            min={0}
                            max={100}
                            defaultValue={this.state.phaseOneArgs.objectiveContiguity}
                            tipFormatter={value => `${value}%`}
                            onAfterChange={this.setObjectiveContiguity.bind(this)}
                        ></TooltipSlider>
                    </Form.Group>
                </div>
            </div>
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
                minPopulationPercent: values[0],
                maxPopulationPercent: values[1]
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private toggleSelectedDemographics(demographic: DemographicEnum, insert: boolean): void {
        const demographics = this.state.phaseOneArgs.selectedDemographics;
        if (insert) {
            demographics.add(demographic);
        } else {
            demographics.delete(demographic);
        }
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                selectedDemographics: demographics
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private containsDemographic(demographic: DemographicEnum): boolean {
        return this.state.phaseOneArgs.selectedDemographics.has(demographic);
    }
    
    private setCompactness(compactnessOption: CompactnessEnum): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                compactnessOption
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }
    
    private setPoliticalFairness(politicalFairnessOption: PoliticalFairnessEnum): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                politicalFairnessOption
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private setObjectivePopulationEquality(objectivePopulationEquality: number): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                objectivePopulationEquality
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }
    
    private setObjectiveCompactness(objectiveCompactness: number): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                objectiveCompactness
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private setObjectivePartisanFairness(objectivePartisanFairness: number): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                objectivePartisanFairness
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
    }

    private setObjectiveContiguity(objectiveContiguity: number): void {
        this.setState({
            phaseOneArgs: {
                ...this.state.phaseOneArgs,
                objectiveContiguity
            }
        }, () => this.props.setPhaseOneArgs(this.state.phaseOneArgs));
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
