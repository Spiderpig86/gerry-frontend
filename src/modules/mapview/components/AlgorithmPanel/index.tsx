import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Button, ButtonGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PhaseOneArgs, AlgorithmEnum } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';
import { PhaseOneService } from '../../../../libs/algorithms/phase-one-service';

interface IAlgorithmPanelProps {
    algorithmState: AlgorithmEnum;
    phaseOneArgs: PhaseOneArgs;
    setPhaseOneServiceCreator: () => void;
    phaseOneService: PhaseOneService;
}

export class AlgorithmPanelComponent extends React.PureComponent<IAlgorithmPanelProps, {}> {
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
                                `Run ${EnumNameMapper.getAlgorithmName(this.props.algorithmState)}`
                            )
                        }
                    >
                        <Button id="btnPlay" onClick={this.startPhaseOne.bind(this)}>
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={props =>
                            this.renderTooltip(
                                props,
                                `Pause ${EnumNameMapper.getAlgorithmName(this.props.algorithmState)}`
                            )
                        }
                    >
                        <Button>
                            <FontAwesomeIcon icon={faPause} />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={props => this.renderTooltip(props, `Step Forward`)}
                    >
                        <Button disabled={!this.props.phaseOneService} onClick={this.stepForward.bind(this)}>
                            <FontAwesomeIcon icon={faStepForward} />
                        </Button>
                    </OverlayTrigger>
                </ButtonGroup>
                <Form.Group className="row form-group d-flex align-items-center justify-content-flex-end">
                    <Form.Check
                        custom
                        type={'checkbox'}
                        id={'intermediateResultsCheckbox'}
                        label={'Display Intermediate Results'}
                    />
                </Form.Group>
            </Row>
        );
    }

    private renderTooltip(props: any, text: string) {
        props.style = {
            ...props.style,
            zIndex: 99999
        };
        return <Tooltip {...props} show={props.show.toString()}>{text}</Tooltip>;
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
        setPhaseOneServiceCreator: state.stateReducer.setPhaseOneServiceCreator,
        phaseOneService: state.stateReducer.phaseOneService
    };
}

export const AlgorithmPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(AlgorithmPanelComponent);
