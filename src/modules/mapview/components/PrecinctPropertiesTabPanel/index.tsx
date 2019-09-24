import * as React from 'react';

export interface IPrecinctPropertiesTabProps {
    precinctName?: string;
    subPrecinctNumber?: number;
    municipalityName?: string;
    countyName?: string;
    jurisdictionName?: string;
    congressionalDistrictId?: string;

}

export class PrecinctPropertiesTabPanel extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Precinct Properties</h4>
                <p>Precinct Name:</p>
                <p>Sub-precinct Number:</p>
                <p>Municipality Name:</p>
                <p>County Name:</p>
                <p>Jurisdiction Name:</p>
                <p>Congressional District ID:</p>
            </div>
        )
    }
}