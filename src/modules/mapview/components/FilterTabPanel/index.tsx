import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Constants from '../../../../config/constants';

interface IFilterProps {
    filter: string;
    setMapFilter: (filter: string) => void;
}

class FilterTabPanelComponent extends React.Component<IFilterProps, {}> {

    render() {
        return (
            <div className='px-4 py-3'>
                <h4>Map Filter</h4>
                <h6>Display Election Data</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked name='population' custom type={'radio'} id={`electionPres16`} label={`2016 Presidential Election`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_PRES_2016)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionHouse16`} label={`2016 House Election`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_CONGRESS_2016)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionHouse18`} label={`2018 House Election`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_CONGRESS_2018)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`congressionalDistricts`} label={`Congressional Districts`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_DISTRICTS)} />
                </Form.Group>

                <br />

                <h6>Display Minority Population Density</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`whiteDensity`} label={`Non-Hispanic White Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_WHITE_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`hispanicDensity`} label={`Hispanic Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_HISPANIC_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`blackDensity`} label={`Non-Hispanic African American Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_BLACK_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`asianDensity`} label={`Non-Hispanic Asian Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_ASIAN_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`nativeAmericanDensity`} label={`Non-Hispanic Native American Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_NATIVE_AMERICAN_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`pacificIslanderDensity`} label={`Non-Hispanic Pacific Islander Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_PACIFIC_ISLANDER_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`otherDensity`} label={`Other Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_OTHER_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`biracialDensity`} label={`Biracial Density`} onClick={() => this.props.setMapFilter(Constants.MAP_FILTER_BIRACIAL_DENSITY)} />
                </Form.Group>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        filter: state.stateReducer.filter
    }
}

export const FilterTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(FilterTabPanelComponent);