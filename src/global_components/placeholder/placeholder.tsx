import * as React from 'react';

import { Container } from 'react-bootstrap';
import { GridLoader } from 'react-spinners';

export class Placeholder extends React.PureComponent {

    render() {
        return (
            <>
                <Container className='d-flex flex-column justify-content-center text-center h-100'>
                    <div className='sweet-loading pb-5' style={{display: 'flex', justifyContent: 'center'}}>
                        <GridLoader
                            sizeUnit={"px"}
                            size={15}
                            color={'#68E3C7'}
                            loading={true}
                            margin={'2'}
                        />
                    </div> 
                    <h3>No jurisdiction selected.</h3>
                    <p>Select a congressional district or precinct to view data.</p>
                </Container>
            </>
        );
    }
}