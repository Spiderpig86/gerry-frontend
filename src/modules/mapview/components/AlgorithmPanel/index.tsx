import * as React from 'react';

import { Row, Button, ButtonGroup, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faPlay, faPause, faSquare } from '@fortawesome/free-solid-svg-icons';


export class AlgorithmPanel extends React.PureComponent {
    render() {
        return (
            <Row className={'d-flex w-100'} style={{ position: 'absolute', bottom: 0, padding: '1rem', justifyContent: 'space-between' }}>
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
