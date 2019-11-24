import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Button, ButtonGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PhaseOneArgs, AlgorithmEnum } from '../../../../models';
import { EnumNameMapper } from '../../../../libs/enum-name';

interface IAlgorithmPanelProps {
    algorithmState: AlgorithmEnum;
    phaseOneArgs: PhaseOneArgs;
}

export class AlgorithmPanelComponent extends React.PureComponent<IAlgorithmPanelProps, {}> {
    render() {
        return (
            <Row className={'d-flex w-100'} style={{ bottom: 0, padding: '1rem', justifyContent: 'space-between' }}>
                <ButtonGroup>
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 0, hide: 300 }}
                        overlay={props =>
                            this.renderTooltip(
                                props,
                                `Run ${EnumNameMapper.getAlgorithmName(this.props.algorithmState)}`
                            )
                        }
                    >
                        <Button id="btnPlay">
                            <FontAwesomeIcon icon={faPlay} />
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 0, hide: 300 }}
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
                        delay={{ show: 0, hide: 300 }}
                        overlay={props => this.renderTooltip(props, `Step Forward`)}
                    >
                        <Button>
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
        return <Tooltip {...props}>{text}</Tooltip>;
    }
}

function mapStateToProps(state: any) {
    return {
        algorithmState: state.stateReducer.algorithmState,
        phaseOneArgs: state.stateReducer.phaseOneArgs
    };
}

export const AlgorithmPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(AlgorithmPanelComponent);
