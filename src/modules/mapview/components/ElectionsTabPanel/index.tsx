import * as React from 'react';

export interface IElectionsTabProps {
    presidentialResults: IVoteData;
    senatorialResults: IVoteData;
    gubernatorialResults: IVoteData;
}

export interface IVoteData {
    democraticVotes: number;
    republicanVotes: number;
    independentVotes: number;
}

export class ElectionsTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <>
                <h4>2016 Election</h4>
                <br/>
                <p><b>Presidential</b></p>
                <p>Democratic Votes:</p>
                <p>Republican Votes:</p>
                <p>Independent Votes:</p>
                <br/>
                <p><b>Senatorial</b></p>
                <p>Democratic Votes:</p>
                <p>Republican Votes:</p>
                <p>Independent Votes:</p>
                <br/>
                <p><b>Gubernatorial</b></p>
                <p>Democratic Votes:</p>
                <p>Republican Votes:</p>
                <p>Independent Votes:</p>
            </>
        )
    }
}