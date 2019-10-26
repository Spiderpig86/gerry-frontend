import * as React from 'react';
import * as Constants from '../../../../config/constants';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MapFilterEnum, ViewLevelEnum } from '../../../../models';

interface IFilterProps {
    filter: string;
    setMapFilter: (filter: string) => void;
    setMapLevel: (level: string) => void;
}

class FilterTabPanelComponent extends React.Component<IFilterProps, {}> {

    render() {
        return (
            <div className='px-4 py-3'>
                <h4>Map Filter</h4>
                <h5>Display Level</h5>
                <Form className='mb-3'>
                    <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                        <Form.Check defaultChecked name='displayLevel' custom type={'radio'} id={`displayLevelPrecinct`} label={`Precincts`} onClick={() => this.props.setMapLevel(ViewLevelEnum.PRECINCTS)} />
                    </Form.Group>
                    <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                        <Form.Check name='displayLevel' custom type={'radio'} id={`displayLevelOldCd`} label={`Old Congressional Districts`} onClick={() => this.props.setMapLevel(ViewLevelEnum.OLD_DISTRICTS)} />
                    </Form.Group>
                    <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                        <Form.Check name='displayLevel' custom type={'radio'} id={`displayLevelNewCd`} label={`New Congressional Districts`} onClick={() => this.props.setMapLevel(ViewLevelEnum.NEW_DISTRICTS)} />
                    </Form.Group>
                </Form>
                
                <h6>Display Misc.</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked name='population' custom type={'radio'} id={`displayDefault`} label={`Default Filter`} onClick={() => this.props.setMapFilter(MapFilterEnum.DEFAULT)} />
                </Form.Group>
                <br />

                <h6>Display Election Data</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionPres16`} label={`2016 Presidential Election`} onClick={() => this.props.setMapFilter(MapFilterEnum.PRES_2016)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionHouse16`} label={`2016 House Election`} onClick={() => this.props.setMapFilter(MapFilterEnum.HOUSE_2016)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionSenate16`} label={`2016 Senate Election`} onClick={() => this.props.setMapFilter(MapFilterEnum.SENATE_2016)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionHouse18`} label={`2018 House Election`} onClick={() => this.props.setMapFilter(MapFilterEnum.HOUSE_2018)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`electionSenate18`} label={`2018 Senate Election`} onClick={() => this.props.setMapFilter(MapFilterEnum.SENATE_2018)} />
                </Form.Group>
                <br />

                <h6>Display Minority Population Density</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`whiteDensity`} label={`Non-Hispanic White Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.WHITE_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`hispanicDensity`} label={`Hispanic Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.HISPANIC_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`blackDensity`} label={`Non-Hispanic African American Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.BLACK_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`asianDensity`} label={`Non-Hispanic Asian Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.ASIAN_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`nativeAmericanDensity`} label={`Non-Hispanic Native American Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.NATIVE_AMERICAN_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`pacificIslanderDensity`} label={`Non-Hispanic Pacific Islander Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.PACIFIC_ISLANDER_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`otherDensity`} label={`Other Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.OTHER_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check name='population' custom type={'radio'} id={`biracialDensity`} label={`Biracial Density`} onClick={() => this.props.setMapFilter(MapFilterEnum.BIRACIAL_DENSITY)} />
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