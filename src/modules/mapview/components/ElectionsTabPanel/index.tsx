import * as React from 'react';

import { round } from '../../../../libs/round';
import { IVoteData } from '../../../../models';

import { Placeholder } from '../../../../global_components';

export interface IElectionsTabProps {
    election2016: IElectionTypes;
    election2018: IElectionTypes;
}

export interface IElectionTypes {
    presidentialResults?: IVoteData;
    senatorialResults?: IVoteData;
    houseResults?: IVoteData;
}

export class ElectionsTabPanel extends React.PureComponent<IElectionsTabProps, {}> {
    render() {
        if (!this.props.election2016 || !this.props.election2018) {
            return <Placeholder></Placeholder>;
        }
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br/>
                <h4>2016 Election</h4>
                <p><b>Presidential</b></p>
                <p>Democratic Votes: { round(this.props.election2016.presidentialResults.democraticVotes) }</p>
                <p>Republican Votes: { round(this.props.election2016.presidentialResults.republicanVotes) }</p>
                <p>Other Votes: { round(this.props.election2016.presidentialResults.otherVotes) || 0 }</p>
                <br/>
                <p><b>Senatorial</b></p>
                <p>Democratic Votes: { round(this.props.election2016.senatorialResults.democraticVotes) }</p>
                <p>Republican Votes: { round(this.props.election2016.senatorialResults.republicanVotes) }</p>
                <p>Other Votes: { round(this.props.election2016.senatorialResults.otherVotes) }</p>
                <br/>
                <p><b>House</b></p>
                <p>Democratic Votes: { round(this.props.election2016.houseResults.democraticVotes) }</p>
                <p>Republican Votes: { round(this.props.election2016.houseResults.republicanVotes) }</p>
                <p>Other Votes: { round(this.props.election2016.houseResults.otherVotes) || 'N/A'  }</p>
                <br/>
                <br/>
                <h4>2018 Election</h4>
                <p><b>Senatorial</b></p>
                <p>Democratic Votes: { round(this.props.election2018.senatorialResults.democraticVotes) }</p>
                <p>Republican Votes: { round(this.props.election2018.senatorialResults.republicanVotes) }</p>
                <p>Other Votes: { round(this.props.election2018.senatorialResults.otherVotes) }</p>
                <br/>
                <p><b>House</b></p>
                <p>Democratic Votes: { round(this.props.election2018.houseResults.democraticVotes) }</p>
                <p>Republican Votes: { round(this.props.election2018.houseResults.republicanVotes) }</p>
                <p>Other Votes: { round(this.props.election2018.houseResults.otherVotes) }</p>
            </div>
        )
    }
}