import * as React from 'react';
import { IDemographics } from '../../../../models';

export interface IDemographicsTabProps {
    hispanicDemographics: IDemographics;
    nonHispanicDemographics: IDemographics;
}

export class DemographicsTabPanel extends React.PureComponent<IDemographicsTabProps, {}> {
    render() {
        return (
            <div style={{ maxHeight: '80vh', overflow: 'auto', padding: '0 1.5rem' }}>
                <br />
                <h4>Demographics</h4>
                <p>Non-Hispanic White: {Math.round(this.props.nonHispanicDemographics.White)}</p>
                <p>Non-Hispanic African Americans: {Math.round(this.props.nonHispanicDemographics.AfricanAmerican)}</p>
                <p>Non-Hispanic Native Americans: {Math.round(this.props.nonHispanicDemographics.NativeAmericans)}</p>
                <p>Non-Hispanic Asian: {Math.round(this.props.nonHispanicDemographics.Asian)}</p>
                <p>Non-Hispanic Pacific Islander: {Math.round(this.props.nonHispanicDemographics.PacificIslander)}</p>
                <p>Non-Hispanic Other: {Math.round(this.props.nonHispanicDemographics.Other)}</p>
                <p>Non-Hispanic Biracial: {Math.round(this.props.nonHispanicDemographics.Biracial)}</p>
                <br />
                <p>Hispanic: {Math.round(this.props.hispanicDemographics.Hispanic)}</p>
                <p>Hispanic White: {Math.round(this.props.hispanicDemographics.White)}</p>
                <p>Hispanic African Americans: {Math.round(this.props.hispanicDemographics.AfricanAmerican)}</p>
                <p>Hispanic Native Americans: {Math.round(this.props.hispanicDemographics.NativeAmericans)}</p>
                <p>Hispanic Asian: {Math.round(this.props.hispanicDemographics.Asian)}</p>
                <p>Hispanic Pacific Islander: {Math.round(this.props.hispanicDemographics.PacificIslander)}</p>
                <p>Hispanic Other: {Math.round(this.props.hispanicDemographics.Other)}</p>
                <p>Hispanic Biracial: {Math.round(this.props.hispanicDemographics.Biracial)}</p>
            </div>
        )
    }
}