import * as React from 'react';
import { IDemographics } from '../../../../models';

export interface IDemographicsTabProps {
    hispanicDemographics: IDemographics;
    nonHispanicDemographics: IDemographics;
}

export class DemographicsTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <>
                <h4>Demographics</h4>
                <br />
                <p><b>Non-Hispanic White:</b></p>
                <p><b>Non-Hispanic African Americans:</b></p>
                <p><b>Non-Hispanic Native Americans:</b></p>
                <p><b>Non-Hispanic Asian:</b></p>
                <p><b>Non-Hispanic Pacific Islander:</b></p>
                <p><b>Non-Hispanic Other:</b></p>
                <p><b>Non-Hispanic Biracial:</b></p>
                <br />
                <p><b>Hispanic:</b></p>
                <p><b>Hispanic White:</b></p>
                <p><b>Hispanic African Americans:</b></p>
                <p><b>Hispanic Native Americans:</b></p>
                <p><b>Hispanic Asian:</b></p>
                <p><b>Hispanic Pacific Islander:</b></p>
                <p><b>Hispanic Other:</b></p>
                <p><b>Hispanic Biracial:</b></p>
            </>
        )
    }
}