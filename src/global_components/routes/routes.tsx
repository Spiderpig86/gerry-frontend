// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Main, NotFound } from '..';
import { Home, Dashboard, Test, MapView } from '../../modules';
import { StateBordersApi } from '../../api/state-borders';

export class Routes extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/home' />
                    </Route>
                    <Main path='/home' component={Home} checkAuthentication={false} />
                    <Main path='/dashboard' component={Dashboard} checkAuthentication={true} />
                    <Main path='/test' component={Test} checkAuthentication={false} />
                    <Route path='/map' component={MapView} />
                    <Main path='*' component={NotFound} checkAuthentication={false} />
                </Switch>
            </Router>
        )
    }
}