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

interface INavigationComponentState {
    activeClass: string;
}

const initialState: INavigationComponentState = {
    activeClass: ''
};

interface INavigationComponentProps {
    // isFetching: boolean;
    error: string;
}

class NavigationComponent extends React.Component<
    INavigationComponentProps,
    INavigationComponentState
> {
    static propTypes = {
        // isFetching: PropTypes.bool.isRequired,
        // error: PropTypes.string.isRequired,
    };
    constructor(props: INavigationComponentProps) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        window.addEventListener('scroll', () => {
         let activeClass = 'nav--dark';
         if (window.scrollY < document.querySelector('#splash').clientHeight){
             activeClass = '';
         }
        this.setState({ activeClass });
      });
    }
    render() {
        return (
            <Navbar className={this.state.activeClass + ' navigation'} variant="dark" fixed='top'>
                <Navbar.Brand href="#home">Gerry</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link className='smoothScroll' href="#what">What</Nav.Link>
                    <Nav.Link className='smoothScroll' href="#states">States</Nav.Link>
                    <Nav.Link className='smoothScroll' href="#developers">Developers</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Link to='/map'><Button variant="outline-light">Launch</Button></Link>
                </Nav>
            </Navbar>
        );
    }
}

export const Navigation = connect(
    (state: any) => {
        return {
            // isFetching: state.isFetching,
            error: state.error,
            activeClass: ''
        };
    },
    dispatch => bindActionCreators(userActionCreators, dispatch)
)(NavigationComponent);
