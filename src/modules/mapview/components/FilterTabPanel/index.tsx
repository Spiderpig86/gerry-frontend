import * as React from 'react';

import { Form } from 'react-bootstrap';

export class FilterTabPanel extends React.Component {

    render() {
        return (
            <div className='px-4 py-3'>
                <h4>Map Filter</h4>
                <h6>Display Minority Population Density</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`whiteDensity`} label={`Non-Hispanic White Density`} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`hispanicDensity`} label={`Hispanic`} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`blackDensity`} label={`Non-Hispanic African American Density`} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`asianDensity`} label={`Non-Hispanic Asian Density`} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`nativeAmericanDensity`} label={`Non-Hispanic Native American Density`} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`pacificIslanderDensity`} label={`Non-Hispanic Pacific Islander Density`} />
                </Form.Group>

                <br />
                <h6>Display Election Data</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionPres16`} label={`2016 Presidential Election`} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionHouse16`} label={`2016 House Election`} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionHouse18`} label={`2018 House Election`} />
                </Form.Group>
            </div>
        )
    }
}