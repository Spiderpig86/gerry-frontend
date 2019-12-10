import * as React from 'react';

import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { StateEnum } from '../../../../models';
import { Placeholder } from '../../../../global_components';

import './styles.scss';

interface StatisticsTabPanelProps {
    selectedState: StateEnum;
}

export class StatisticsTabPanel extends React.PureComponent<StatisticsTabPanelProps, {}> {

    render() {
        if (this.props.selectedState === StateEnum.NOT_SET) {
            return <Placeholder title="No state selected." subtitle="Select a state to view all district data."></Placeholder>;
        }
        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>State Statistics</h4>
                <p>Total Population: {(Math.round(Math.random() * 10000) + 1000000).toLocaleString()}</p>
                <StatisticsAccordionComponent />

                <br/>
            </div>
        );
    }
}