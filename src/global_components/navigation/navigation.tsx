// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import './navigation.scss';
import { Resources } from 'resources';
import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, FormControl, Navbar, Nav } from 'react-bootstrap';

import * as userActionCreators from '../../redux/modules/users/users';

interface INavigationComponentState {}

const initialState: INavigationComponentState = {};

interface INavigationComponentProps {
    history: any;
    isAuthed: boolean;
    isFetching: boolean;
    error: string;
    unauthUser: () => void;
    fetchAndHandleAuthentication: (history: any) => void;
}

class NavigationComponent extends React.Component<
    INavigationComponentProps,
    INavigationComponentState
> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        unauthUser: PropTypes.func.isRequired,
        fetchAndHandleAuthentication: PropTypes.func.isRequired
    };
    constructor(props: INavigationComponentProps) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <Navbar variant="dark" fixed='top'>
                <Navbar.Brand href="#home">Gerry</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#what">What</Nav.Link>
                    <Nav.Link href="#states">States</Nav.Link>
                    <Nav.Link href="#developers">Developers</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Button variant="outline-light">Launch</Button>
                </Nav>
            </Navbar>
        );
    }
}

export const Navigation = connect(
    (state: any) => {
        return {
            isAuthed: state.isAuthed,
            isFetching: state.isFetching,
            error: state.error
        };
    },
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(NavigationComponent);
