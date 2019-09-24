import * as React from 'react';

import { Row, Dropdown, DropdownButton, Button, Form } from 'react-bootstrap'
import Slider, { createSliderWithTooltip, Handle, Range } from 'rc-slider';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipRange = createSliderWithTooltip(Range);
const TooltipSlider = createSliderWithTooltip(Slider);

export class InputTabPanel extends React.Component {

    render() {
        return (
            <div className="px-4" style={{overflow: 'auto', maxHeight: '75vh'}}>
                <div className="py-3">
                    <h3>State Selection</h3>
                    <DropdownButton id="dropdown-basic-button" title="Select State">
                        <Dropdown.Item onClick={() => {}}>California</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Utah</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Virginia</Dropdown.Item>
                    </DropdownButton>
                </div>

                <h3>Algorithm Options</h3>
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

                <h3>District Properties</h3>

                <div className="mb-3">
                    <h5>Minority Group Thresholds</h5>

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
                    <h3>Parameters</h3>
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