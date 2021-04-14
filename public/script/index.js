import Application from './Application.js';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
)