import * as React from 'react';

import { Row, Dropdown, DropdownButton, Button, Form } from 'react-bootstrap'
import { createSliderWithTooltip, Handle, Range } from 'rc-slider';

import '../../../../styles/slider.scss';
import '../../../../styles/tooltip.scss';

const TooltipRange = createSliderWithTooltip(Range);

export class InputTabPanel extends React.Component {

    render() {
        return (
            <>
                <Row className='flex-column'>
                    <div className="py-5">
                        <h3>State Selection</h3>
                        <DropdownButton id="dropdown-basic-button" title="Select State">
                            <Dropdown.Item onClick={() => {}}>California</Dropdown.Item>
                            <Dropdown.Item onClick={() => {}}>Utah</Dropdown.Item>
                            <Dropdown.Item onClick={() => {}}>Virginia</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <h3>District Properties</h3>

                    <div className="py-3">
                        <h5>Minority Group Thresholds</h5>

                        <Row className="my-3">
                            <Form.Group className="w-100 row form-group d-flex align-items-center">
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
                        </Row>
                        <Row className="my-3">
                            <Form.Group className="w-100 row form-group d-flex align-items-center">
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
                        </Row>
                        <Row className="my-3">
                            <Form.Group className="w-100 row form-group d-flex align-items-center">
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
                        </Row>
                        <Row className="my-3">
                            <Form.Group className="w-100 row form-group d-flex align-items-center">
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
                        </Row>
                        <Row className="my-3">
                            <Form.Group className="w-100 row form-group d-flex align-items-center">
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
                        </Row>
                    </div>
                </Row>
            </>
        );
    }
}