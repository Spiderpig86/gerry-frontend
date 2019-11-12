import * as React from 'react';
import * as mapActionCreators from '../../../../redux/modules/state/state';

import { Row, Button, ButtonGroup, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faSquare } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PhaseOneArgs } from '../../../../models';

interface IAlgorithmPanelProps {
    phaseOneArgs: PhaseOneArgs;
}

export class AlgorithmPanelComponent extends React.PureComponent<
        IAlgorithmPanelProps,
        {}
    >{
    render() {
        return (
            <Row className={'d-flex w-100'} style={{ bottom: 0, padding: '1rem', justifyContent: 'space-between' }}>
                <ButtonGroup>
                    <Button><FontAwesomeIcon icon={faPlay} /></Button>
                    <Button><FontAwesomeIcon icon={faPause} /></Button>
                    <Button><FontAwesomeIcon icon={faSquare} /></Button>
                </ButtonGroup>
                <Form.Group className="row form-group d-flex align-items-center justify-content-flex-end">
                    <Form.Check custom type={'checkbox'} id={'intermediateResultsCheckbox'} label={'Display Intermediate Results'} />
                </Form.Group>
            </Row>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        phaseOneArgs: state.stateReducer.phaseOneArgs
    };
}

export const AlgorithmPanel = connect(
    (state: any) => {
        return mapStateToProps(state);
    },
    dispatch => bindActionCreators(mapActionCreators, dispatch)
)(AlgorithmPanelComponent);