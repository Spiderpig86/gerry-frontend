// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Routes } from 'global_components';
import { users } from './redux/modules/users/users';

import './styles/global.scss';
import { StateBordersApi } from './api/state-borders';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faPause, faSquare } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faPlay, faPause, faSquare);

const store = createStore(users, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
);
