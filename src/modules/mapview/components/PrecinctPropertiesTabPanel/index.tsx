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
            <>
                <h4>Precinct Properties</h4>
                <br />
                <p><b>Precinct Name:</b></p>
                <p><b>Sub-precinct Number:</b></p>
                <p><b>Municipality Name:</b></p>
                <p><b>County Name:</b></p>
                <p><b>Jurisdiction Name:</b></p>
                <p><b>Congressional District ID:</b></p>
            </>
        )
    }
}