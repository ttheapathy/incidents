import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'mobx-react';

import authStore from './stores/authStore';
import incidentStore from './stores/incidentStore';
import newsStore from './stores/newsStore';
import userStore from './stores/userStore';



const stores = {
    newsStore,
    userStore,
    authStore,
    incidentStore
};

ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
