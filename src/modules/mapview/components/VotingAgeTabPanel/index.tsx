import * as React from 'react';
import { IDemographics } from '../../../../models';

export interface IVotingAgeTabProps {
    votingAgeDemographics: IDemographics;
}

export class VotingAgeTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <>
                <h4>Voting Age</h4>
                <br />
                <p><b>Voting Age White:</b></p>
                <p><b>Voting Age African Americans:</b></p>
                <p><b>Voting Age Native Americans:</b></p>
                <p><b>Voting Age Asian:</b></p>
                <p><b>Voting Age Pacific Islander:</b></p>
                <p><b>Voting Age Other:</b></p>
                <p><b>Voting Age Biracial:</b></p>
            </>
        )
    }
}