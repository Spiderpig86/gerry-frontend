// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Routes } from 'global_components';
import { users } from './redux/modules/users/users';
import { stateReducer } from './redux/modules/state/state';
import { mapTooltipReducer } from './redux/modules/maptooltip/maptooltip';

import './styles/global.scss';
import { StateBordersApi } from './api/state-borders';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faPause, faSquare } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faPlay, faPause, faSquare);

const rootReducer = combineReducers({users, stateReducer, mapTooltipReducer});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Routes store={store} />
    </Provider>,
    document.getElementById('app')
);
