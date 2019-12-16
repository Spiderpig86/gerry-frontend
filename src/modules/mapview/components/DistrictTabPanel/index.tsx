import * as React from 'react';

import { Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { StatisticsAccordionComponent } from '../StatisticsAccordionComponent';
import { Card } from 'react-bootstrap';
import { StateEnum, ICluster, PartyEnum } from '../../../../models';
import { Placeholder } from '../../../../global_components';
import { Coloring } from '../../../../libs/coloring';
import { EnumNameMapper } from '../../../../libs/enum-name';

interface DistrictTabPanelProps {
    selectedState: StateEnum;
    selectedOldDistrictId: string;
    selectedNewDistrictId: string;
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

        if (this.props.selectedOldDistrictId !== '0') {
            this.selectOldDistrictData(this.props.selectedOldDistrictId.toString());
        }
        if (this.props.selectedNewDistrictId !== '0') {
            this.selectNewDistrictData(this.props.selectedNewDistrictId.toString());
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

        if (this.props.selectedOldDistrictId !== '0') {
            this.selectOldDistrictData(this.props.selectedOldDistrictId.toString());
        }
        if (this.props.selectedNewDistrictId !== '0') {
            this.selectNewDistrictData(this.props.selectedNewDistrictId.toString());
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

                {
                    this.state.oldDistrictData && (
                        <Card className='my-3' style={{
                            borderLeft: this.state.oldDistrictData.incumbent.party === PartyEnum.REPUBLICAN ? '10px solid #7e3131' : '10px solid #2f5fa1'
                        }}>
                            <Card.Body>
                                <div className="message">
                                    <h5>{ this.state.oldDistrictData.incumbent.name }</h5>
                                    <h6>{ EnumNameMapper.getPartyName(this.state.oldDistrictData.incumbent.party) }</h6>
                                </div>
                            </Card.Body>
                        </Card>

                    )
                }
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
                        <div>
                            <p>Total Population: {this.state.oldDistrictData.demographicData.totalPopulation.toLocaleString()}</p>
                            <StatisticsAccordionComponent demographicData={this.state.oldDistrictData.demographicData} electionData={this.state.oldDistrictData.electionData} />
                        </div>
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
                        backgroundColor: this.state.selectedNewDistrictId && this.state.selectedNewDistrictId !== '0' ? this.props.coloring.colors[parseInt(this.state.selectedNewDistrictId)] : '#ccc',
                        display: 'block',
                        borderRadius: '50%'
                    }}></div>
                    <DropdownButton id="dropdown-basic-button" title={`Selected District: ${this.state.selectedNewDistrictId && this.state.selectedNewDistrictId !== '0' ? this.state.selectedNewDistrictId : 'N/A'}`}>
                        {
                            this.state.newSortedKeys.length > 0 && this.state.newSortedKeys.map(key => {
                                return (
                                    <Dropdown.Item key={key} onClick={() => this.selectNewDistrictData(key)}>District {key} {(this.isDistrictMajMin(key)) ? `(MajMin)` : ``}</Dropdown.Item>
                                )
                            })
                        }
                    </DropdownButton>
                </div>

                <br />
                {
                    this.state.newDistrictData ? (
                        <div>
                            <p>Total Population: {this.state.newDistrictData.demographicData.totalPopulation.toLocaleString()}</p>
                            {
                                this.state.newDistrictData.isDistrictMajMin && (
                                    
                                    <p>This is a majority/minority district.</p>
                                )
                            }
                            <StatisticsAccordionComponent demographicData={this.state.newDistrictData.demographicData} electionData={this.state.newDistrictData.electionData} />
                        </div>
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

    private isDistrictMajMin(id: string): boolean {
        return this.props.newClusters.get(id).isMajorityMinority;
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