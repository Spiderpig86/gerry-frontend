import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Form, DropdownButton, Dropdown } from 'react-bootstrap';
import Slider, { createSliderWithTooltip, Range } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PhaseOneArgs, ElectionEnum, DemographicEnum, CompactnessEnum, PoliticalFairnessEnum, PopulationEqualityEnum, PhaseTwoDepthEnum, PhaseTwoArgs, PhaseTwoMeasuresEnum } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';

import '../../../../styles/slider.scss';

const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseOneTabPanelProps {
    phaseOneArgs: PhaseOneArgs;
    phaseTwoArgs: PhaseTwoArgs;
    selectedState: string;
    setPhaseTwoArgs: (phaseTwoArgs: PhaseTwoArgs) => void;
}

interface IPhaseTwoTabPanelState {
    phaseTwoArgs: PhaseTwoArgs;
}

export class PhaseTwoTabPanelComponent extends React.Component<
    IPhaseOneTabPanelProps,
    IPhaseTwoTabPanelState
    > {

    state = {
        phaseTwoArgs: {
            ...this.props.phaseTwoArgs,
            stateType: this.props.phaseOneArgs.stateType,
            electionData: this.props.phaseOneArgs.electionData,
            demographicTypes: this.props.phaseOneArgs.demographicTypes,
            upperBound: this.props.phaseOneArgs.upperBound,
            lowerBound: this.props.phaseOneArgs.lowerBound
        }
    };

    private compactnessOptions = [{ name: 'Graph Theory', key: CompactnessEnum.GRAPH_THEORETICAL }, { name: 'PolsbyPopper', key: CompactnessEnum.POLSBY_POPPER }, { name: 'Schwartzberg', key: CompactnessEnum.SCHWARTZBERG }, { name: 'Reock', key: CompactnessEnum.REOCK }, { name: 'Convex Hull', key: CompactnessEnum.CONVEX_HULL }];
    private politicalFairnessOptions = [{ name: 'Efficiency Gap', key: PoliticalFairnessEnum.EFFICIENCY_GAP }, { name: 'Gerrymander Democratic', key: PoliticalFairnessEnum.GERRYMANDER_DEMOCRAT }, { name: 'Gerrymander Republican', key: PoliticalFairnessEnum.GERRYMANDER_REPUBLICAN }, { name: 'Lopsided Margins', key: PoliticalFairnessEnum.LOPSIDED_MARGINS }, { name: 'Mean-Median Difference', key: PoliticalFairnessEnum.MEAN_MEDIAN_DIFFERENCE }, { name: 'Partisan Democrat', key: PoliticalFairnessEnum.PARTISAN_DEMOCRAT }, { name: 'Partisan Republican', key: PoliticalFairnessEnum.PARTISAN_REPUBLICAN }];
    private populationEqualityOptions = [{ name: 'Most to Least', key: PopulationEqualityEnum.MOST_TO_LEAST }, { name: 'Ideal', key: PopulationEqualityEnum.IDEAL }]
    private depthOptions = [{ name: 'Standard', key: PhaseTwoDepthEnum.STANDARD }, { name: 'Level', key: PhaseTwoDepthEnum.LEVEL }, { name: 'Tree', key: PhaseTwoDepthEnum.TREE }]

    render() {
        return (
            <div className="px-4 py-2" style={{ overflow: 'auto', height: '100%' }}>
                <h4>Phase 2</h4>

                <h4>Compactness Options</h4>
                <div className="mb-4">
                    {
                        this.compactnessOptions.map(
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
                                        defaultChecked={e.key === this.state.phaseTwoArgs.compactnessOption}
                                        onChange={(e) => this.setCompactness(e.target.getAttribute('data-compactness'))}
                                    />
                                </Form.Group>
                            );
                        }
                    )}
                </div>

                <h4>Political Fairness Options</h4>
                <div className="mb-4">
                    {
                        this.politicalFairnessOptions.map(
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
                                        defaultChecked={e.key === this.state.phaseTwoArgs.politicalFairnessOption}
                                        onChange={(e) => this.setPoliticalFairness(e.target.getAttribute('data-political'))}
                                    />
                                </Form.Group>
                            );
                        }
                    )}
                </div>

                <h4>Population Equality Options</h4>
                <div className="mb-4">
                    {
                        this.populationEqualityOptions.map(
                        (e: any, i: number) => {
                            return (
                                <Form.Group
                                    key={`popGroup${i}`}
                                    className="w-100 py-2 row form-group d-flex align-items-center"
                                >
                                    <Form.Check
                                        name={`populationAlgo`}
                                        key={e.key}
                                        data-population={e.key}
                                        custom
                                        type={'radio'}
                                        id={`popOption${i}`}
                                        label={`${e.name}`}
                                        defaultChecked={e.key === this.state.phaseTwoArgs.populationEqualityOption}
                                        onChange={(e) => this.setPopulationEquality(e.target.getAttribute('data-population'))}
                                    />
                                </Form.Group>
                            );
                        }
                    )}
                </div>

                <h4>Phase Two Depth Heuristics</h4>
                <div className="mb-4">
                    {
                        this.depthOptions.map(
                        (e: any, i: number) => {
                            return (
                                <Form.Group
                                    key={`depthGroup${i}`}
                                    className="w-100 py-2 row form-group d-flex align-items-center"
                                >
                                    <Form.Check
                                        name={`depthAlgo`}
                                        key={e.key}
                                        data-depth={e.key}
                                        custom
                                        type={'radio'}
                                        id={`dpethOption${i}`}
                                        label={`${e.name}`}
                                        defaultChecked={e.key === this.state.phaseTwoArgs.phaseTwoDepthHeuristic}
                                        onChange={(e) => this.setPhaseTwoDepthHeuristic(e.target.getAttribute('data-depth'))}
                                    />
                                </Form.Group>
                            );
                        }
                    )}
                </div>

                <h4>Phase Two Simulated Annealing Retries</h4>
                <div className="mb-4">
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Label
                            className={'col-6'}
                            id={'numRetries'}
                        >Maximum Number of Retries</Form.Label>
                        <Form.Control type={'number'}
                            required
                            className={'col-6'}
                            min={1}
                            defaultValue={this.state.phaseTwoArgs.numRetries.toString()}
                            onChange={(e: any) => this.setNumberRetries(e.target.value)}
                        />
                    </Form.Group>
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
                            defaultValue={this.state.phaseTwoArgs.weights.get(PhaseTwoMeasuresEnum.POPULATION_EQUALITY)}
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
                            defaultValue={this.state.phaseTwoArgs.weights.get(PhaseTwoMeasuresEnum.COMPACTNESS)}
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
                            defaultValue={this.state.phaseTwoArgs.weights.get(PhaseTwoMeasuresEnum.PARTISAN_FAIRNESS)}
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
                            defaultValue={this.state.phaseTwoArgs.weights.get(PhaseTwoMeasuresEnum.CONTIGUITY)}
                            tipFormatter={value => `${value}%`}
                            onAfterChange={this.setObjectiveContiguity.bind(this)}
                        ></TooltipSlider>
                    </Form.Group>
                </div>
            </div>
        );
    }

    private setCompactness(compactnessOption: CompactnessEnum): void {
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                compactnessOption
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setPoliticalFairness(politicalFairnessOption: PoliticalFairnessEnum): void {
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                politicalFairnessOption
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setPopulationEquality(populationEqualityOption: PopulationEqualityEnum): void {
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                populationEqualityOption
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setPhaseTwoDepthHeuristic(phaseTwoDepthHeuristic: PhaseTwoDepthEnum): void {
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                phaseTwoDepthHeuristic
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setNumberRetries(numRetries: number): void {
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                numRetries
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setObjectivePopulationEquality(objectivePopulationEquality: number): void {
        const weights = this.state.phaseTwoArgs.weights;
        weights.set(PhaseTwoMeasuresEnum.POPULATION_EQUALITY, objectivePopulationEquality);
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                weights
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setObjectiveCompactness(objectiveCompactness: number): void {
        const weights = this.state.phaseTwoArgs.weights;
        weights.set(PhaseTwoMeasuresEnum.COMPACTNESS, objectiveCompactness);
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                weights
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setObjectivePartisanFairness(objectivePartisanFairness: number): void {
        const weights = this.state.phaseTwoArgs.weights;
        weights.set(PhaseTwoMeasuresEnum.PARTISAN_FAIRNESS, objectivePartisanFairness);
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                weights
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }

    private setObjectiveContiguity(objectiveContiguity: number): void {
        const weights = this.state.phaseTwoArgs.weights;
        weights.set(PhaseTwoMeasuresEnum.CONTIGUITY, objectiveContiguity);
        this.setState({
            phaseTwoArgs: {
                ...this.state.phaseTwoArgs,
                weights
            }
        }, () => this.props.setPhaseTwoArgs(this.state.phaseTwoArgs));
    }
}

function mapStateToProps(state: any) {
    return {
        selectedState: state.stateReducer.selectedState,
        phaseOneArgs: state.stateReducer.phaseOneArgs,
        phaseTwoArgs: state.stateReducer.phaseTwoArgs,
        setPhaseTwoArgs: state.stateReducer.setPhaseTwoArgs
    };
}

export const PhaseTwoTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseTwoTabPanelComponent);
