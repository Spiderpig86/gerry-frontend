import * as React from 'react';
import * as Constants from '../../../../config/constants';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MapFilterEnum, ViewLevelEnum, FilterArgs } from '../../../../models';

interface IFilterProps {
    filterArgs: FilterArgs;
    setMapFilterCreator: (filter: string) => void;
    setMapLevelCreator: (level: string) => void;
}

class FilterTabPanelComponent extends React.Component<IFilterProps, {}> {

    render() {
        return (
            <div className='px-4 py-3'>
                <h4>Display Level</h4>
                <Form className='mb-3'>
                    <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                        <Form.Check defaultChecked={this.props.filterArgs.viewLevel === ViewLevelEnum.PRECINCTS} name='displayLevel' custom type={'radio'} id={`displayLevelPrecinct`} label={`Precincts`} onClick={() => this.props.setMapLevelCreator(ViewLevelEnum.PRECINCTS)} />
                    </Form.Group>
                    <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                        <Form.Check defaultChecked={this.props.filterArgs.viewLevel === ViewLevelEnum.OLD_DISTRICTS} name='displayLevel' custom type={'radio'} id={`displayLevelOldCd`} label={`Old Congressional Districts`} onClick={() => this.props.setMapLevelCreator(ViewLevelEnum.OLD_DISTRICTS)} />
                    </Form.Group>
                    <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                        <Form.Check defaultChecked={this.props.filterArgs.viewLevel === ViewLevelEnum.NEW_DISTRICTS} name='displayLevel' custom type={'radio'} id={`displayLevelNewCd`} label={`New Congressional Districts`} onClick={() => this.props.setMapLevelCreator(ViewLevelEnum.NEW_DISTRICTS)} />
                    </Form.Group>
                </Form>
                
                <h4>Display Filters</h4>
                <h6>Display Misc.</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.DEFAULT} name='population' custom type={'radio'} id={`displayDefault`} label={`Default Filter`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.DEFAULT)} />
                </Form.Group>
                <br />

                <h6>Display Election Data</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.PRES_2016} name='population' custom type={'radio'} id={`electionPres16`} label={`2016 Presidential Election`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.PRES_2016)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.HOUSE_2016} name='population' custom type={'radio'} id={`electionHouse16`} label={`2016 House Election`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.HOUSE_2016)} />
                </Form.Group>
                {/* <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.SENATE_2016} name='population' custom type={'radio'} id={`electionSenate16`} label={`2016 Senate Election`} onClick={() => this.props.setMapFilter(MapFilterEnum.SENATE_2016)} />
                </Form.Group> */}
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.HOUSE_2018} name='population' custom type={'radio'} id={`electionHouse18`} label={`2018 House Election`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.HOUSE_2018)} />
                </Form.Group>
                {/* <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.SENATE_2018} name='population' custom type={'radio'} id={`electionSenate18`} label={`2018 Senate Election`} onClick={() => this.props.setMapFilter(MapFilterEnum.SENATE_2018)} />
                </Form.Group> */}
                <br />

                <h6>Display Minority Population Density</h6>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.WHITE_DENSITY} name='population' custom type={'radio'} id={`whiteDensity`} label={`Non-Hispanic White Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.WHITE_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.HISPANIC_DENSITY} name='population' custom type={'radio'} id={`hispanicDensity`} label={`Hispanic Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.HISPANIC_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.BLACK_DENSITY} name='population' custom type={'radio'} id={`blackDensity`} label={`Non-Hispanic African American Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.BLACK_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.ASIAN_DENSITY} name='population' custom type={'radio'} id={`asianDensity`} label={`Non-Hispanic Asian Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.ASIAN_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.NATIVE_AMERICAN_DENSITY} name='population' custom type={'radio'} id={`nativeAmericanDensity`} label={`Non-Hispanic Native American Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.NATIVE_AMERICAN_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.PACIFIC_ISLANDER_DENSITY} name='population' custom type={'radio'} id={`pacificIslanderDensity`} label={`Non-Hispanic Pacific Islander Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.PACIFIC_ISLANDER_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.OTHER_DENSITY} name='population' custom type={'radio'} id={`otherDensity`} label={`Other Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.OTHER_DENSITY)} />
                </Form.Group>
                <Form.Group className="w-100 py-2 row form-group d-flex align-items-center">
                    <Form.Check defaultChecked={this.props.filterArgs.mapFilter === MapFilterEnum.BIRACIAL_DENSITY} name='population' custom type={'radio'} id={`biracialDensity`} label={`Multiracial Density`} onClick={() => this.props.setMapFilterCreator(MapFilterEnum.BIRACIAL_DENSITY)} />
                </Form.Group>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        filterArgs: state.stateReducer.filterArgs,
        setMapFilterCreator: state.stateReducer.setMapFilterCreator,
        setMapLevelCreator: state.stateReducer.setMapLevelCreator
    }
}

export const FilterTabPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(FilterTabPanelComponent);