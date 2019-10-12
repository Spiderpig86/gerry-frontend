// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import './home.scss';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../redux/modules/users/users';
import { Button, Col, Container, Jumbotron, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                    <Jumbotron id="splash" className="jumbotron-fluid d-flex h-100">
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
                            <Link to='/map'><Button variant="outline-light" size="lg">Get Started</Button></Link>
                        </Container>
                    </Jumbotron>
                </div>

                <section className='py-5' id="what">
                  <Container className='py-5 text-center'>
                    <h3 className='text-center'>What is this for?</h3>
                    <p className='lead font-weight-normal mt-5'>Gerry is a project aimed to analyze political unfairness among congressional districts. Today, many district boundaries are unfairly carved by politicians. Gerry provides ways redraw district boundaries that increases political representation on the basis of demographics, voting age population, partisan bias, and more.</p>
                  </Container>
                </section>

                <section className='py-5' id="states">
                  <Container className='py-5 text-center'>
                    <h3>States with data are highlighted in blue.</h3>
                    <USMap />
                  </Container>
                </section>


                <section className='py-5' id="developers">
                  <Container className='py-5 text-center'>
                    <h3>About the developers.</h3>
                    <p className='lead font-weight-normal'>This project is developed for our CSE 308 class at Stony Brook University.</p>

                    <Row className='py-5'>
                      <Col xs='3' className='developer-col'>
                        <Card>
                          <img src='' />
                          <Card.Title>Andy Liang</Card.Title>
                          <Card.Text>
                            <a href="" target="_blank">@aliang6</a>
                          </Card.Text>
                        </Card>
                      </Col>
                      <Col xs='3' className='developer-col'>
                        <Card>
                          <img src='' />
                          <Card.Title>Johnny So</Card.Title>
                          <Card.Text>
                            <a href="" target="_blank">@jso123450</a>
                          </Card.Text>
                        </Card>
                      </Col>
                      <Col xs='3' className='developer-col'>
                        <Card>
                          <img src='' />
                          <Card.Title>Mikey Gulati</Card.Title>
                          <Card.Text>
                            <a href="" target="_blank">@devhid</a>
                          </Card.Text>
                        </Card>
                      </Col>
                      <Col xs='3' className='developer-col'>
                        <Card>
                          <img src='' />
                          <Card.Title>Stanley Lim</Card.Title>
                          <Card.Text>
                            <a href="" target="_blank">@Spiderpig86</a>
                          </Card.Text>
                        </Card>
                      </Col>
                    </Row>

                    <h4 className='py-5'>This app is built with TypeScript, Java, Python, and:</h4>
                    <Row className='tech'>
                      <Col xs='4'>
                        <a href='https://reactjs.org/' target='_blank'>
                          <img className='tech__img' src='https://www.resourcifi.com/wp-content/uploads/2019/08/react.png' />
                        </a>
                      </Col>
                      <Col xs='4'>
                        <a href='https://spring.io/' target='_blank'>
                          <img className='tech__img' src='https://spring.io/img/spring-by-pivotal.png' />
                        </a>
                      </Col>
                      <Col xs='4'>
                        <a href='https://leafletjs.com/' target='_blank'>
                          <img className='tech__img' src='https://camo.githubusercontent.com/f51f518aa896d3d6d541bcb03a84973e3379a409/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3439363235352f313735383139332f63313231376535342d363638622d313165332d383138342d6132313265663865666337362e706e67' />
                        </a>
                      </Col>
                    </Row>
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
