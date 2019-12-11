import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Button, ButtonGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PhaseOneArgs, AlgorithmEnum, StateEnum, AlgorithmRunEnum } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { PhaseOneService } from '../../../../libs/algorithms/phase-one-service';

interface IAlgorithmPanelProps {
    algorithmState: AlgorithmEnum;
    phaseOneArgs: PhaseOneArgs;
    phaseOneService: PhaseOneService;
    selectedState: StateEnum;
    setPhaseOneServiceCreator: () => void;
    setPhaseOneArgs: (phaseOneArgs: PhaseOneArgs) => void;
}

export class PhaseOneAlgorithmPanelComponent extends React.PureComponent<IAlgorithmPanelProps, {}> {
    render() {
        return (
            <Row className={'d-flex w-100'} style={{ bottom: 0, padding: '1rem', justifyContent: 'space-between' }}>
                <ButtonGroup>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={props =>
                            this.renderTooltip(
                                props,
                                `Run ${EnumNameMapper.getAlgorithmName(this.props.algorithmState)} (To Completion)`
                            )
                        }
                    >
                        <Button
                            id="btnPlay"
                            disabled={this.props.phaseOneArgs.algRunType === AlgorithmRunEnum.BY_STEP || this.props.phaseOneArgs.stateType === StateEnum.NOT_SET}
                            onClick={this.startPhaseOne.bind(this)}
                        >
                            <FontAwesomeIcon icon={faPlay} />
                            &nbsp; Run Phase 1
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={props => this.renderTooltip(props, `Step Forward`)}
                    >
                        <Button
                            disabled={
                                !this.props.phaseOneService &&
                                !(this.props.phaseOneArgs.algRunType === AlgorithmRunEnum.BY_STEP) || this.props.phaseOneArgs.stateType === StateEnum.NOT_SET
                            }
                            onClick={this.stepForward.bind(this)}
                        >
                            <FontAwesomeIcon icon={faStepForward} />
                            &nbsp; Next
                        </Button>
                    </OverlayTrigger>
                </ButtonGroup>
                <Form.Group className="row form-group d-flex align-items-center justify-content-flex-end">
                    <Form.Check
                        custom
                        type={'checkbox'}
                        id={'intermediateResultsCheckbox'}
                        label={'Use Iterative Steps'}
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
        this.props.setPhaseOneServiceCreator();
    }

    private stepForward(): void {
        this.props.phaseOneService.fetchNextStep();
    }
}

function mapStateToProps(state: any) {
    return {
        algorithmState: state.stateReducer.algorithmState,
        phaseOneArgs: state.stateReducer.phaseOneArgs,
        phaseOneService: state.stateReducer.phaseOneService,
        selectedState: state.stateReducer.selectedState,
        setPhaseOneServiceCreator: state.stateReducer.setPhaseOneServiceCreator,
        setPhaseOneArgs: state.stateReducer.setPhaseOnArgs
    };
}

export const PhaseOneAlgorithmPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseOneAlgorithmPanelComponent);
