import * as React from 'react';
import { IDemographics } from '../../../../models';

export interface IVotingAgeTabProps {
    votingAgeDemographics: IDemographics;
}

export class VotingAgeTabPanel extends React.PureComponent<IVotingAgeTabProps, {}> {
    render() {
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Voting Age</h4>
                <p>Voting Age White: {Math.round(this.props.votingAgeDemographics.White)}</p>
                <p>Voting Age African Americans: {Math.round(this.props.votingAgeDemographics.AfricanAmerican)}</p>
                <p>Voting Age Native Americans: {Math.round(this.props.votingAgeDemographics.NativeAmericans)}</p>
                <p>Voting Age Asian: {Math.round(this.props.votingAgeDemographics.Asian)}</p>
                <p>Voting Age Pacific Islander: {Math.round(this.props.votingAgeDemographics.PacificIslander)}</p>
                <p>Voting Age Other: {Math.round(this.props.votingAgeDemographics.Other)}</p>
                <p>Voting Age Biracial: {Math.round(this.props.votingAgeDemographics.Biracial)}</p>
            </div>
        )
    }
}