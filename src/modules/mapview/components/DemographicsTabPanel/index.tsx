import * as React from 'react';
import { IDemographics } from '../../../../models';

export interface IDemographicsTabProps {
    hispanicDemographics: IDemographics;
    nonHispanicDemographics: IDemographics;
}

export class DemographicsTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div style={{ maxHeight: '80vh', overflow: 'auto', padding: '0 1.5rem' }}>
                <br />
                <h4>Demographics</h4>
                <p>Non-Hispanic White:</p>
                <p>Non-Hispanic African Americans:</p>
                <p>Non-Hispanic Native Americans:</p>
                <p>Non-Hispanic Asian:</p>
                <p>Non-Hispanic Pacific Islander:</p>
                <p>Non-Hispanic Other:</p>
                <p>Non-Hispanic Biracial:</p>
                <br />
                <p>Hispanic:</p>
                <p>Hispanic White:</p>
                <p>Hispanic African Americans:</p>
                <p>Hispanic Native Americans:</p>
                <p>Hispanic Asian:</p>
                <p>Hispanic Pacific Islander:</p>
                <p>Hispanic Other:</p>
                <p>Hispanic Biracial:</p>
            </div>
        )
    }
}