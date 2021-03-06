import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Button, ButtonGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    PhaseOneArgs,
    AlgorithmEnum,
    StateEnum,
    AlgorithmRunEnum,
    ICluster,
    IPrecinct,
    ViewLevelEnum
} from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { PhaseOneService } from '../../../../libs/algorithms/phase-one-service';

interface IAlgorithmPanelProps {
    algorithmState: AlgorithmEnum;
    phaseOneArgs: PhaseOneArgs;
    phaseOneService: PhaseOneService;
    phaseOneTime: number;
    precinctMap: Map<string, IPrecinct>;
    selectedState: StateEnum;
    setPhaseOneServiceCreator: (phaseOneService: PhaseOneService) => void;
    setPhaseOneArgs: (phaseOneArgs: PhaseOneArgs) => any;
    setAlgorithmPhase: (algorithmPhase: AlgorithmEnum) => any;
    setNewClusters: (oldClusters: Map<string, ICluster>) => any;
    setMapLevelCreator: (level: string) => any;
}

export class PhaseOneAlgorithmPanelComponent extends React.PureComponent<IAlgorithmPanelProps, {}> {
    async componentDidMount() {
        if (!this.props.phaseOneService && this.props.selectedState && this.props.precinctMap.size > 0) {
            const phaseOneService = new PhaseOneService(this.props.precinctMap, null, new Map<string, ICluster>());
            this.props.setPhaseOneServiceCreator(phaseOneService);
        }
    }

    async componentWillReceiveProps(newProps) {
        if (!this.props.phaseOneService && this.props.selectedState && this.props.precinctMap.size > 0) {
            const phaseOneService = new PhaseOneService(this.props.precinctMap, null, new Map<string, ICluster>());
            this.props.setPhaseOneServiceCreator(phaseOneService);
        }
    }

    render() {
        return (
            <Row className={'d-flex w-100'} style={{ bottom: 0, padding: '1rem', justifyContent: 'space-between' }}>
                <ButtonGroup>
                    <OverlayTrigger
                        placement="top"
                        rootClose
                        delay={{ show: 10, hide: 10 }}
                        overlay={props => this.renderTooltip(props, `Run Phase 1 (To Completion)`)}
                    >
                        <div>
                            <Button
                                className='mr-1'
                                id="btnPlay"
                                disabled={
                                    this.props.phaseOneArgs.algRunType === AlgorithmRunEnum.BY_STEP ||
                                    this.props.phaseOneArgs.stateType === StateEnum.NOT_SET ||
                                    this.props.algorithmState !== AlgorithmEnum.PHASE_0_1
                                }
                                onClick={this.startPhaseOne.bind(this)}
                                style={this.props.algorithmState !== AlgorithmEnum.PHASE_0_1 ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                            >
                                <FontAwesomeIcon icon={faPlay} />
                                &nbsp; Run Phase 1
                            </Button>
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        rootClose
                        delay={{ show: 10, hide: 10 }}
                        overlay={props =>
                            this.renderTooltip(
                                props,
                                this.props.algorithmState === AlgorithmEnum.PHASE_0_1
                                    ? `Step Forward`
                                    : `Phase 1 Completed`
                            )
                        }
                    >
                        <div>
                            <Button
                                className='mr-1'
                                disabled={
                                    !this.props.phaseOneService ||
                                    this.props.phaseOneArgs.algRunType !== AlgorithmRunEnum.BY_STEP ||
                                    this.props.phaseOneArgs.stateType === StateEnum.NOT_SET ||
                                    this.props.algorithmState !== AlgorithmEnum.PHASE_0_1
                                }
                                onClick={this.stepForward.bind(this)}
                                style={this.props.algorithmState !== AlgorithmEnum.PHASE_0_1 ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                            >
                                <FontAwesomeIcon icon={faStepForward} />
                                &nbsp; Next
                            </Button>
                        </div>
                    </OverlayTrigger>
                </ButtonGroup>
                {
                    this.props.phaseOneTime && (
                        <div className='d-flex align-items-center'>
                            <span>{ this.props.phaseOneTime } ms</span>
                        </div>
                    )
                }
                <Form.Group className="row form-group d-flex align-items-center justify-content-flex-end">
                    <Form.Check
                        custom
                        type={'checkbox'}
                        id={'intermediateResultsCheckbox'}
                        label={'Use Iterative Steps'}
                        disabled={
                            !this.props.phaseOneService ||
                            (this.props.phaseOneArgs.jobId !== null &&
                                this.props.algorithmState === AlgorithmEnum.PHASE_0_1)
                        }
                        defaultChecked={this.props.phaseOneArgs.algRunType === AlgorithmRunEnum.BY_STEP}
                        onChange={e => this.toggleIntermediateUpdates(e.target.checked)}
                    />
                </Form.Group>
            </Row>
        );
    }

    private toggleIntermediateUpdates(e: boolean) {
        this.props.setPhaseOneArgs({
            ...this.props.phaseOneArgs,
            algRunType: e ? AlgorithmRunEnum.BY_STEP : AlgorithmRunEnum.TO_COMPLETION
        });
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

    private startPhaseOne(): void {
        const args = {
            ...this.props.phaseOneArgs,
            jobId: null
        };
        this.props.phaseOneService.fetchNextStep(args);
        this.props.setMapLevelCreator(ViewLevelEnum.NEW_DISTRICTS);
    }

    private stepForward(): void {
        const args = {
            ...this.props.phaseOneArgs,
            jobId: null
        };
        this.props.phaseOneService.fetchNextStep(
            this.props.algorithmState === AlgorithmEnum.PHASE_2 ? args : this.props.phaseOneArgs
        );
        this.resetPhaseOneResults();
        this.props.setMapLevelCreator(ViewLevelEnum.NEW_DISTRICTS);
    }

    private resetPhaseOneResults(): void {
        this.props.setNewClusters(new Map<string, ICluster>());
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        algorithmState: state.stateReducer.algorithmState,
        phaseOneArgs: state.stateReducer.phaseOneArgs,
        phaseOneService: state.stateReducer.phaseOneService,
        phaseOneTime: state.stateReducer.phaseOneTime,
        precinctMap: state.stateReducer.precinctMap,
        selectedState: state.stateReducer.selectedState,
        setPhaseOneServiceCreator: state.stateReducer.setPhaseOneServiceCreator,
        setPhaseOneArgs: state.stateReducer.setPhaseOnArgs,
        setAlgorithmPhase: state.stateReducer.setAlgorithmPhase,
        setNewClusters: state.stateReducer.setNewClusters,
        setMapLevelCreator: state.stateReducer.setMapLevelCreator,
        ...ownProps
    };
}

export const PhaseOneAlgorithmPanel = connect(
    (state: any, ownProps: any) => {
        return mapStateToProps(state, ownProps);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseOneAlgorithmPanelComponent);
