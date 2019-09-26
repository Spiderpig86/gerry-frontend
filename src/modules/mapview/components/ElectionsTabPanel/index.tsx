import * as React from 'react';

import { Placeholder } from '../../../../global_components';

export interface IElectionsTabProps {
    presidentialResults: IVoteData;
    senatorialResults: IVoteData;
    gubernatorialResults?: IVoteData;
}

export interface IVoteData {
    republicanVotes: number;
    democraticVotes: number;
    independentVotes?: number;
}

export class ElectionsTabPanel extends React.PureComponent<IElectionsTabProps, {}> {
    render() {
        if (!this.props.presidentialResults || !this.props.senatorialResults || !this.props.gubernatorialResults) {
            return <Placeholder></Placeholder>;
        }
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br/>
                <h4>2016 Election</h4>
                <p><b>Presidential</b></p>
                <p>Democratic Votes: { this.props.presidentialResults.democraticVotes }</p>
                <p>Republican Votes: { this.props.presidentialResults.republicanVotes }</p>
                <p>Independent Votes: { this.props.presidentialResults.independentVotes }</p>
                <br/>
                <p><b>Senatorial</b></p>
                <p>Democratic Votes: { this.props.senatorialResults.democraticVotes }</p>
                <p>Republican Votes: { this.props.senatorialResults.republicanVotes }</p>
                <br/>
                <p><b>Gubernatorial</b></p>
                <p>Democratic Votes: { this.props.gubernatorialResults.democraticVotes }</p>
                <p>Republican Votes: { this.props.gubernatorialResults.republicanVotes }</p>
            </div>
        )
    }
}