import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Button, ButtonGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PhaseOneArgs, AlgorithmEnum, StateEnum, AlgorithmRunEnum } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';

interface IAlgorithmPanelProps {
    algorithmState: AlgorithmEnum;
    phaseOneArgs: PhaseOneArgs;
    selectedState: StateEnum;
}

export class PhaseTwoAlgorithmPanelComponent extends React.PureComponent<IAlgorithmPanelProps, {}> {
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
                        <Button id="btnPlay" disabled={this.props.selectedState === StateEnum.NOT_SET} onClick={this.startPhaseTwo.bind(this)}>
                            <FontAwesomeIcon icon={faPlay} />
                            &nbsp; Run Phase 2
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
                        <Button 
                        disabled={true}>
                            <FontAwesomeIcon icon={faPause} />
                            &nbsp; Pause Phase 2
                        </Button>
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
        return <Tooltip {...props} show={props.show.toString()}>{text}</Tooltip>;
    }

    private startPhaseTwo(): void {
    }
}

function mapStateToProps(state: any) {
    return {
        algorithmState: state.stateReducer.algorithmState,
        phaseOneArgs: state.stateReducer.phaseOneArgs,
        selectedState: state.stateReducer.selectedState,
    };
}

export const PhaseTwoAlgorithmPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(PhaseTwoAlgorithmPanelComponent);