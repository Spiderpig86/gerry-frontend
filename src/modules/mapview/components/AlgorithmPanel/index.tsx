import * as React from 'react';

import { Row, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class AlgorithmPanel extends React.PureComponent {
    render() {
        return (
            <Row className={'d-flex justify-content-center w-100'} style={{ position: 'absolute', bottom: 0, padding: '1rem' }}>
                <ButtonGroup>
                    <Button><FontAwesomeIcon icon={['fas', 'play']} /></Button>
                    <Button><FontAwesomeIcon icon={['fas', 'pause']} /></Button>
                    <Button><FontAwesomeIcon icon={['fas', 'square']} /></Button>
                </ButtonGroup>
            </Row>
        );
    }
}
