import * as React from 'react';

import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { Card } from 'react-bootstrap';
import { StateEnum, ICluster } from '../../../../models';
import { Placeholder } from '../../../../global_components';
import { Coloring } from '../../../../libs/coloring';

interface DistrictTabPanelProps {
    selectedState: StateEnum;
    selectedDistrictId: string;
    oldClusters: Map<string, ICluster>;
    newClusters: Map<string, ICluster>;
    coloring: Coloring;
}

interface DistrictTabPanelState {
    oldSortedKeys: string[];
    newSortedKeys: string[];
    selectedOldDistrictId: string;
    oldDistrictData: ICluster;
    selectedNewDistrictId: string;
    newDistrictData: ICluster;
}

export class DistrictTabPanel extends React.PureComponent<DistrictTabPanelProps, DistrictTabPanelState> {

    state = {
        oldSortedKeys: [],
        newSortedKeys: [],
        selectedOldDistrictId: '',
        oldDistrictData: null,
        selectedNewDistrictId: '',
        newDistrictData: null
    };

    componentWillMount() {
        if (this.props.oldClusters) {
            this.setState({
                oldSortedKeys: Array.from(this.props.oldClusters.keys()).sort((a, b) => Number(a) - Number(b))
            });
        }

        if (this.props.newClusters) {
            this.setState({
                newSortedKeys: Array.from(this.props.newClusters.keys()).sort((a, b) => Number(a) - Number(b))
            });
        }

        if (this.props.selectedDistrictId !== '0') {
            this.selectOldDistrictData(this.props.selectedDistrictId.toString());
        }
    }

    async componentWillReceiveProps(newProps: DistrictTabPanelProps) {
        if (newProps.oldClusters.size === 0 || newProps.newClusters.size === 0) {
            this.resetDistrictResults();
        }
        this.setState({
            oldSortedKeys: Array.from(newProps.oldClusters.keys()).sort((a, b) => Number(a) - Number(b))
        });
        this.setState({
            newSortedKeys: Array.from(newProps.newClusters.keys()).sort((a, b) => Number(a) - Number(b))
        });

        if (this.props.selectedDistrictId !== '0') {
            this.selectOldDistrictData(this.props.selectedDistrictId.toString());
        }
    }

    render() {
        
        if (this.props.selectedState === StateEnum.NOT_SET) {
            return <Placeholder loading={false} title="No state selected." subtitle="Select a state to view data."></Placeholder>;
        }

        if (!this.props.oldClusters || this.state.oldSortedKeys.length === 0) {
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
                <div className="d-flex align-items-center">
                    <div className='mr-2' style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: this.state.selectedOldDistrictId ? this.props.coloring.colors[parseInt(this.state.selectedOldDistrictId)] : '#ccc',
                        display: 'block',
                        borderRadius: '50%'
                    }}></div>
                    <DropdownButton id="dropdown-basic-button" title={`Selected District: ${this.state.selectedOldDistrictId || 'N/A'}`}>
                        {
                            this.state.oldSortedKeys.length > 0 && this.state.oldSortedKeys.map(key => {
                                return (
                                    <Dropdown.Item key={key} onClick={() => this.selectOldDistrictData(key)}>District {key}</Dropdown.Item>
                                )
                            })
                        }
                    </DropdownButton>
                </div>

                <br />

                {
                    this.state.oldDistrictData ? (
                        <StatisticsAccordionComponent demographicData={this.state.oldDistrictData.demographicData} electionData={this.state.oldDistrictData.electionData} />
                    ) : (
                            <div className='text-center'>
                                <h4>No district selected.</h4>
                                <h6>Select a district to view its data.</h6>
                            </div>
                        )
                }

                <br />

                <h6>New District Statistics</h6>
                <div className="d-flex align-items-center">
                    <div className='mr-2' style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: this.state.selectedNewDistrictId ? this.props.coloring.colors[parseInt(this.state.selectedNewDistrictId)] : '#ccc',
                        display: 'block',
                        borderRadius: '50%'
                    }}></div>
                    <DropdownButton id="dropdown-basic-button" title={`Selected District: ${this.state.selectedNewDistrictId || 'N/A'}`}>
                        {
                            this.state.newSortedKeys.length > 0 && this.state.newSortedKeys.map(key => {
                                return (
                                    <Dropdown.Item key={key} onClick={() => this.selectNewDistrictData(key)}>District {key}</Dropdown.Item>
                                )
                            })
                        }
                    </DropdownButton>
                </div>

                <br />
                {
                    this.state.newDistrictData ? (
                        <StatisticsAccordionComponent demographicData={this.state.newDistrictData.demographicData} electionData={this.state.newDistrictData.electionData} />
                    ) : (
                            <div className='text-center'>
                                <h4>No district selected.</h4>
                                <h6>Select a district to view its data.</h6>
                            </div>
                        )
                }

                <br />
            </div>
        );
    }

    private selectOldDistrictData(districtId: string) {
        this.setState({
            selectedOldDistrictId: districtId,
            oldDistrictData: this.props.oldClusters.get(districtId)
        });
    }

    private selectNewDistrictData(districtId: string) {
        this.setState({
            selectedNewDistrictId: districtId,
            newDistrictData: this.props.newClusters.get(districtId)
        });
    }

    private resetDistrictResults() {
        this.setState({
            oldDistrictData: null,
            selectedOldDistrictId: '',
            oldSortedKeys: [],
            newDistrictData: null,
            selectedNewDistrictId: '',
            newSortedKeys: []
        });
    }
}