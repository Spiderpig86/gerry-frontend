// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import './home.scss';
import { Resources } from '../../resources';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../redux/modules/users/users';
import { Container } from 'react-bootstrap';

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
            <Container>
              
            </Container>
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
