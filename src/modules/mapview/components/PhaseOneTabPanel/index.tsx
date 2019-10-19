import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Form } from 'react-bootstrap';
import Slider, { createSliderWithTooltip, Handle, Range } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipRange = createSliderWithTooltip(Range);
const TooltipSlider = createSliderWithTooltip(Slider);

interface IPhaseOneTabPanelProps {
    selectedState: string;
    setSelectedState: (state: string) => void;
}

export class PhaseOneTabPanelComponent extends React.Component<
IPhaseOneTabPanelProps,
    {}
> {
    render() {
        return (
            <div className="px-4 py-2" style={{ overflow: 'auto', height: '100%' }}>
                <h4>District Properties</h4>
                <Form.Group className="w-100 row form-group d-flex align-items-center py-2 mb-4">
                    <Form.Label
                        className={'col-6'}
                        id={'numDistricts'}
                    >Number of Districts to Generate</Form.Label>
                    <Form.Control type={'number'}
                        required
                        className={'col-6'}
                        min={1}
                        defaultValue='5'
                    />
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
                        <Form.Check
                            custom
                            className={'col-6'}
                            type={'checkbox'}
                            id={'majorityMinoritySlider'}
                            label={'Min/Max Minority Percentage of Population'}
                        />
                        <TooltipRange
                            className={'col-6'}
                            count={1}
                            allowCross={false}
                            pushable={false}
                            min={50}
                            max={100}
                            defaultValue={[50, 50]}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>

                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check
                            custom
                            className={'col-12'}
                            type={'checkbox'}
                            id={'minorityGroupCheckAfrican'}
                            label={'African Americans'}
                        />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check
                            custom
                            className={'col-12'}
                            type={'checkbox'}
                            id={'minorityGroupCheckAsian'}
                            label={'Asians'}
                        />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check
                            custom
                            className={'col-12'}
                            type={'checkbox'}
                            id={'minorityGroupCheckPacific'}
                            label={'Pacific Islanders'}
                        />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check
                            custom
                            className={'col-12'}
                            type={'checkbox'}
                            id={'minorityGroupCheckHispanic'}
                            label={'Hispanics'}
                        />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check
                            custom
                            className={'col-12'}
                            type={'checkbox'}
                            id={'minorityGroupCheckNHWhite'}
                            label={'Non-Hispanic Whites'}
                        />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check
                            custom
                            className={'col-12'}
                            type={'checkbox'}
                            id={'minorityGroupOther'}
                            label={'Other'}
                        />
                    </Form.Group>
                </div>

                
                <h4>Compactness Options</h4>
                <p className="alert alert-info">
                    Specify algorithm for measuring compactness.
                </p>
                <div className="mb-4">
                    {['PolsbyPopper', 'Schwartzberg'].map(
                        (e: any, i: number) => {
                            return (
                                <Form.Group
                                    key={`algoGroup${i}`}
                                    className="w-100 py-2 row form-group d-flex align-items-center"
                                >
                                    <Form.Check
                                        key={`algoOption${i}`}
                                        custom
                                        type={'checkbox'}
                                        id={`algoOption${i}`}
                                        label={`${e}`}
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
                    {['Efficiency Gap', 'Lopsided Margins', 'Mean-Median Difference'].map(
                        (e: any, i: number) => {
                            return (
                                <Form.Group
                                    key={`algoGroup${i}`}
                                    className="w-100 py-2 row form-group d-flex align-items-center"
                                >
                                    <Form.Check
                                        key={`algoOption${i}`}
                                        custom
                                        type={'checkbox'}
                                        id={`algoOption${i}`}
                                        label={`${e}`}
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
                            defaultValue={0}
                            min={0}
                            max={100}
                            tipFormatter={value => `${value}%`}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className="col-6 mb-0">Compactness</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={0}
                            max={100}
                            tipFormatter={value => `${value}%`}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className="col-6 mb-0">
                            Partisan Fairness
                        </Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={0}
                            max={100}
                            tipFormatter={value => `${value}%`}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className="col-6 mb-0">Contiguity</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={0}
                            max={100}
                            tipFormatter={value => `${value}%`}
                        ></TooltipSlider>
                    </Form.Group>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return { selectedState: state.stateReducer.selectedState };
}

export const PhaseOneTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseOneTabPanelComponent);
