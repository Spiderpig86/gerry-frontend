import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Button, ButtonGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AlgorithmEnum, StateEnum, AlgorithmRunEnum, PhaseTwoArgs, IPrecinct, ICluster } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { PhaseTwoService } from '../../../../libs/algorithms/phase-two-service';

interface IAlgorithmPanelProps {
    algorithmState: AlgorithmEnum;
    phaseTwoArgs: PhaseTwoArgs;
    selectedState: StateEnum;
    phaseTwoService: PhaseTwoService;
    precinctMap: Map<string, IPrecinct>;
    oldClusters: Map<string, ICluster>;
    newClusters: Map<string, ICluster>;
    phaseTwoRunning: boolean;
    setPhaseTwoServiceCreator: (phaseTwoService: PhaseTwoService) => void;
    setPhaseTwoRunning: (phaseTwoRunning: boolean) => void;
}

export class PhaseTwoAlgorithmPanelComponent extends React.PureComponent<IAlgorithmPanelProps, {}> {
    async componentDidMount() {
        if (!this.props.phaseTwoService && this.props.precinctMap.size > 0) {
            const phaseTwoService = new PhaseTwoService(this.props.precinctMap, null, this.props.oldClusters, this.props.newClusters);
            this.props.setPhaseTwoServiceCreator(phaseTwoService);
        }
    }

    async componentWillReceiveProps(newProps) {
        if (!this.props.phaseTwoService && this.props.precinctMap.size > 0) {
            const phaseTwoService = new PhaseTwoService(this.props.precinctMap, null, this.props.oldClusters, this.props.newClusters);
            this.props.setPhaseTwoServiceCreator(phaseTwoService);
        }
    }

    render() {
        return (
            <Row className={'d-flex w-100'} style={{ bottom: 0, padding: '1rem', justifyContent: 'space-between' }}>
                <ButtonGroup>
                    <OverlayTrigger
                        rootClose
                        placement="top"
                        delay={{ show: 10, hide: 10 }}
                        overlay={props => this.renderTooltip(props, `Run Phase 2`)}
                    >
                        <div>
                            <Button
                                id="btnPlay"
                                disabled={
                                    this.props.selectedState === StateEnum.NOT_SET ||
                                    this.props.algorithmState !== AlgorithmEnum.PHASE_2 || this.props.phaseTwoRunning
                                }
                                onClick={this.startPhaseTwo.bind(this)}
                                style={
                                    this.props.algorithmState !== AlgorithmEnum.PHASE_2
                                        ? { pointerEvents: 'none' }
                                        : { pointerEvents: 'all' }
                                }
                                className='mr-1'
                            >
                                <FontAwesomeIcon icon={faPlay} />
                                &nbsp; Run Phase 2
                            </Button>
                        </div>
                    </OverlayTrigger>

                    <OverlayTrigger
                        rootClose
                        placement="top"
                        delay={{ show: 10, hide: 10 }}
                        overlay={props => this.renderTooltip(props, `Pause Phase 2`)}
                    >
                        <div>
                            <Button
                                disabled={
                                    this.props.selectedState === StateEnum.NOT_SET ||
                                    this.props.algorithmState !== AlgorithmEnum.PHASE_2 || !this.props.phaseTwoRunning
                                }
                                style={
                                    this.props.algorithmState !== AlgorithmEnum.PHASE_2
                                        ? { pointerEvents: 'none' }
                                        : { pointerEvents: 'all' }
                                }
                                onClick={this.pausePhaseTwo.bind(this)}
                            >
                                <FontAwesomeIcon icon={faPause} />
                                &nbsp; Pause Phase 2
                            </Button>
                        </div>
                    </OverlayTrigger>
                </ButtonGroup>
            </Row>
        );
    }

    private renderTooltip(props: any, text: string) {
        props.style = {
            ...props.style,
            zIndex: 99999
        };
        return (
            <Tooltip {...props} show={props.show.toString()}>
                {text}
            </Tooltip>
        );
    }

    private startPhaseTwo(): void {
        this.props.setPhaseTwoRunning(true);
        this.props.phaseTwoService.start(this.props.phaseTwoArgs);
    }

    private pausePhaseTwo(): void {
        this.props.setPhaseTwoRunning(false);
        this.props.phaseTwoService.pause();
    }
}

function mapStateToProps(state: any) {
    return {
        algorithmState: state.stateReducer.algorithmState,
        phaseTwoArgs: state.stateReducer.phaseTwoArgs,
        selectedState: state.stateReducer.selectedState,
        phaseTwoService: state.stateReducer.phaseTwoService,
        phaseTwoRunning: state.stateReducer.phaseTwoRunning,
        precinctMap: state.stateReducer.precinctMap,
        oldClusters: state.stateReducer.oldClusters,
        newClusters: state.stateReducer.newClusters,
        setPhaseTwoServiceCreator: state.stateReducer.setPhaseTwoServiceCreator,
        setPhaseTwoRunning: state.stateReducer.setPhaseTwoRunning
    };
}

export const PhaseTwoAlgorithmPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseTwoAlgorithmPanelComponent);
