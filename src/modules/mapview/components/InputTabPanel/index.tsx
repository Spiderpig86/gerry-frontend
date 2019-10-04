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
            <div className="px-4" style={{overflow: 'auto', height: '100%'}}>
                <div className="py-3">
                    <h4>Phase 0</h4>
                    <h6>State Selection</h6>
                    <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
                        <Dropdown.Item onClick={() => this.props.setSelectedState('CA')}>California</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.props.setSelectedState('UT')}>Utah</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.props.setSelectedState('VA')}>Virginia</Dropdown.Item>
                    </DropdownButton>
                    
                </div>

                <div className="py-3">
                    <h6>Demographic Bloc Voting Threshold</h6>
                    <p className="alert alert-info">First, select the minimum percentage of a demographic must be populated in percinct to be considered.</p>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                    <DropdownButton className={'col-6'} id="dropdown-basic-button" title={'Bloc Demographic'}>
                        <Dropdown.Item onClick={() => {}}>White</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>African American</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Hispanic</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Asian</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Native American</Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}>Pacific Islander</Dropdown.Item>
                    </DropdownButton>
                    <TooltipSlider 
                        className={'col-6'}
                        defaultValue={0}
                        tipFormatter={value => `${value}%`}
                    />
                    </Form.Group>
                </div>

            <div className="py-3">
                <p className="alert alert-info">Then, select the threshold for the minimum winning party percentage for the selected election to see if the demographic voted en masse for the winning party.</p>
                <Form.Group className="row form-group d-flex align-items-center py-2">
                    <Form.Label className={'col-4'} for={''}>Winning Party:</Form.Label>
                    <TooltipSlider
                        className={'col-8'} 
                        defaultValue={0}
                        tipFormatter={value => `${value}%`}
                    />
                </Form.Group>
            </div>

                <br />

                <h4>Algorithm Options</h4>
                <div className="mb-4">
                    {
                        ['PolsbyPopper', 'Schwartzberg'].map((e: any, i : number) => {
                            return (
                                <Form.Group key={`algoGroup${i}`} className="w-100 py-2 row form-group d-flex align-items-center">
                                    <Form.Check name='algorithm' key={`algoOption${i}`} custom type={'radio'} id={`algoOption${i}`} label={`${e}`} />
                                </Form.Group>
                            )
                        })
                    }
                </div>

                <h4>District Properties</h4>

                <div className="mb-4">
                    <h6>Majority Minority District Threshold</h6>
                    <p className="alert alert-info">The minimum is to prevent cracking (low thresholds will dilute voters). The maximum is to prevent packing. Select the demographics you want to consider collectively as minorities.</p>
                    <Form.Group className="w-100 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'majorityMinoritySlider'} label={'Min/Max Minority Percentage of Population'} />
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
                        <Form.Check custom className={'col-12'} type={'checkbox'} id={'minorityGroupCheckAfrican'} label={'African Americans'} />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-12'} type={'checkbox'} id={'minorityGroupCheckAsian'} label={'Asians'} />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-12'} type={'checkbox'} id={'minorityGroupCheckPacific'} label={'Pacific Islanders'} />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-12'} type={'checkbox'} id={'minorityGroupCheckHispanic'} label={'Hispanics'} />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-12'} type={'checkbox'} id={'minorityGroupCheckNHWhite'} label={'Non-Hispanic Whites'} />
                    </Form.Group>
                    <Form.Group className="ml-5 row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-12'} type={'checkbox'} id={'minorityGroupOther'} label={'Other'} />
                    </Form.Group>

                    <h6 className='mt-3'>Voter Cohesiveness</h6>
                    <p className='alert alert-info'>Set the threshold to consider when a demographic is voting for a specific party. Set minimum threshold for each ethnic group that vote for the same party.</p>

                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'cohesiveGroupWhite'} label={'White'} />
                        <TooltipSlider 
                            className={'col-6'}
                            defaultValue={0}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'cohesiveGroupCheckAfrican'} label={'African Americans'} />
                        <TooltipSlider 
                            className={'col-6'}
                            defaultValue={0}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'cohesiveGroupCheckAsian'} label={'Asians'} />
                        <TooltipSlider 
                            className={'col-6'}
                            defaultValue={0}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'cohesiveGroupCheckPacific'} label={'Pacific Islanders'} />
                        <TooltipSlider 
                            className={'col-6'}
                            defaultValue={0}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'cohesiveGroupCheckHispanic'} label={'Hispanics'} />
                        <TooltipSlider 
                            className={'col-6'}
                            defaultValue={0}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Check custom className={'col-6'} type={'checkbox'} id={'cohesiveGroupCheckNHWhite'} label={'Non-Hispanic Whites'} />
                        <TooltipSlider 
                            className={'col-6'}
                            defaultValue={0}
                            tipFormatter={value => `${value}%`}
                        />
                    </Form.Group>
                </div>

                <div className="mb-4">
                    <h4>Parameters</h4>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Population Equality</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={0}
                            max={100}
                            tipFormatter={value => `${value}%`}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Compactness</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={0}
                            max={100}
                            tipFormatter={value => `${value}%`}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Partisan Fairness</Form.Label>
                        <TooltipSlider
                            className={'col-6'}
                            defaultValue={0}
                            min={0}
                            max={100}
                            tipFormatter={value => `${value}%`}
                        ></TooltipSlider>
                    </Form.Group>
                    <Form.Group className="row form-group d-flex align-items-center py-2">
                        <Form.Label className='col-6'>Contiguity</Form.Label>
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

export const InputTabPanel = connect(
    (state: any) => {
        return ({ selectedState: state.stateReducer.selectedState });
    },
    (dispatch) => bindActionCreators(mapActionCreators, dispatch)
)(InputTabPanelComponent);