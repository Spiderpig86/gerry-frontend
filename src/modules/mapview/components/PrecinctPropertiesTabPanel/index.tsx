import * as React from 'react';

import { Placeholder } from '../../../../global_components';

export interface IPrecinctPropertiesTabProps {
    precinctName?: string;
    subPrecinctNumber?: number;
    municipalityName?: string;
    countyName?: string;
    countyId?: string;
    countyFips?: string;
    jurisdictionName?: string;
    congressionalDistrictId?: string;
}

export class PrecinctPropertiesTabPanel extends React.PureComponent<IPrecinctPropertiesTabProps, {}> {
    render() {
        if (!this.props) {
            return <Placeholder></Placeholder>;
        }
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>Precinct Properties</h4>
                <p>Precinct Name: {this.props.precinctName || 'N/A'}</p>
                <p>Sub-precinct Number: {this.props.subPrecinctNumber || 'N/A'}</p>
                <p>Municipality Name: {this.props.municipalityName || 'N/A'}</p>
                <p>County Name: {this.props.countyName || 'N/A'}</p>
                <p>Jurisdiction Name: {this.props.jurisdictionName || 'N/A'}</p>
                <p>Congressional District ID: {this.props.congressionalDistrictId || 'N/A'}</p>
            </div>
        )
    }
}