// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import './home.scss';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../redux/modules/users/users';
import { Button, Container, Jumbotron, Row } from 'react-bootstrap';
import { USMap } from './components/us_map';

interface IHomeComponentState {}

const initialState: IHomeComponentState = {};

interface IHomeComponentProps {
    history: any;
    isAuthed: boolean;
    isFetching: boolean;
    error: string;
    fetchAndHandleAuthentication: (history: any) => void;
}

class HomeComponent extends React.Component<
    IHomeComponentProps,
    IHomeComponentState
> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        fetchAndHandleAuthentication: PropTypes.func.isRequired
    };
    constructor(props: IHomeComponentProps) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <>
                <div
                    className="position-relative home"
                    style={{ height: '100vh' }}
                >
                    <video
                        style={{ zIndex: -1 }}
                        playsinline
                        autoPlay
                        muted
                        loop
                        src="https://storage.coverr.co/videos/Merica_flag_waving?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTY5NjI0MjIyfQ.NmRPZoBuJt3Hzfk56R285EAkmaiNoVxPXgcn49-BMX4"
                        poster="https://storage.coverr.co/posters/Merica_flag_waving"
                    ></video>
                    <Jumbotron className="jumbotron-fluid d-flex h-100">
                        <Container className="justify-content-center text-center align-items-center d-flex flex-column">
                            <h1 className="display-1 font-weight-bold">
                                Gerry.
                            </h1>
                            <br />
                            <h5>
                                A Gerrymandering anaylsis tool to gerneate fair
                                and non-partisan districts.
                            </h5>
                            <br />
                            <Button variant="outline-light" size="lg">Get Started</Button>
                        </Container>
                    </Jumbotron>
                </div>

                <section className='py-5' id="what">
                  <Container className='py-5 text-center'>
                    <h3 className='text-center'>What is this for?</h3>
                    <p>ergergaergaegr</p>
                  </Container>
                </section>

                <section className='py-5' id="states">
                  <Container className='py-5 text-center'>
                    <h3>Supported states are highlighted in blue.</h3>
                    <USMap />
                  </Container>
                </section>


                <section className='py-5' id="developers">
                  <Container className='py-5 text-center'>
                    <h3>About the developers.</h3>
                  </Container>
                </section>
            </>
        );
    }
}

export const Home = connect(
    (state: any) => {
        return {
            isFetching: state.isFetching,
            error: state.error,
            isAuthed: state.isAuthed
        };
    },
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(HomeComponent);
