import * as React from 'react';

import { Container } from 'react-bootstrap';
import { GridLoader } from 'react-spinners';

interface PlaceholderProps {
    title: string,
    subtitle: string
}

export class Placeholder extends React.PureComponent<PlaceholderProps, {}> {

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
                    <h3>{this.props.title}</h3>
                    <p>{this.props.subtitle}</p>
                </Container>
            </>
        );
    }
}