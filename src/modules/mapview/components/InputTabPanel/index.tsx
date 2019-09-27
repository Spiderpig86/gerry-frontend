import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Dropdown, DropdownButton, Button, Form } from 'react-bootstrap';
import Slider, { createSliderWithTooltip, Handle, Range } from 'rc-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipRange = createSliderWithTooltip(Range);
const TooltipSlider = createSliderWithTooltip(Slider);


interface IInputTabPanelProps {
    selectedState: string;
    setSelectedState: (state: string) => void;
}

export class InputTabPanelComponent extends React.Component<IInputTabPanelProps, {}> {

    render() {
        const dropdownTitle = `Selected State: ${ this.props.selectedState }`;
        return (
            <div className="px-4" style={{overflow: 'auto', maxHeight: '80vh'}}>
                <div className="py-3">
                    <h4>State Selection</h4>
                    <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
                        <Dropdown.Item onClick={() => this.props.setSelectedState('CA')}>California</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.props.setSelectedState('UT')}>Utah</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.props.setSelectedState('VA')}>Virginia</Dropdown.Item>
                    </DropdownButton>
                </div>

                <br />

                <h4>Algorithm Options</h4>
                <div className="mb-5">
                    {
                        Array.from(Array(5).keys()).map((e: any, i : number) => {
                            return (
                                <Form.Group key={`algoGroup${i}`} className="w-100 py-2 row form-group d-flex align-items-center">
                                    <Form.Check name='algorithm' key={`algoOption${i}`} custom type={'radio'} id={`algoOption${i}`} label={`Option ${i}`} />
                                </Form.Group>
                            )
                        })
                    }
                </div>

                <h4>District Properties</h4>

                <div className="mb-3">
                    <h6>Minority Group Thresholds</h6>

                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'minorityGroupCheckAfrican'} label={'African Americans'} />
                        <TooltipRange 
                            className={'col-6'}
                            count={1}
                            allowCross={false}
                            pushable={false}
                            defaultValue={[0, 0]}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'minorityGroupCheckAsian'} label={'Asians'} />
                        <TooltipRange 
                            className={'col-6'}
                            count={1}
                            allowCross={false}
                            pushable={false}
                            defaultValue={[0, 0]}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'minorityGroupCheckPacific'} label={'Pacific Islanders'} />
                        <TooltipRange 
                            className={'col-6'}
                            count={1}
                            allowCross={false}
                            pushable={false}
                            defaultValue={[0, 0]}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'minorityGroupCheckHispanic'} label={'Hispanics'} />
                        <TooltipRange 
                            className={'col-6'}
                            count={1}
                            allowCross={false}
                            pushable={false}
                            defaultValue={[0, 0]}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'minorityGroupCheckNHWhite'} label={'Non-Hispanic Whites'} />
                        <TooltipRange 
                            className={'col-6'}
                            count={1}
                            allowCross={false}
                            pushable={false}
                            defaultValue={[0, 0]}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                </div>

                <div className="mb-3">
                    <h4>Parameters</h4>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Population Equality</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={-100}
                            max={100}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Compactness</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={-100}
                            max={100}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Partisan Fairness</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={-100}
                            max={100}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Contiguity</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={-100}
                            max={100}
                        ></TooltipSlider>
                    </Form.Group>
                </div>

            </div>
        );
    }
}

export const InputTabPanel = connect(
    (state: any) => {
        return ({ selectedState: state.stateReducer.selectedState });
    },
    (dispatch) => bindActionCreators(mapActionCreators, dispatch)
)(InputTabPanelComponent);