// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import './footer.scss';
import { Resources } from '../../resources';
import * as React from 'react';
import { Container, Row } from 'react-bootstrap';

import { fab, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                <Container className='h-100 d-flex justify-content-center align-items-center'>
                    <a href='#' target='_blank'>
                      <button className='btn-github'><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> View on Github</button>
                    </a>
                </Container>
            </div>
        );
    }
}
