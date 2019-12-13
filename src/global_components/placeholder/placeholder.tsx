import * as React from 'react';

import { Container } from 'react-bootstrap';
import { GridLoader, ClimbingBoxLoader } from 'react-spinners';

interface PlaceholderProps {
    title: string;
    subtitle: string;
    loading: boolean;
}

export class Placeholder extends React.PureComponent<PlaceholderProps, {}> {

    render() {
        if (!this.props.loading) {
            return (
                <Container className='d-flex flex-column justify-content-center text-center h-100'>
                    <div className='sweet-loading pb-5' style={{ display: 'flex', justifyContent: 'center' }}>
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
            );
        } else {
            return (
                <Container className='d-flex flex-column justify-content-center text-center h-100'>
                    <div className='sweet-loading pb-5' style={{ display: 'flex', justifyContent: 'center' }}>
                        <ClimbingBoxLoader
                            sizeUnit={"px"}
                            size={15}
                            color={'#68E3C7'}
                            loading={true}
                        />
                    </div>
                    <h3>Loading...</h3>
                    <p>Hold on, we're gathering your data.</p>
                </Container>
            );
        }
    }
}