import * as React from 'react';

import { Row, Button, ButtonGroup, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class AlgorithmPanel extends React.PureComponent {
    render() {
        return (
            <Row className={'d-flex w-100'} style={{ position: 'absolute', bottom: 0, padding: '1rem', justifyContent: 'space-between' }}>
                <ButtonGroup>
                    <Button><FontAwesomeIcon icon={['fas', 'play']} /></Button>
                    <Button><FontAwesomeIcon icon={['fas', 'pause']} /></Button>
                    <Button><FontAwesomeIcon icon={['fas', 'square']} /></Button>
                </ButtonGroup>
                <Form.Group className="row form-group d-flex align-items-center justify-content-flex-end">
                    <Form.Check custom type={'checkbox'} id={'intermediateResultsCheckbox'} label={'Display Intermediate Results'} />
                </Form.Group>
            </Row>
        );
    }
}
