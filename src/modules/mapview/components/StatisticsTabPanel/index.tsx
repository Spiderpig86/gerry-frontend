import * as React from 'react';

import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { StateEnum, ICluster } from '../../../../models';
import { Placeholder } from '../../../../global_components';
import { Button } from 'react-bootstrap';

import './styles.scss';
import * as Redistricting from './redistricting.json';

interface StatisticsTabPanelProps {
    selectedState: StateEnum;
    stateData: ICluster;
}

export class StatisticsTabPanel extends React.PureComponent<StatisticsTabPanelProps, {}> {

    render() {
        if (this.props.selectedState === StateEnum.NOT_SET) {
            return <Placeholder loading={false} title="No state selected." subtitle="Select a state to view all district data."></Placeholder>;
        }

        if (!this.props.stateData) {
            return <Placeholder loading={true} title="" subtitle=""></Placeholder>;
        }

        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>State Statistics</h4>
                <p>Total Population: {this.props.stateData.demographicData.totalPopulation.toLocaleString()}</p>
                <StatisticsAccordionComponent demographicData={this.props.stateData.demographicData} electionData={this.props.stateData.electionData} />
                <br/>

                <h5>Redistricting Guidelines</h5>
                <div className='redistrict' dangerouslySetInnerHTML={{__html: unescape(Redistricting[this.props.selectedState].html)}} />
                <a href={Redistricting[this.props.selectedState].link} target='_blank'>
                    <Button className='mb-3'>More Info</Button>
                </a>
            </div>
        );
    }
}