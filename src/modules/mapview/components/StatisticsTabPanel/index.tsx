import * as React from 'react';

import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { StateEnum, ICluster } from '../../../../models';
import { Placeholder } from '../../../../global_components';

import './styles.scss';

interface StatisticsTabPanelProps {
    selectedState: StateEnum;
    stateData: ICluster;
}

export class StatisticsTabPanel extends React.PureComponent<StatisticsTabPanelProps, {}> {

    render() {
        if (this.props.selectedState === StateEnum.NOT_SET) {
            return <Placeholder title="No state selected." subtitle="Select a state to view all district data."></Placeholder>;
        }

        if (!this.props.stateData) {
            return <Placeholder title="Loading..." subtitle="Loading state data."></Placeholder>;
        }

        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>State Statistics</h4>
                <p>Total Population: {this.props.stateData.demographicData.totalPopulation.toLocaleString()}</p>
                <StatisticsAccordionComponent demographicData={this.props.stateData.demographicData} electionData={this.props.stateData.electionData} />

                <br/>
            </div>
        );
    }
}