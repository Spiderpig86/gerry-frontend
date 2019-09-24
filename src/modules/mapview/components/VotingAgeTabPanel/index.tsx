import * as React from 'react';
import { IDemographics } from '../../../../models';

export interface IVotingAgeTabProps {
    votingAgeDemographics: IDemographics;
}

export class VotingAgeTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Voting Age</h4>
                <p>Voting Age White:</p>
                <p>Voting Age African Americans:</p>
                <p>Voting Age Native Americans:</p>
                <p>Voting Age Asian:</p>
                <p>Voting Age Pacific Islander:</p>
                <p>Voting Age Other:</p>
                <p>Voting Age Biracial:</p>
            </div>
        )
    }
}