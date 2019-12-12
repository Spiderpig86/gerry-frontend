import * as React from 'react';

import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { Card } from 'react-bootstrap';
import { StateEnum, ICluster } from '../../../../models';
import { Placeholder } from '../../../../global_components';

interface DistrictTabPanelProps {
    selectedState: StateEnum;
    oldClusters: Map<string, ICluster>;
}

interface DistrictTabPanelState {
    sortedKeys: string[];
    selectedOldDistrictId: string;
    oldDistrictData: ICluster;
}

export class DistrictTabPanel extends React.PureComponent<DistrictTabPanelProps, DistrictTabPanelState> {

    state = {
        sortedKeys: null,
        selectedOldDistrictId: '',
        oldDistrictData: null
    };

    componentWillMount() {
        if (this.props.oldClusters) {
            console.log("yese");

            this.setState({
                sortedKeys: Array.from(this.props.oldClusters.keys()).sort((a, b) => Number(a) - Number(b))
            });
        }
    }

    async componentWillReceiveProps(newProps: DistrictTabPanelProps) {
        if (this.state.sortedKeys) {
            this.setState({
                sortedKeys: Array.from(newProps.oldClusters.keys()).sort((a, b) => Number(a) - Number(b))
            });
        }
    }

    render() {
        
        if (this.props.selectedState === StateEnum.NOT_SET) {
            return <Placeholder loading={false} title="No state selected." subtitle="Select a state to view data."></Placeholder>;
        }

        if (!this.props.oldClusters || this.state.sortedKeys.length === 0) {
            return <Placeholder loading={true} title="" subtitle=""></Placeholder>;
        }

        return (
            <div style={{ padding: '0 1.5rem' }}>
                <br />
                <h4>District Statistics</h4>
                <h6>Old District Statistics</h6>

                <Card className='my-3'>
                    <Card.Body>
                        <Image className='float-left' style={{ width: '64px' }} roundedCircle src="https://www.wkar.org/sites/wkar/files/styles/medium/public/201905/IMG_7968.jpg" />

                        <div className="message">
                            <h5>Samuel Stanley</h5>
                            <h6>Seawolf Party</h6>
                        </div>
                    </Card.Body>
                </Card>

                <br />
                <DropdownButton id="dropdown-basic-button" title={`Selected District: ${this.state.selectedOldDistrictId || 'N/A'}`}>
                    {
                        this.state.sortedKeys && this.state.sortedKeys.map(key => {
                            return (
                                <Dropdown.Item key={key} onClick={() => this.selectOldDistrictData(key)}>District {key}</Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>

                <br />

                {
                    this.state.oldDistrictData && (
                        <StatisticsAccordionComponent demographicData={this.state.oldDistrictData.demographicData} electionData={this.state.oldDistrictData.electionData} />
                    )
                }

                <br />

                <h6>New District Statistics</h6>
                <DropdownButton id="dropdown-basic-button" title='Selected District: N/A'>
                    <Dropdown.Item onClick={() => { }}>District 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => { }}>District 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => { }}>District 3</Dropdown.Item>
                </DropdownButton>

                <br />

                {/* <StatisticsAccordionComponent /> */}
            </div>
        );
    }

    private selectOldDistrictData(districtId: string) {
        this.setState({
            selectedOldDistrictId: districtId,
            oldDistrictData: this.props.oldClusters.get(districtId)
        });
    }
}